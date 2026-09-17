"""Локальный human-in-the-loop API для ram_launch_debug.py.

Контракт повторяет основные endpoint'ы ZeroSolver из предоставленной
документации. Задания выполняются последовательно: Chromium открывается на ПК,
пользователь вручную проходит проверку, после чего debug-скрипт проверяет вход.
"""

from __future__ import annotations

import hashlib
import hmac
import json
import logging
import os
import queue
import subprocess
import sys
import threading
import time
import traceback
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from flask import Flask, Response, jsonify, request, send_file


ROOT = Path(__file__).resolve().parent
CONFIG_PATH = ROOT / "api_config.json"
DATA_DIR = ROOT / "api_jobs"
SOLVER_SCRIPT = ROOT / "ram_launch_debug.py"
COOKIE_MARKER = "_|WARNING"
TERMINAL = {"completed", "failed", "cancelled"}


DEFAULT_CONFIG: dict[str, Any] = {
    "host": "127.0.0.1",
    "port": 8765,
    "api_key": "",
    "place_id": 2809202155,
    "job_timeout_seconds": 1200,
    "captcha_max_attempts": 3,
    "probe_invalidated_in_roblox": False,
    "network_diagnostics": True,
    "keep_chromium_profiles": False,
    "chromium_profile_max_age_hours": 24,
    "chromium_executable_path": "",
    "chromium_locale": "en-US",
    "chromium_timezone_id": "",
    "extension_enabled": True,
    "network_identity_url": "https://www.cloudflare.com/cdn-cgi/trace",
    "max_accounts": 10000,
    "chromium_proxy_server": "",
    "chromium_proxy_username": "",
    "chromium_proxy_password": "",
    "chromium_proxy_bypass": "localhost,127.0.0.1",
}


def load_config() -> dict[str, Any]:
    if not CONFIG_PATH.exists():
        CONFIG_PATH.write_text(
            json.dumps(DEFAULT_CONFIG, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        return dict(DEFAULT_CONFIG)
    try:
        loaded = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise RuntimeError(f"Invalid {CONFIG_PATH}: {exc}") from exc
    result = dict(DEFAULT_CONFIG)
    result.update(loaded)
    return result


CONFIG = load_config()
DATA_DIR.mkdir(parents=True, exist_ok=True)


logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(message)s",
    datefmt="%H:%M:%S",
    stream=sys.stdout,
    force=True,
)
LOGGER = logging.getLogger("manual-solver-api")
# Стандартные строки Flask вида "POST /..." только забивают консоль при polling.
logging.getLogger("werkzeug").setLevel(logging.ERROR)


def log_event(event: str, **fields: Any) -> None:
    details = " ".join(f"{name}={value}" for name, value in fields.items())
    LOGGER.info("%s%s", event, f" | {details}" if details else "")


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def cookie_hash(cookie: str) -> str:
    return hashlib.sha256(cookie.encode("utf-8")).hexdigest()


def extract_cookie(value: Any) -> str | None:
    if isinstance(value, str):
        marker = value.find(COOKIE_MARKER)
        if marker >= 0:
            return value[marker:].strip()
        return None
    if isinstance(value, dict):
        for nested in value.values():
            found = extract_cookie(nested)
            if found:
                return found
    if isinstance(value, list):
        for nested in value:
            found = extract_cookie(nested)
            if found:
                return found
    return None


def parse_account_line(line: str, index: int) -> tuple[str, str]:
    marker = line.find(COOKIE_MARKER)
    if marker < 0:
        raise ValueError("account line has no Roblox cookie marker")
    cookie = line[marker:].strip()
    prefix = line[:marker].rstrip(": ")
    username = prefix.split(":", 1)[0].strip() if prefix else f"account_{index}"
    return username or f"account_{index}", cookie


def normalize_accounts(raw: Any) -> list[str]:
    if isinstance(raw, str):
        candidates = raw.splitlines()
    elif isinstance(raw, list):
        candidates = [item for item in raw if isinstance(item, str)]
    else:
        return []
    return [line.strip() for line in candidates if COOKIE_MARKER in line]


@dataclass
class Job:
    job_id: str
    account_lines: list[str]
    captcha_type: str = "ingame"
    status: str = "pending"
    processed: int = 0
    successful: int = 0
    already_solved: int = 0
    failed: int = 0
    created_at: str = field(default_factory=utc_now)
    started_at: str | None = None
    finished_at: str | None = None
    cancel_requested: bool = False
    current_account: str | None = None
    result_files: list[str] = field(default_factory=list)
    results: dict[str, list[str]] = field(
        default_factory=lambda: {
            "solved.txt": [],
            "already_solved.txt": [],
            "failed.txt": [],
        }
    )
    done: threading.Event = field(default_factory=threading.Event, repr=False)

    def public(self) -> dict[str, Any]:
        return {
            "job_id": self.job_id,
            "status": self.status,
            "total_accounts": len(self.account_lines),
            "processed": self.processed,
            "successful": self.successful,
            "already_solved": self.already_solved,
            "failed": self.failed,
            "charged_credits": 0.0,
            "result_files": list(self.result_files),
            "captcha_type": self.captcha_type,
            "current_account": self.current_account,
            "created_at": self.created_at,
            "started_at": self.started_at,
            "finished_at": self.finished_at,
            "cancel_requested": self.cancel_requested,
        }


JOBS: dict[str, Job] = {}
ACTIVE_COOKIE_JOBS: dict[str, str] = {}
JOBS_LOCK = threading.RLock()
WORK_QUEUE: queue.Queue[str] = queue.Queue()
WORKER_STARTED = False


def job_dir(job: Job) -> Path:
    path = DATA_DIR / job.job_id
    path.mkdir(parents=True, exist_ok=True)
    return path


def save_job(job: Job) -> None:
    path = job_dir(job) / "job.json"
    temporary = path.with_suffix(".json.tmp")
    temporary.write_text(
        json.dumps(job.public(), ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    os.replace(temporary, path)


def write_results(job: Job) -> None:
    directory = job_dir(job)
    files: list[str] = []
    for filename, lines in job.results.items():
        if not lines:
            continue
        (directory / filename).write_text("\n".join(lines) + "\n", encoding="utf-8")
        files.append(filename)
    job.result_files = files


def classify_run(exit_code: int, log_text: str) -> str:
    if "CAPTCHA_SOLVED_SUCCESSFULLY" in log_text and exit_code == 0:
        if "PREFLIGHT_RESULT captcha=NOT_DETECTED" in log_text:
            return "already_solved"
        return "solved"
    return "failed"


def run_account(job: Job, line: str, index: int) -> str:
    username, cookie = parse_account_line(line, index)
    directory = job_dir(job)
    log_path = directory / f"{index:05d}_{username}_solver.log"
    console_path = directory / f"{index:05d}_{username}_console.log"
    started = time.monotonic()
    log_event(
        "ACCOUNT_STARTED",
        job_id=job.job_id,
        account=username,
        number=f"{index}/{len(job.account_lines)}",
    )
    log_event(
        "MANUAL_ACTION_REQUIRED",
        account=username,
        message="реши проверку в открывшемся Chromium; API продолжит автоматически",
    )
    environment = os.environ.copy()
    environment.update(
        {
            "RAM_LAUNCH_COOKIE": cookie,
            "RAM_LAUNCH_PLACE_ID": str(CONFIG["place_id"]),
            "RAM_LAUNCH_JOB_ID": "",
            "RAM_LAUNCH_LOG_FILE": str(log_path),
            "RAM_LAUNCH_CONSOLE_VERBOSE": "0",
            "RAM_LAUNCH_ALLOW_ENTER": "0",
            "RAM_LAUNCH_CAPTCHA_MAX_ATTEMPTS": str(CONFIG["captcha_max_attempts"]),
            "RAM_LAUNCH_PROBE_INVALIDATED_IN_ROBLOX": str(
                bool(CONFIG.get("probe_invalidated_in_roblox", False))
            ),
            "RAM_LAUNCH_NETWORK_DIAGNOSTICS": str(
                bool(CONFIG.get("network_diagnostics", True))
            ),
            "RAM_LAUNCH_KEEP_CHROMIUM_PROFILES": str(
                bool(CONFIG.get("keep_chromium_profiles", False))
            ),
            "RAM_LAUNCH_PROFILE_MAX_AGE_HOURS": str(
                int(CONFIG.get("chromium_profile_max_age_hours", 24))
            ),
            "RAM_LAUNCH_CHROMIUM_EXECUTABLE_PATH": str(
                CONFIG.get("chromium_executable_path") or ""
            ),
            "RAM_LAUNCH_CHROMIUM_LOCALE": str(
                CONFIG.get("chromium_locale") or "en-US"
            ),
            "RAM_LAUNCH_CHROMIUM_TIMEZONE_ID": str(
                CONFIG.get("chromium_timezone_id") or ""
            ),
            "RAM_LAUNCH_EXTENSION_ENABLED": str(
                bool(CONFIG.get("extension_enabled", True))
            ),
            "RAM_LAUNCH_NETWORK_IDENTITY_URL": str(
                CONFIG.get("network_identity_url") or ""
            ),
            "RAM_LAUNCH_CHROMIUM_PROXY_SERVER": str(
                CONFIG.get("chromium_proxy_server") or ""
            ),
            "RAM_LAUNCH_CHROMIUM_PROXY_USERNAME": str(
                CONFIG.get("chromium_proxy_username") or ""
            ),
            "RAM_LAUNCH_CHROMIUM_PROXY_PASSWORD": str(
                CONFIG.get("chromium_proxy_password") or ""
            ),
            "RAM_LAUNCH_CHROMIUM_PROXY_BYPASS": str(
                CONFIG.get("chromium_proxy_bypass") or ""
            ),
        }
    )
    with console_path.open("w", encoding="utf-8") as console:
        try:
            process = subprocess.Popen(
                [sys.executable, str(SOLVER_SCRIPT)],
                cwd=str(ROOT),
                env=environment,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                encoding="utf-8",
                errors="replace",
                bufsize=1,
            )

            def relay_output() -> None:
                assert process.stdout is not None
                for output_line in process.stdout:
                    console.write(output_line)
                    console.flush()
                    clean = output_line.rstrip()
                    # CAPTCHA_URL сохраняется в файл, но его огромная строка не
                    # перекрывает всю консоль API.
                    if clean and "CAPTCHA_URL:" not in clean:
                        print(f"[SOLVER {username}] {clean}", flush=True)

            relay = threading.Thread(
                target=relay_output,
                name=f"solver-output-{job.job_id[:8]}",
                daemon=True,
            )
            relay.start()
            try:
                exit_code = process.wait(timeout=float(CONFIG["job_timeout_seconds"]))
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait(timeout=10)
                console.write("\nAPI wrapper: solver process timed out\n")
                console.flush()
                log_event("ACCOUNT_TIMEOUT", job_id=job.job_id, account=username)
                exit_code = 124
            relay.join(timeout=5)
        except OSError as exc:
            console.write(f"\nAPI wrapper: failed to start solver: {exc}\n")
            console.flush()
            log_event(
                "ACCOUNT_START_FAILED",
                job_id=job.job_id,
                account=username,
                error=f"{type(exc).__name__}: {exc}",
            )
            exit_code = 125
    try:
        log_text = log_path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        log_text = ""
    result = classify_run(exit_code, log_text)
    log_event(
        "ACCOUNT_FINISHED",
        job_id=job.job_id,
        account=username,
        result=result,
        exit_code=exit_code,
        elapsed=f"{time.monotonic() - started:.1f}s",
        log=log_path,
    )
    return result


def finish_job(job: Job, status: str) -> None:
    job.status = status
    job.current_account = None
    job.finished_at = utc_now()
    write_results(job)
    save_job(job)
    for line in job.account_lines:
        cookie = extract_cookie(line)
        if not cookie:
            continue
        digest = cookie_hash(cookie)
        if ACTIVE_COOKIE_JOBS.get(digest) == job.job_id:
            ACTIVE_COOKIE_JOBS.pop(digest, None)
    job.done.set()
    log_event(
        "JOB_FINISHED",
        job_id=job.job_id,
        status=status,
        processed=f"{job.processed}/{len(job.account_lines)}",
        solved=job.successful,
        already_solved=job.already_solved,
        failed=job.failed,
        results=job_dir(job),
    )


def worker_loop() -> None:
    while True:
        job_id = WORK_QUEUE.get()
        try:
            with JOBS_LOCK:
                job = JOBS.get(job_id)
                if job is None:
                    continue
                if job.cancel_requested:
                    finish_job(job, "cancelled")
                    continue
                job.status = "processing"
                job.started_at = utc_now()
                save_job(job)
                log_event(
                    "JOB_PROCESSING",
                    job_id=job.job_id,
                    accounts=len(job.account_lines),
                    queued=WORK_QUEUE.qsize(),
                )

            for index, line in enumerate(job.account_lines, start=1):
                with JOBS_LOCK:
                    if job.cancel_requested:
                        break
                    username, _ = parse_account_line(line, index)
                    job.current_account = username
                    save_job(job)

                result = run_account(job, line, index)
                with JOBS_LOCK:
                    job.results[f"{result}.txt"].append(line)
                    job.processed += 1
                    if result == "solved":
                        job.successful += 1
                    elif result == "already_solved":
                        job.already_solved += 1
                    else:
                        job.failed += 1
                    save_job(job)

            with JOBS_LOCK:
                final_status = "cancelled" if job.cancel_requested else "completed"
                finish_job(job, final_status)
        except Exception as exc:
            LOGGER.error(
                "JOB_CRASHED | job_id=%s error=%s: %s\n%s",
                job_id,
                type(exc).__name__,
                exc,
                traceback.format_exc(),
            )
            with JOBS_LOCK:
                job = JOBS.get(job_id)
                if job is not None:
                    (job_dir(job) / "wrapper_error.txt").write_text(
                        f"{type(exc).__name__}: {exc}\n", encoding="utf-8"
                    )
                    finish_job(job, "failed")
        finally:
            WORK_QUEUE.task_done()


def start_worker() -> None:
    global WORKER_STARTED
    if WORKER_STARTED:
        return
    WORKER_STARTED = True
    threading.Thread(target=worker_loop, name="manual-solver-worker", daemon=True).start()
    log_event("WORKER_READY")


def create_job(lines: list[str], captcha_type: str = "ingame") -> Job:
    job = Job(job_id=str(uuid.uuid4()), account_lines=lines, captcha_type=captcha_type)
    with JOBS_LOCK:
        JOBS[job.job_id] = job
        for line in lines:
            cookie = extract_cookie(line)
            if cookie:
                ACTIVE_COOKIE_JOBS[cookie_hash(cookie)] = job.job_id
        save_job(job)
        WORK_QUEUE.put(job.job_id)
    log_event(
        "JOB_ACCEPTED",
        job_id=job.job_id,
        accounts=len(lines),
        queue_position=WORK_QUEUE.qsize(),
    )
    return job


def supplied_api_key(payload: dict[str, Any]) -> str:
    header = request.headers.get("X-API-Key", "")
    query = request.args.get("api_key") or request.args.get("key") or ""
    body = str(payload.get("api_key") or payload.get("key") or "")
    configured = str(CONFIG.get("api_key") or "")
    field_name = configured if configured and configured in payload else ""
    return header or query or body or field_name


def authenticate(payload: dict[str, Any]) -> Response | None:
    configured = str(CONFIG.get("api_key") or "")
    if not configured:
        return None
    supplied = supplied_api_key(payload)
    if not supplied or not hmac.compare_digest(supplied, configured):
        return jsonify({"error": "Invalid API key"}), 401
    return None


app = Flask(__name__)
start_worker()


@app.post("/api/zerosolver-api/solve")
def solve():
    payload = request.get_json(silent=True) or {}
    denied = authenticate(payload)
    if denied:
        return denied
    captcha_type = str(
        payload.get("captcha_type") or request.args.get("captcha_type") or "ingame"
    ).lower()
    if captcha_type != "ingame":
        return jsonify({"error": "Only captcha_type=ingame is supported"}), 400
    cookie = extract_cookie(payload)
    if not cookie:
        return jsonify({"error": "No valid Roblox cookie found"}), 400
    username = str(payload.get("username") or "account")
    line = f"{username}::{cookie}"
    digest = cookie_hash(cookie)
    with JOBS_LOCK:
        existing_id = ACTIVE_COOKIE_JOBS.get(digest)
        job = JOBS.get(existing_id) if existing_id else None
        if job is None or job.status in TERMINAL:
            job = create_job([line], captcha_type)
            duplicate = False
        else:
            duplicate = True
            log_event(
                "JOB_ALREADY_ACTIVE",
                job_id=job.job_id,
                account=username,
                status=job.status,
            )

    # Результат клиент получает через /status/<job_id>; HTTP-ответ не ждёт Chromium.
    return (
        jsonify(
            {
                "status": "processing",
                "job_id": job.job_id,
                "queue_position": WORK_QUEUE.qsize(),
                "duplicate": duplicate,
            }
        ),
        202,
    )


@app.post("/api/zerosolver-api/submit")
def submit():
    payload = request.get_json(silent=True) or {}
    denied = authenticate(payload)
    if denied:
        return denied
    captcha_type = str(payload.get("captcha_type") or "ingame").lower()
    if captcha_type != "ingame":
        return jsonify({"error": "Only captcha_type=ingame is supported"}), 400
    lines = normalize_accounts(payload.get("accounts"))
    if not lines:
        return jsonify({"error": "No valid accounts found"}), 400
    if len(lines) > int(CONFIG["max_accounts"]):
        return jsonify(
            {"error": f"Maximum {int(CONFIG['max_accounts'])} accounts per request"}
        ), 400
    job = create_job(lines, captcha_type)
    return jsonify(
        {
            "job_id": job.job_id,
            "total_accounts": len(lines),
            "estimated_cost": 0.0,
            "cost_per_success": 0.0,
        }
    )


@app.get("/api/zerosolver-api/status/<job_id>")
def status(job_id: str):
    denied = authenticate({})
    if denied:
        return denied
    with JOBS_LOCK:
        job = JOBS.get(job_id)
        if job is None:
            return jsonify({"error": "Job not found"}), 404
        return jsonify(job.public())


@app.post("/api/zerosolver-api/cancel/<job_id>")
def cancel(job_id: str):
    payload = request.get_json(silent=True) or {}
    denied = authenticate(payload)
    if denied:
        return denied
    with JOBS_LOCK:
        job = JOBS.get(job_id)
        if job is None:
            return jsonify({"error": "Job not found"}), 404
        if job.status not in TERMINAL:
            job.cancel_requested = True
            save_job(job)
            log_event("JOB_CANCEL_REQUESTED", job_id=job_id)
    return jsonify({"status": "success"})


@app.get("/api/zerosolver-api/download/<job_id>/<filename>")
def download(job_id: str, filename: str):
    denied = authenticate({})
    if denied:
        return denied
    if filename not in {"solved.txt", "already_solved.txt", "failed.txt"}:
        return jsonify({"error": "Invalid filename"}), 400
    with JOBS_LOCK:
        job = JOBS.get(job_id)
        if job is None:
            return jsonify({"error": "Job not found"}), 404
        path = job_dir(job) / filename
    if not path.is_file():
        return jsonify({"error": "Result file not found"}), 404
    return send_file(path, mimetype="text/plain; charset=utf-8", as_attachment=True)


@app.get("/api/zerosolver-api/credits")
def credits():
    denied = authenticate({})
    if denied:
        return denied
    return jsonify(
        {
            "balance": 0.0,
            "pending": 0.0,
            "reserved": 0.0,
            "effective": 0.0,
            "cost_per_success": 0.0,
            "captcha_lock_cost_per_success": 0.0,
            "billing": "local_manual",
            "unlimited": True,
        }
    )


@app.get("/api/zerosolver-api/active")
def active():
    denied = authenticate({})
    if denied:
        return denied
    with JOBS_LOCK:
        jobs = [job.public() for job in JOBS.values() if job.status not in TERMINAL]
    return jsonify({"jobs": jobs})


@app.get("/health")
def health():
    return jsonify(
        {
            "status": "ok",
            "mode": "human_in_the_loop",
            "queue_size": WORK_QUEUE.qsize(),
            "worker": "running" if WORKER_STARTED else "stopped",
        }
    )


if __name__ == "__main__":
    log_event(
        "API_READY",
        address=f"http://{CONFIG['host']}:{CONFIG['port']}/api/zerosolver-api",
        place_id=CONFIG["place_id"],
        max_attempts=CONFIG["captcha_max_attempts"],
        job_timeout=f"{CONFIG['job_timeout_seconds']}s",
        chromium_proxy=CONFIG.get("chromium_proxy_server") or "disabled",
    )
    app.run(
        host=str(CONFIG["host"]),
        port=int(CONFIG["port"]),
        threaded=True,
        debug=False,
        use_reloader=False,
    )
