"""Минимальный диагностический запуск Roblox по схеме старого RAM.

Зависимость: pip install requests
Windows only: итоговая ссылка открывается через зарегистрированный roblox-player: handler.
"""

from __future__ import annotations

import base64
import hashlib
import json
import os
import random
import re
import shutil
import subprocess
import sys
import threading
import time
import traceback
import uuid
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote, quote_plus, urlencode, urlsplit, urlunsplit

import requests


# --- НАСТРОЙКИ ---------------------------------------------------------------
ROBLOSECURITY = "PASTE_COOKIE_HERE"
PLACE_ID = 2809202155

# Необязательно: UUID конкретного публичного сервера. Пусто = обычный Join.
JOB_ID = ""

# API-обёртка передаёт настройки через окружение, прямой запуск по-прежнему
# использует значения выше.
ROBLOSECURITY = os.getenv("RAM_LAUNCH_COOKIE", ROBLOSECURITY)
PLACE_ID = int(os.getenv("RAM_LAUNCH_PLACE_ID", str(PLACE_ID)))
JOB_ID = os.getenv("RAM_LAUNCH_JOB_ID", JOB_ID)

# В JoinServer старого RAM CSRF запрашивается дважды. Оставлено для точного
# сравнения трафика; False убирает лишний запрос.
RAM_DOUBLE_CSRF = True

# Проверить /v1/join-game до запуска Roblox. При обнаружении GCS-капчи скрипт
# выведет ссылку и дождётся Enter, чтобы капчу можно было решить вручную.
GAMEJOIN_PREFLIGHT = True
WAIT_FOR_INPUT_ON_PREFLIGHT_CAPTCHA = True
WAIT_FOR_INPUT_ON_PREFLIGHT_CAPTCHA = os.getenv(
    "RAM_LAUNCH_ALLOW_ENTER", "1"
).strip().lower() not in {"0", "false", "no", "off"}
# Открыть найденную challenge-ссылку в видимом Playwright Chromium и сохранить
# полный HAR + важные события страницы. Решение капчи остаётся ручным.
CAPTCHA_PLAYWRIGHT_CAPTURE = True
CAPTCHA_CAPTURE_SETTLE_SECONDS = 5
# HAR и сетевые callbacks включены для текущей диагностики 403. Их можно
# отключить через RAM_LAUNCH_NETWORK_DIAGNOSTICS=0 после завершения исследования.
CAPTCHA_NETWORK_DIAGNOSTICS = os.getenv(
    "RAM_LAUNCH_NETWORK_DIAGNOSTICS", "1"
).strip().lower() in {"1", "true", "yes", "on"}
# Сколько раз создавать новый challenge после отклонённого решения.
CAPTCHA_MAX_ATTEMPTS = 3
CAPTCHA_MAX_ATTEMPTS = int(
    os.getenv("RAM_LAUNCH_CAPTCHA_MAX_ATTEMPTS", str(CAPTCHA_MAX_ATTEMPTS))
)
# Диагностический режим: если веб-страница прислала challengeInvalidated,
# всё равно один раз запускаем Roblox и считаем окончательным только client log.
PROBE_INVALIDATED_IN_ROBLOX = os.getenv(
    "RAM_LAUNCH_PROBE_INVALIDATED_IN_ROBLOX", "0"
).strip().lower() in {"1", "true", "yes", "on"}
# True остановит запуск, если повторная проверка после Enter всё ещё видит капчу.
# False всё равно попробует запустить Roblox — удобно для диагностики.
STOP_ON_PREFLIGHT_CAPTCHA = True

TIMEOUT_SECONDS = 30
MONITOR_SECONDS = 120
MONITOR_POLL_SECONDS = 0.25
# После появления RobloxPlayerBeta и нового client log этого времени достаточно,
# чтобы GCS успел записать challenge в лог. Если его нет — тест успешен.
ROBLOX_POST_START_CHECK_SECONDS = 15
# True вернёт полный дубль файла в консоль. При False консоль показывает только
# основные этапы, а все подробности остаются в log-файле.
CONSOLE_VERBOSE = False
CONSOLE_VERBOSE = os.getenv("RAM_LAUNCH_CONSOLE_VERBOSE", "0").strip().lower() not in {
    "0",
    "false",
    "no",
    "off",
}
SCRIPT_DIR = Path(__file__).resolve().parent
LOG_DIR = SCRIPT_DIR / "ram_launch_logs"
# Распакованное Chromium-расширение: extension/manifest.json.
# Если manifest.json отсутствует, Chromium запускается без расширения.
EXTENSION_DIR = SCRIPT_DIR / "extension"
# Every capture attempt receives a new profile. Reusing one persistent profile
# across unrelated Roblox cookies leaves account-bound localStorage, service
# workers and auxiliary cookies behind and can invalidate challenge redemption.
CHROMIUM_PROFILE_ROOT = SCRIPT_DIR / "chromium_profiles"
KEEP_CHROMIUM_PROFILES = os.getenv(
    "RAM_LAUNCH_KEEP_CHROMIUM_PROFILES", "0"
).strip().lower() in {"1", "true", "yes", "on"}
CHROMIUM_PROFILE_MAX_AGE_HOURS = int(
    os.getenv("RAM_LAUNCH_PROFILE_MAX_AGE_HOURS", "24")
)
CHROMIUM_EXECUTABLE_PATH = os.getenv(
    "RAM_LAUNCH_CHROMIUM_EXECUTABLE_PATH", ""
).strip()
CHROMIUM_LOCALE = os.getenv("RAM_LAUNCH_CHROMIUM_LOCALE", "en-US").strip()
CHROMIUM_TIMEZONE_ID = os.getenv(
    "RAM_LAUNCH_CHROMIUM_TIMEZONE_ID", ""
).strip()
CHROMIUM_EXTENSION_ENABLED = os.getenv(
    "RAM_LAUNCH_EXTENSION_ENABLED", "1"
).strip().lower() in {"1", "true", "yes", "on"}
# Прокси применяется ко всему persistent Chromium context, включая запросы
# страниц, service worker и загруженного расширения.
CHROMIUM_PROXY_SERVER = os.getenv("RAM_LAUNCH_CHROMIUM_PROXY_SERVER", "").strip()
CHROMIUM_PROXY_USERNAME = os.getenv("RAM_LAUNCH_CHROMIUM_PROXY_USERNAME", "").strip()
CHROMIUM_PROXY_PASSWORD = os.getenv("RAM_LAUNCH_CHROMIUM_PROXY_PASSWORD", "").strip()
CHROMIUM_PROXY_BYPASS = os.getenv("RAM_LAUNCH_CHROMIUM_PROXY_BYPASS", "").strip()
NETWORK_IDENTITY_URL = os.getenv(
    "RAM_LAUNCH_NETWORK_IDENTITY_URL",
    "https://www.cloudflare.com/cdn-cgi/trace",
).strip()
# -----------------------------------------------------------------------------


AUTH_TICKET_URL = "https://auth.roblox.com/v1/authentication-ticket/"
CLIENT_ASSERTION_URL = "https://auth.roblox.com/v1/client-assertion/"
GAMEJOIN_URL = "https://gamejoin.roblox.com/v1/join-game"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
)
RAM_BROWSER_USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/111.0.0.0 Safari/537.36"
)

IMPORTANT_LOG_PATTERN = re.compile(
    r"captcha|challenge|place.?launcher|join|authentication|ticket|"
    r"error|fail|disconnect|moderated|not.?approved|403|401|429",
    re.IGNORECASE,
)
GCS_CHALLENGE_PATTERN = re.compile(
    r"challengedByGcs|challenge(?:PageLoaded|Parsed|Initialized|Displayed)|"
    r"captchav2|CAPTCHA_MODE_|genericChallengeId|challenge/cdn/hybrid",
    re.IGNORECASE,
)
CAPTCHA_NETWORK_PATTERN = re.compile(
    r"captcha|challenge|arkose|funcaptcha|join-game|authentication-ticket|continue",
    re.IGNORECASE,
)


@dataclass
class GameJoinPreflight:
    captcha_detected: bool
    captcha_url: str
    challenge_id: str
    challenge_type: str
    encoded_metadata: str
    attempt_id: str
    request_body: dict[str, object]


@dataclass
class CaptchaCompletion:
    challenge_id: str
    challenge_type: str
    challenge_metadata: str
    browser_cookie: str
    browser_cookies: list[dict[str, object]]
    browser_replay_accepted: bool
    replay_preflight: GameJoinPreflight
    probe_launch: bool = False


class TraceLogger:
    def __init__(self) -> None:
        LOG_DIR.mkdir(parents=True, exist_ok=True)
        requested_path = os.getenv("RAM_LAUNCH_LOG_FILE", "").strip()
        if requested_path:
            self.path = Path(requested_path).resolve()
            self.path.parent.mkdir(parents=True, exist_ok=True)
        else:
            stamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
            self.path = LOG_DIR / f"ram_launch_{stamp}_{os.getpid()}.log"

    def write(self, message: str = "") -> None:
        line = f"[{datetime.now().strftime('%H:%M:%S.%f')[:-3]}] {message}"
        with self.path.open("a", encoding="utf-8") as stream:
            stream.write(line + "\n")
        useful_console_events = (
            "Log file:",
            "Config:",
            "PREFLIGHT_RESULT ",
            "STEP CAPTCHA_ATTEMPT ",
            "STEP CAPTCHA_TYPE=",
            "STEP CAPTCHA_MANUAL_WAIT ",
            "STEP CAPTCHA_SOLVE_TIMEOUT",
            "STEP CAPTCHA_BUTTON_POLL_INTERRUPTED ",
            "CAPTCHA_CONTINUE_RESPONSE ",
            "CAPTCHA_CONTINUE_REQUEST_FAILED ",
            "CAPTCHA_SOLVE_CONFIRMED ",
            "CAPTCHA_SOLVE_REJECTED ",
            "CAPTCHA_WAIT_RESULT ",
            "CAPTCHA_CAPTURE_RESULT ",
            "CAPTCHA_ATTEMPT_RESULT ",
            "CAPTCHA_FRESH_CHALLENGE_FAILED ",
            "CHROMIUM_PROFILE ",
            "NETWORK_IDENTITY_COMPARE ",
            "NETWORK_ROUTE_MISMATCH ",
            "ROBLOX_BROWSER_WARMUP ",
            "GAMEJOIN_BROWSER_REPLAY_RESULT ",
            "GAMEJOIN_CHALLENGE_REPLAY_RESULT ",
            "GAMEJOIN_REPLAY_BYPASSED ",
            "STEP LAUNCH:",
            "STEP MONITOR:",
            "PROCESS_STARTED ",
            "MONITOR_RESULT ",
            "CAPTCHA_SOLVED_SUCCESSFULLY ",
            "CAPTCHA_TEST_FAILED ",
            "CAPTCHA_TEST_INCONCLUSIVE ",
            "HTTP ERROR:",
            "ERROR:",
            "STOP:",
        )
        if CONSOLE_VERBOSE or message.startswith(useful_console_events):
            print(line, flush=True)


LOG = TraceLogger()


def value_fingerprint(value: object) -> str:
    rendered = str(value or "")
    return f"sha256:{hashlib.sha256(rendered.encode('utf-8')).hexdigest()[:12]} len={len(rendered)}"


def sanitized_headers(headers) -> dict[str, str]:
    result: dict[str, str] = {}
    sensitive = {
        "authorization",
        "cookie",
        "set-cookie",
        "x-csrf-token",
        "rbx-authentication-ticket",
        "rblx-challenge-metadata",
    }
    for name, value in headers.items():
        rendered = str(value)
        if str(name).lower() in sensitive:
            result[str(name)] = f"<{value_fingerprint(rendered)}>"
        else:
            result[str(name)] = rendered
    return result


def cookie_snapshot(cookies: list[dict[str, object]]) -> list[dict[str, object]]:
    snapshot: list[dict[str, object]] = []
    for item in sorted(
        cookies,
        key=lambda current: (
            str(current.get("domain") or ""),
            str(current.get("name") or ""),
        ),
    ):
        snapshot.append(
            {
                "name": str(item.get("name") or ""),
                "domain": str(item.get("domain") or ""),
                "path": str(item.get("path") or ""),
                "secure": bool(item.get("secure")),
                "httpOnly": bool(item.get("httpOnly")),
                "sameSite": str(item.get("sameSite") or ""),
                "expires": item.get("expires"),
                "value": value_fingerprint(item.get("value") or ""),
            }
        )
    return snapshot


def log_cookie_snapshot(label: str, cookies: list[dict[str, object]]) -> None:
    LOG.write(
        f"COOKIE_SNAPSHOT label={label} count={len(cookies)}\n"
        + json.dumps(cookie_snapshot(cookies), ensure_ascii=False, indent=2)
    )


def proxy_url_for_requests() -> str:
    if not CHROMIUM_PROXY_SERVER:
        return ""
    parsed = urlsplit(CHROMIUM_PROXY_SERVER)
    if not parsed.scheme:
        parsed = urlsplit("http://" + CHROMIUM_PROXY_SERVER)
    if not CHROMIUM_PROXY_USERNAME or "@" in parsed.netloc:
        return urlunsplit(parsed)
    credentials = quote(CHROMIUM_PROXY_USERNAME, safe="")
    if CHROMIUM_PROXY_PASSWORD:
        credentials += ":" + quote(CHROMIUM_PROXY_PASSWORD, safe="")
    return urlunsplit(
        (parsed.scheme, f"{credentials}@{parsed.netloc}", parsed.path, parsed.query, parsed.fragment)
    )


def configure_requests_network(session: requests.Session) -> None:
    proxy_url = proxy_url_for_requests()
    if proxy_url:
        session.proxies.update({"http": proxy_url, "https": proxy_url})
    LOG.write(
        "NETWORK_ROUTE_CONFIG "
        f"python_proxy={str(bool(proxy_url)).lower()} "
        f"chromium_proxy={str(bool(CHROMIUM_PROXY_SERVER)).lower()} "
        "roblox_player_proxy=system_managed"
    )


def parse_trace_ip(text: str) -> str:
    for line in str(text or "").splitlines():
        if line.startswith("ip="):
            return line.partition("=")[2].strip()
    return ""


def log_python_network_identity(session: requests.Session) -> str:
    if not NETWORK_IDENTITY_URL:
        return ""
    try:
        response = session.get(NETWORK_IDENTITY_URL, timeout=15)
        ip = parse_trace_ip(response.text)
        LOG.write(
            "NETWORK_IDENTITY source=python "
            f"status={response.status_code} ip={ip or '<unknown>'}"
        )
        return ip
    except requests.RequestException as exc:
        LOG.write(
            "NETWORK_IDENTITY source=python status=error "
            f"error={type(exc).__name__}:{exc}"
        )
        return ""


def log_system_network_identity() -> str:
    if not NETWORK_IDENTITY_URL:
        return ""
    try:
        response = requests.get(NETWORK_IDENTITY_URL, timeout=15)
        ip = parse_trace_ip(response.text)
        LOG.write(
            "NETWORK_IDENTITY source=system_http "
            f"status={response.status_code} ip={ip or '<unknown>'}"
        )
        return ip
    except requests.RequestException as exc:
        LOG.write(
            "NETWORK_IDENTITY source=system_http status=error "
            f"error={type(exc).__name__}:{exc}"
        )
        return ""


def create_isolated_profile() -> Path:
    CHROMIUM_PROFILE_ROOT.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
    profile = CHROMIUM_PROFILE_ROOT / f"attempt_{stamp}_{uuid.uuid4().hex[:8]}"
    profile.mkdir(parents=True, exist_ok=False)
    LOG.write(f"CHROMIUM_PROFILE mode=isolated path={profile}")
    return profile


def dispose_profile(profile: Path) -> None:
    if KEEP_CHROMIUM_PROFILES:
        LOG.write(f"CHROMIUM_PROFILE_RETAINED path={profile}")
        return
    try:
        shutil.rmtree(profile)
        LOG.write(f"CHROMIUM_PROFILE_REMOVED path={profile}")
    except OSError as exc:
        LOG.write(f"CHROMIUM_PROFILE_REMOVE_ERROR path={profile} error={exc}")


def cleanup_old_profiles() -> None:
    if not CHROMIUM_PROFILE_ROOT.exists():
        return
    cutoff = time.time() - max(1, CHROMIUM_PROFILE_MAX_AGE_HOURS) * 3600
    for profile in CHROMIUM_PROFILE_ROOT.glob("attempt_*"):
        try:
            if profile.is_dir() and profile.stat().st_mtime < cutoff:
                shutil.rmtree(profile)
                LOG.write(f"CHROMIUM_PROFILE_CLEANUP path={profile} reason=expired")
        except OSError as exc:
            LOG.write(f"CHROMIUM_PROFILE_CLEANUP_ERROR path={profile} error={exc}")


def all_headers(headers) -> dict[str, str]:
    return {name: str(value) for name, value in headers.items()}


def pretty_body(body) -> str:
    if body is None:
        return "<empty>"
    if isinstance(body, bytes):
        body = body.decode("utf-8", errors="replace")
    body = str(body)
    if not body:
        return "<empty>"
    try:
        return json.dumps(json.loads(body), ensure_ascii=False, indent=2)
    except (TypeError, ValueError):
        return body[:50_000]


def request_with_trace(session: requests.Session, method: str, url: str, **kwargs) -> requests.Response:
    request = requests.Request(method, url, **kwargs)
    prepared = session.prepare_request(request)

    LOG.write("=" * 78)
    LOG.write(f"REQUEST {prepared.method} {prepared.url}")
    LOG.write(
        "Request headers: "
        + json.dumps(sanitized_headers(prepared.headers), ensure_ascii=False)
    )
    LOG.write("Request body:\n" + pretty_body(prepared.body))

    response = session.send(
        prepared,
        timeout=TIMEOUT_SECONDS,
        allow_redirects=False,
    )

    LOG.write(f"RESPONSE HTTP {response.status_code} {response.reason} elapsed={response.elapsed.total_seconds():.3f}s")
    LOG.write(
        "Response headers: "
        + json.dumps(sanitized_headers(response.headers), ensure_ascii=False)
    )
    LOG.write("Response body:\n" + pretty_body(response.text))
    return response


def get_csrf_token(session: requests.Session, label: str) -> str:
    LOG.write(f"STEP {label}: requesting X-CSRF token")
    response = request_with_trace(
        session,
        "POST",
        AUTH_TICKET_URL,
        headers={"Referer": f"https://www.roblox.com/games/{PLACE_ID}"},
    )
    token = response.headers.get("x-csrf-token", "")
    if not token:
        raise RuntimeError(
            f"CSRF token missing: HTTP {response.status_code}; response={response.text[:1000]!r}"
        )
    LOG.write(f"X-CSRF received: {value_fingerprint(token)}")
    return token


def get_authentication_ticket(session: requests.Session, csrf_token: str) -> str:
    LOG.write("STEP CLIENT_ASSERTION: requesting current Roblox client assertion")
    assertion_response = request_with_trace(
        session,
        "GET",
        CLIENT_ASSERTION_URL,
        headers={"Referer": f"https://www.roblox.com/games/{PLACE_ID}"},
    )
    try:
        client_assertion = assertion_response.json().get("clientAssertion", "")
    except (requests.JSONDecodeError, AttributeError, ValueError) as error:
        raise RuntimeError(
            f"Invalid client-assertion response: HTTP {assertion_response.status_code}; "
            f"response={assertion_response.text[:2000]!r}"
        ) from error
    if not client_assertion:
        raise RuntimeError(
            f"clientAssertion missing: HTTP {assertion_response.status_code}; "
            f"response={assertion_response.text[:2000]!r}"
        )
    LOG.write(f"Client assertion received: {value_fingerprint(client_assertion)}")

    LOG.write("STEP AUTH_TICKET: requesting rbx-authentication-ticket")
    response = request_with_trace(
        session,
        "POST",
        AUTH_TICKET_URL,
        headers={
            "Referer": f"https://www.roblox.com/games/{PLACE_ID}",
            "X-CSRF-TOKEN": csrf_token,
        },
        json={"clientAssertion": client_assertion},
    )
    ticket = response.headers.get("rbx-authentication-ticket", "")
    if not ticket:
        raise RuntimeError(
            f"Authentication ticket missing: HTTP {response.status_code}; "
            f"response={response.text[:2000]!r}"
        )
    LOG.write(f"Authentication ticket received: {value_fingerprint(ticket)}")
    return ticket


def decode_challenge_metadata(value: str) -> object:
    if not value:
        return None
    try:
        padded = value + "=" * (-len(value) % 4)
        decoded = base64.urlsafe_b64decode(padded).decode("utf-8", errors="replace")
        return json.loads(decoded)
    except (ValueError, TypeError, json.JSONDecodeError) as exc:
        return {"decodeError": str(exc), "raw": value}


def is_captcha_challenge_type(value: object) -> bool:
    """Roblox currently returns both `captcha` and `captchav2`."""
    normalized = str(value or "").strip().lower().replace("-", "")
    return normalized.startswith("captcha")


def build_hybrid_challenge_url(
    challenge_type: str,
    challenge_id: str,
    encoded_metadata: str,
) -> str:
    query = urlencode(
        {
            "generic-challenge-type": challenge_type or "captcha",
            "app-type": "windows",
            "generic-challenge-id": challenge_id,
            "challenge-metadata-json": encoded_metadata,
            "challenge-type": "generic",
            "dark-mode": "false",
        }
    )
    return f"https://www.roblox.com/challenge/cdn/hybrid?{query}"


def preflight_gamejoin(session: requests.Session) -> GameJoinPreflight:
    attempt_id = str(uuid.uuid4())
    request_body: dict[str, object] = {
        "placeId": PLACE_ID,
        "gameJoinAttemptId": attempt_id,
    }
    LOG.write(f"STEP GAMEJOIN_PREFLIGHT: attempt_id={attempt_id}")
    response = request_with_trace(
        session,
        "POST",
        GAMEJOIN_URL,
        headers={
            "User-Agent": "Roblox/WinInetRobloxApp/0.738.0.7381397 (GlobalDist; RobloxDirectDownload)",
            "Referer": f"https://www.roblox.com/games/{PLACE_ID}/",
            "Origin": "https://www.roblox.com",
            "Accept": "application/json",
        },
        json=request_body,
    )

    challenge_type = response.headers.get("rblx-challenge-type", "")
    challenge_id = response.headers.get("rblx-challenge-id", "")
    encoded_metadata = response.headers.get("rblx-challenge-metadata", "")
    metadata = decode_challenge_metadata(encoded_metadata)

    LOG.write(f"GAMEJOIN_PREFLIGHT challenge_type={challenge_type or '<none>'}")
    LOG.write(f"GAMEJOIN_PREFLIGHT challenge_id={challenge_id or '<none>'}")
    LOG.write(
        "GAMEJOIN_PREFLIGHT decoded_metadata:\n"
        + json.dumps(metadata, ensure_ascii=False, indent=2)
    )

    is_captcha = response.status_code == 403 and is_captcha_challenge_type(
        challenge_type
    )
    captcha_url = ""
    if is_captcha:
        captcha_url = build_hybrid_challenge_url(
            challenge_type,
            challenge_id,
            encoded_metadata,
        )
        LOG.write(
            "PREFLIGHT_RESULT captcha=GCS_DETECTED "
            f"challenge_type={challenge_type.lower()}"
        )
        LOG.write(f"CAPTCHA_URL: {captcha_url}")
    elif response.status_code == 200:
        LOG.write("PREFLIGHT_RESULT captcha=NOT_DETECTED gamejoin=HTTP_200")
    else:
        LOG.write(
            f"PREFLIGHT_RESULT captcha=UNKNOWN gamejoin=HTTP_{response.status_code}"
        )
    return GameJoinPreflight(
        captcha_detected=is_captcha,
        captcha_url=captcha_url,
        challenge_id=challenge_id,
        challenge_type=challenge_type,
        encoded_metadata=encoded_metadata,
        attempt_id=attempt_id,
        request_body=request_body,
    )


def capture_captcha_with_playwright(
    captcha_url: str,
    cookie: str,
    preflight: GameJoinPreflight,
    python_ip: str = "",
    system_ip: str = "",
) -> CaptchaCompletion | None:
    """Открывает captcha по браузерной схеме RAM и пишет диагностику в HAR."""
    try:
        from playwright.sync_api import Error as PlaywrightError
        from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
        from playwright.sync_api import sync_playwright
        from playwright_stealth import Stealth
    except ImportError as exc:
        LOG.write(f"CAPTCHA_CAPTURE_ERROR browser dependency is not installed: {exc}")
        input("Реши капчу вручную и нажми Enter для продолжения: ")
        return None

    capture_id = uuid.uuid4().hex[:10]
    profile_dir = create_isolated_profile()
    har_path = LOG.path.with_name(f"{LOG.path.stem}_captcha_{capture_id}.har")
    LOG.write(
        "CAPTCHA_CAPTURE_START har="
        + (str(har_path) if CAPTCHA_NETWORK_DIAGNOSTICS else "disabled")
    )
    challenge_completed = threading.Event()
    challenge_invalidated = threading.Event()
    capture_armed = threading.Event()
    base_url_observed = threading.Event()
    continuation: dict[str, str] = {}
    browser_cookie = cookie
    browser_cookies: list[dict[str, object]] = []
    browser_replay_accepted = False
    active_preflight = preflight

    with sync_playwright() as playwright:
        # Эквивалент ключевых настроек AccountBrowser.LaunchBrowser из RAM:
        # visible Chromium, --disable-web-security, no default viewport,
        # IgnoreHTTPSErrors, Chrome 111 UA, stealth and Google referer.
        launch_args = [
            "--disable-web-security",
            "--window-size=880,740",
        ]
        extension_manifest = EXTENSION_DIR / "manifest.json"
        extension_enabled = (
            CHROMIUM_EXTENSION_ENABLED and extension_manifest.is_file()
        )
        if extension_enabled:
            extension_path = str(EXTENSION_DIR.resolve())
            launch_args.extend(
                [
                    f"--disable-extensions-except={extension_path}",
                    f"--load-extension={extension_path}",
                ]
            )
        LOG.write(
            "CHROMIUM_EXTENSION "
            f"enabled={str(extension_enabled).lower()} "
            f"path={EXTENSION_DIR} "
            f"manifest_exists={str(extension_manifest.is_file()).lower()} "
            f"config_exists={str(any((EXTENSION_DIR / name).is_file() for name in ('config.js', 'config.json', 'configs.json'))).lower()}"
        )
        context_options = dict(
            viewport=None,
            ignore_https_errors=True,
            user_agent=RAM_BROWSER_USER_AGENT,
            locale=CHROMIUM_LOCALE or "en-US",
        )
        if CHROMIUM_TIMEZONE_ID:
            context_options["timezone_id"] = CHROMIUM_TIMEZONE_ID
        if CHROMIUM_PROXY_SERVER:
            proxy_options = {"server": CHROMIUM_PROXY_SERVER}
            if CHROMIUM_PROXY_USERNAME:
                proxy_options["username"] = CHROMIUM_PROXY_USERNAME
            if CHROMIUM_PROXY_PASSWORD:
                proxy_options["password"] = CHROMIUM_PROXY_PASSWORD
            if CHROMIUM_PROXY_BYPASS:
                proxy_options["bypass"] = CHROMIUM_PROXY_BYPASS
            context_options["proxy"] = proxy_options
            LOG.write(
                "CHROMIUM_PROXY enabled=true "
                f"server={CHROMIUM_PROXY_SERVER} "
                f"auth={str(bool(CHROMIUM_PROXY_USERNAME or CHROMIUM_PROXY_PASSWORD)).lower()} "
                f"bypass={CHROMIUM_PROXY_BYPASS or '<none>'}"
            )
        else:
            LOG.write("CHROMIUM_PROXY enabled=false")
        if CAPTCHA_NETWORK_DIAGNOSTICS:
            context_options.update(
                record_har_path=str(har_path),
                record_har_mode="full",
                record_har_content="embed",
            )
        launch_options: dict[str, object] = {}
        if CHROMIUM_EXECUTABLE_PATH:
            launch_options["executable_path"] = CHROMIUM_EXECUTABLE_PATH
        context = playwright.chromium.launch_persistent_context(
            user_data_dir=str(profile_dir),
            headless=False,
            args=launch_args,
            **launch_options,
            **context_options,
        )
        context.add_cookies(
            [
                {
                    "name": ".ROBLOSECURITY",
                    "value": cookie,
                    "domain": ".roblox.com",
                    "path": "/",
                    "secure": True,
                    "httpOnly": True,
                    "expires": time.time() + 365 * 24 * 60 * 60,
                }
            ]
        )
        Stealth(
            navigator_user_agent_override=RAM_BROWSER_USER_AGENT,
        ).apply_stealth_sync(context)
        try:
            browser_version = context.browser.version if context.browser else "<unknown>"
        except PlaywrightError:
            browser_version = "<unavailable>"
        LOG.write(
            "CAPTCHA_BROWSER_CONFIG engine=playwright_chromium headless=false "
            "viewport=none disable_web_security=true ignore_https_errors=true "
            "stealth=true user_agent=chrome_111 referer=https://google.com/ "
            f"proxy={str(bool(CHROMIUM_PROXY_SERVER)).lower()} "
            f"profile=isolated browser_version={browser_version!r} "
            f"executable={CHROMIUM_EXECUTABLE_PATH or '<playwright-bundled>'} "
            f"locale={CHROMIUM_LOCALE or '<system>'} "
            f"timezone={CHROMIUM_TIMEZONE_ID or '<system>'}"
        )

        def bind_page(page) -> None:
            LOG.write(f"CAPTCHA_PAGE_OPENED url={page.url}")

            def on_request(request) -> None:
                if (
                    request.url.rstrip("/").endswith("/challenge/v1/continue")
                    or request.url.rstrip("/").endswith("/v1/join-game")
                ):
                    try:
                        LOG.write(
                            "BROWSER_REQUEST_HEADERS "
                            f"method={request.method} url={request.url} "
                            + json.dumps(
                                sanitized_headers(request.all_headers()),
                                ensure_ascii=False,
                            )
                        )
                    except PlaywrightError as exc:
                        LOG.write(
                            "BROWSER_REQUEST_HEADERS_ERROR "
                            f"url={request.url} error={exc}"
                        )
                if "/challenge/" in request.url:
                    LOG.write(f"STEP CHALLENGE_REQ {request.method} {request.url}")
                    if request.url.rstrip("/").endswith("/challenge/v1/continue"):
                        try:
                            payload = json.loads(request.post_data or "{}")
                            LOG.write(
                                f"STEP CHALLENGE_REQ_PAYLOAD id={payload.get('challengeId')} "
                                f"type={payload.get('challengeType')} "
                                f"expected={active_preflight.challenge_id}"
                            )
                        except Exception:
                            pass

                if request.url.rstrip("/").endswith("/challenge/v1/continue"):
                    try:
                        payload = json.loads(request.post_data or "{}")
                        payload_id = str(payload.get("challengeId", ""))
                        payload_type = str(payload.get("challengeType", ""))
                        if (
                            not capture_armed.is_set()
                            or not is_captcha_challenge_type(payload_type)
                            or payload_id != active_preflight.challenge_id
                        ):
                            LOG.write(
                                "CAPTCHA_CONTINUATION_IGNORED "
                                f"armed={capture_armed.is_set()} "
                                f"challenge_id={payload_id or '<none>'} "
                                f"challenge_type={payload_type or '<none>'} "
                                f"expected_id={active_preflight.challenge_id or '<none>'}"
                            )
                            return
                        continuation["challenge_id"] = payload_id
                        continuation["challenge_type"] = payload_type
                        metadata = payload.get("challengeMetadata", "")
                        continuation["challenge_metadata"] = (
                            metadata
                            if isinstance(metadata, str)
                            else json.dumps(metadata, separators=(",", ":"))
                        )
                        LOG.write(
                            "CAPTCHA_CONTINUATION_CAPTURED "
                            f"challenge_id={continuation['challenge_id'] or '<none>'} "
                            f"challenge_type={continuation['challenge_type'] or '<none>'} "
                            f"metadata_length={len(continuation['challenge_metadata'])}"
                        )
                    except Exception as exc:
                        LOG.write(
                            "CAPTCHA_CONTINUATION_CAPTURE_ERROR "
                            f"error={type(exc).__name__}: {exc}"
                        )
                if not CAPTCHA_NETWORK_DIAGNOSTICS:
                    return
                if CAPTCHA_NETWORK_PATTERN.search(request.url) or request.method != "GET":
                    try:
                        raw_post_data = request.post_data_buffer
                        if not raw_post_data:
                            rendered_post_data = "<empty>"
                        else:
                            try:
                                rendered_post_data = raw_post_data.decode("utf-8")
                            except UnicodeDecodeError:
                                rendered_post_data = (
                                    "<binary base64> "
                                    + base64.b64encode(raw_post_data).decode("ascii")
                                )
                    except Exception as exc:
                        rendered_post_data = (
                            f"<unavailable: {type(exc).__name__}: {exc}>"
                        )
                    LOG.write(
                        f"CAPTCHA_REQUEST {request.method} {request.url}\n"
                        f"post_data={rendered_post_data}"
                    )

            def on_response(response) -> None:
                if (
                    response.url.rstrip("/").endswith("/challenge/v1/continue")
                    or response.url.rstrip("/").endswith("/v1/join-game")
                ):
                    try:
                        LOG.write(
                            "BROWSER_RESPONSE_HEADERS "
                            f"status={response.status} url={response.url} "
                            + json.dumps(
                                sanitized_headers(response.all_headers()),
                                ensure_ascii=False,
                            )
                        )
                    except PlaywrightError as exc:
                        LOG.write(
                            "BROWSER_RESPONSE_HEADERS_ERROR "
                            f"url={response.url} error={exc}"
                        )
                if "/challenge/" in response.url:
                    LOG.write(f"STEP CHALLENGE_RESP {response.status} {response.url}")

                if response.url.rstrip("/").endswith("/challenge/v1/continue"):
                    is_expected_captcha = (
                        capture_armed.is_set()
                        and is_captcha_challenge_type(
                            continuation.get("challenge_type", "")
                        )
                        and continuation.get("challenge_id")
                        == active_preflight.challenge_id
                    )
                    try:
                        continue_body = response.text()[:4000]
                    except Exception as exc:
                        continue_body = (
                            f"<unavailable: {type(exc).__name__}: {exc}>"
                        )
                    LOG.write(
                        "CAPTCHA_CONTINUE_RESPONSE "
                        f"status={response.status} expected={str(is_expected_captcha).lower()} "
                        f"challenge_id={continuation.get('challenge_id') or '<none>'} "
                        f"body={continue_body!r}"
                    )
                    if response.status == 200 and is_expected_captcha:
                        if not challenge_completed.is_set():
                            LOG.write(
                                "CAPTCHA_SOLVE_CONFIRMED "
                                "source=challenge_continue_http_200"
                            )
                        challenge_completed.set()
                    elif response.status != 200 and is_expected_captcha:
                        LOG.write(
                            "CAPTCHA_SOLVE_REJECTED "
                            f"status={response.status} action=stop_waiting"
                        )
                        challenge_invalidated.set()
                if not CAPTCHA_NETWORK_DIAGNOSTICS:
                    return
                if CAPTCHA_NETWORK_PATTERN.search(response.url):
                    # Не вызываем response.text() во время загрузки: RAM ничего
                    # подобного не делает, а полное тело всё равно попадёт в HAR.
                    LOG.write(
                        f"CAPTCHA_RESPONSE HTTP {response.status} {response.url} "
                        f"content_type={response.headers.get('content-type', '<none>')}"
                    )

            def on_request_failed(request) -> None:
                if request.url.rstrip("/").endswith("/challenge/v1/continue"):
                    LOG.write(
                        "CAPTCHA_CONTINUE_REQUEST_FAILED "
                        f"failure={request.failure or '<unknown>'} "
                        f"challenge_id={continuation.get('challenge_id') or '<none>'}"
                    )
                    if (
                        capture_armed.is_set()
                        and continuation.get("challenge_id")
                        == active_preflight.challenge_id
                    ):
                        challenge_invalidated.set()

            def on_console(message) -> None:
                LOG.write(f"CAPTCHA_CONSOLE {message.type}: {message.text}")
                if (
                    "challengeCompleted" in message.text
                    and capture_armed.is_set()
                    and continuation.get("challenge_id") == active_preflight.challenge_id
                ):
                    if not challenge_completed.is_set():
                        LOG.write(
                            "CAPTCHA_SOLVE_CONFIRMED "
                            "source=challenge_completed_console"
                        )
                    challenge_completed.set()
                elif (
                    "challengeInvalidated" in message.text
                    and capture_armed.is_set()
                ):
                    if not challenge_invalidated.is_set():
                        LOG.write(
                            "CAPTCHA_SOLVE_REJECTED "
                            "source=challenge_invalidated_console action=stop_waiting"
                        )
                    challenge_invalidated.set()

            def safe_callback(label, callback):
                def wrapped(value) -> None:
                    try:
                        callback(value)
                    except Exception as exc:
                        LOG.write(
                            f"CAPTCHA_CALLBACK_ERROR event={label} "
                            f"error={type(exc).__name__}: {exc}\n"
                            + traceback.format_exc()
                        )

                return wrapped

            page.on("request", safe_callback("request", on_request))
            page.on("response", safe_callback("response", on_response))
            page.on(
                "requestfailed",
                safe_callback("requestfailed", on_request_failed),
            )
            page.on(
                "framenavigated",
                safe_callback(
                    "framenavigated",
                    lambda frame: LOG.write(f"CAPTCHA_NAVIGATION url={frame.url}"),
                ),
            )
            page.on(
                "console",
                safe_callback(
                    "console",
                    on_console,
                ),
            )
            page.on(
                "pageerror",
                safe_callback(
                    "pageerror",
                    lambda error: LOG.write(
                        f"CAPTCHA_PAGE_ERROR {type(error).__name__}: {error}"
                    ),
                ),
            )

        context.on("page", bind_page)
        existing_pages = context.pages
        if existing_pages:
            page = existing_pages[0]
            bind_page(page)
        else:
            page = context.new_page()
        if not CAPTCHA_NETWORK_DIAGNOSTICS:
            LOG.write("CAPTCHA_DIAGNOSTICS mode=minimal_continue_capture")

        try:
            initial_browser_cookies = context.cookies(
                ["https://www.roblox.com", "https://gamejoin.roblox.com"]
            )
            log_cookie_snapshot("browser_after_roblosecurity_seed", initial_browser_cookies)
        except PlaywrightError as exc:
            LOG.write(f"COOKIE_SNAPSHOT_ERROR label=browser_seed error={exc}")

        browser_ip = ""
        if NETWORK_IDENTITY_URL:
            try:
                identity_response = context.request.get(
                    NETWORK_IDENTITY_URL,
                    timeout=15_000,
                )
                browser_ip = parse_trace_ip(identity_response.text())
                LOG.write(
                    "NETWORK_IDENTITY source=chromium_context "
                    f"status={identity_response.status} "
                    f"ip={browser_ip or '<unknown>'}"
                )
                if python_ip and browser_ip:
                    system_matches = not system_ip or system_ip == browser_ip
                    LOG.write(
                        "NETWORK_IDENTITY_COMPARE "
                        f"python_ip={python_ip} chromium_ip={browser_ip} "
                        f"match={str(python_ip == browser_ip).lower()} "
                        f"system_ip={system_ip or '<unknown>'} "
                        f"system_match={str(system_matches).lower()} "
                        "roblox_player_route=system_assumed_not_proven"
                    )
                    if python_ip != browser_ip or not system_matches:
                        LOG.write(
                            "NETWORK_ROUTE_MISMATCH "
                            f"python={python_ip} chromium={browser_ip} "
                            f"system={system_ip or '<unknown>'} "
                            "warning=challenge_and_player_may_use_different_public_ips"
                        )
            except PlaywrightError as exc:
                LOG.write(
                    "NETWORK_IDENTITY source=chromium_context status=error "
                    f"error={type(exc).__name__}:{exc}"
                )

        # Challenge должен быть создан, решён и подтверждён одним и тем же
        # браузерным контекстом. Иначе GCS может принять /challenge/v1/continue,
        # но отвергнуть повтор исходного запроса как чужую сессию.
        try:
            page.goto(
                "https://www.roblox.com/home",
                referer="https://google.com/",
                wait_until="domcontentloaded",
                timeout=120_000,
            )
            page.wait_for_timeout(1500)
            warmup_result = page.evaluate(
                """async () => {
                    try {
                        const response = await fetch(
                            "https://users.roblox.com/v1/users/authenticated",
                            {credentials: "include", headers: {"Accept": "application/json"}}
                        );
                        const text = await response.text();
                        let username = "";
                        try { username = JSON.parse(text).name || ""; } catch (_) {}
                        return {status: response.status, username, text: text.slice(0, 300)};
                    } catch (error) {
                        return {status: 0, username: "", text: String(error)};
                    }
                }"""
            )
            LOG.write(
                "ROBLOX_BROWSER_WARMUP "
                f"status={warmup_result.get('status')} "
                f"username={warmup_result.get('username') or '<none>'} "
                f"body={warmup_result.get('text', '')[:300]!r}"
            )
            warmup_cookies = context.cookies(
                ["https://www.roblox.com", "https://gamejoin.roblox.com"]
            )
            log_cookie_snapshot("browser_after_roblox_warmup", warmup_cookies)
            browser_attempt_id = str(uuid.uuid4())
            browser_request_body: dict[str, object] = {
                "placeId": PLACE_ID,
                "gameJoinAttemptId": browser_attempt_id,
            }
            LOG.write(
                "STEP GAMEJOIN_BROWSER_PREFLIGHT "
                f"attempt_id={browser_attempt_id}"
            )
            browser_preflight = page.evaluate(
                """async ({url, body}) => {
                    try {
                        const response = await fetch(url, {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(body)
                        });
                        return {
                            status: response.status,
                            text: await response.text(),
                            challengeId: response.headers.get("rblx-challenge-id") || "",
                            challengeType: response.headers.get("rblx-challenge-type") || "",
                            challengeMetadata: response.headers.get("rblx-challenge-metadata") || ""
                        };
                    } catch (error) {
                        return {status: 0, text: String(error)};
                    }
                }""",
                {"url": GAMEJOIN_URL, "body": browser_request_body},
            )

            LOG.write(
                "GAMEJOIN_BROWSER_PREFLIGHT_RESULT "
                f"status={browser_preflight.get('status')} "
                f"challenge_id={browser_preflight.get('challengeId') or '<none>'} "
                f"challenge_type={browser_preflight.get('challengeType') or '<none>'} "
                f"body={str(browser_preflight.get('text', ''))[:1000]}"
            )
            if (
                browser_preflight.get("status") == 403
                and is_captcha_challenge_type(
                    browser_preflight.get("challengeType", "")
                )
                and browser_preflight.get("challengeId")
                and browser_preflight.get("challengeMetadata")
            ):
                active_preflight = GameJoinPreflight(
                    captcha_detected=True,
                    captcha_url=build_hybrid_challenge_url(
                        str(browser_preflight.get("challengeType") or "captcha"),
                        str(browser_preflight["challengeId"]),
                        str(browser_preflight["challengeMetadata"]),
                    ),
                    challenge_id=str(browser_preflight["challengeId"]),
                    challenge_type=str(browser_preflight.get("challengeType") or "captcha"),
                    encoded_metadata=str(browser_preflight["challengeMetadata"]),
                    attempt_id=browser_attempt_id,
                    request_body=browser_request_body,
                )
                captcha_url = active_preflight.captcha_url
                LOG.write(
                    "CAPTCHA_SOURCE browser_preflight "
                    f"challenge_id={active_preflight.challenge_id}"
                )
            elif browser_preflight.get("status") == 200:
                browser_cookies = context.cookies(
                    ["https://www.roblox.com", "https://gamejoin.roblox.com"]
                )
                log_cookie_snapshot("browser_preflight_already_clear", browser_cookies)
                for browser_item in browser_cookies:
                    if browser_item.get("name") == ".ROBLOSECURITY":
                        browser_cookie = str(browser_item.get("value") or cookie)
                        break
                LOG.write(
                    "CAPTCHA_CAPTURE_RESULT result=ALREADY_CLEAR "
                    "source=fresh_browser_preflight"
                )
                context.close()
                dispose_profile(profile_dir)
                return CaptchaCompletion(
                    challenge_id=preflight.challenge_id,
                    challenge_type=preflight.challenge_type or "captcha",
                    challenge_metadata="",
                    browser_cookie=browser_cookie,
                    browser_cookies=browser_cookies,
                    browser_replay_accepted=True,
                    replay_preflight=preflight,
                )
            else:
                LOG.write(
                    "CAPTCHA_FRESH_CHALLENGE_FAILED "
                    f"status={browser_preflight.get('status')} "
                    "action=discard_attempt no_old_challenge_reuse=true"
                )
                context.close()
                dispose_profile(profile_dir)
                return None
        except PlaywrightError as exc:
            LOG.write(
                "GAMEJOIN_BROWSER_PREFLIGHT_ERROR "
                f"error={type(exc).__name__}: {exc}; "
                "action=discard_attempt no_old_challenge_reuse=true"
            )
            try:
                context.close()
            except PlaywrightError:
                pass
            dispose_profile(profile_dir)
            return None
        # Всё, что произошло при загрузке /home (например challenge типа chef),
        # не относится к игровой captcha. Начинаем детект с чистого состояния.
        continuation.clear()
        challenge_completed.clear()
        capture_armed.set()
        LOG.write(
            "CAPTCHA_DETECTOR_ARMED "
            f"challenge_id={active_preflight.challenge_id} "
            f"type={active_preflight.challenge_type}"
        )
        try:
            page.goto(
                captcha_url,
                referer="https://google.com/",
                wait_until="load",
                timeout=300_000,
            )
        except PlaywrightTimeoutError as exc:
            LOG.write(f"CAPTCHA_GOTO_TIMEOUT current_url={page.url} error={exc}")

        LOG.write(f"CAPTCHA_READY current_url={page.url}")
        # Нельзя вызывать input() прямо в потоке Playwright: пока он заблокирован,
        # sync API не прокачивает CDP/event loop. У RAM browser loop продолжает
        # работать постоянно, поэтому ввод читаем отдельно, а здесь регулярно
        # отдаём управление Playwright.
        input_finished = threading.Event()

        def wait_for_enter() -> None:
            try:
                input(
                    "\nРеши капчу в Chromium. После успеха скрипт продолжит сам; "
                    "Enter — продолжить вручную: "
                )
            except EOFError:
                LOG.write("CAPTCHA_INPUT input=EOF")
            finally:
                input_finished.set()

        if WAIT_FOR_INPUT_ON_PREFLIGHT_CAPTCHA:
            threading.Thread(
                target=wait_for_enter,
                name="captcha-manual-input",
                daemon=True,
            ).start()
        LOG.write(
            "CAPTCHA_EVENT_LOOP active=true waiting_for_enter="
            + str(WAIT_FOR_INPUT_ON_PREFLIGHT_CAPTCHA).lower()
        )

        autosolve_attempted = False
        solve_deadline = time.monotonic() + 180.0
        LOG.write(
            f"STEP CAPTCHA_SOLVE_DEADLINE set_at=+180s"
        )

        while (
            not input_finished.is_set()
            and not challenge_completed.is_set()
            and not challenge_invalidated.is_set()
        ):
            try:
                if page.is_closed():
                    LOG.write(
                        "CAPTCHA_BROWSER_CLOSED while_waiting=true "
                        f"challenge_completed={challenge_completed.is_set()}"
                    )
                    break

                if time.monotonic() > solve_deadline:
                    LOG.write("STEP CAPTCHA_SOLVE_TIMEOUT after 180s")
                    break

                page.wait_for_timeout(100)

                if not autosolve_attempted:
                    autosolve_attempted = True
                    LOG.write("STEP CAPTCHA_AUTOSOLVE_BEGIN")

                    try:
                        MAX_ATTEMPTS = 3
                        FIRST_POLL_TIMEOUT = 5.0
                        BTN_POLL_TIMEOUT = 20.0
                        manual_mode = False

                        for hold_attempt in range(1, MAX_ATTEMPTS + 1):
                            if challenge_completed.is_set():
                                break
                            if time.monotonic() > solve_deadline:
                                break

                            is_first = (hold_attempt == 1)
                            poll_timeout = FIRST_POLL_TIMEOUT if is_first else BTN_POLL_TIMEOUT
                            LOG.write(
                                f"STEP CAPTCHA_HOLD_ATTEMPT current={hold_attempt} "
                                f"total={MAX_ATTEMPTS} poll_timeout={poll_timeout}"
                            )

                            target_frame = None
                            target_button = None
                            deadline = min(time.monotonic() + poll_timeout, solve_deadline)
                            poll = 0
                            while (
                                time.monotonic() < deadline
                                and target_button is None
                                and not challenge_completed.is_set()
                                and not challenge_invalidated.is_set()
                            ):
                                poll += 1
                                for f in page.frames:
                                    try:
                                        n = f.locator('[aria-label="Press and hold"]').count()
                                    except PlaywrightError:
                                        continue
                                    if n <= 0:
                                        continue
                                    candidates = f.locator('[aria-label="Press and hold"]')
                                    for i in range(n):
                                        c = candidates.nth(i)
                                        try:
                                            b = c.bounding_box()
                                        except PlaywrightError:
                                            continue
                                        if not b:
                                            continue
                                        if b["width"] < 100 or b["height"] < 30:
                                            continue
                                        target_frame = f
                                        target_button = c
                                        LOG.write(
                                            f"STEP CAPTCHA_BTN_FOUND poll={poll} "
                                            f"url={f.url!r} "
                                            f"w={b['width']:.0f} h={b['height']:.0f}"
                                        )
                                        break
                                    if target_button is not None:
                                        break
                                if target_button is None:
                                    page.wait_for_timeout(250)

                            if (
                                challenge_completed.is_set()
                                or challenge_invalidated.is_set()
                            ):
                                LOG.write(
                                    "STEP CAPTCHA_BUTTON_POLL_INTERRUPTED "
                                    f"completed={challenge_completed.is_set()} "
                                    f"invalidated={challenge_invalidated.is_set()}"
                                )
                                break

                            if target_button is None:
                                LOG.write(f"STEP CAPTCHA_BTN_NOT_FOUND attempt={hold_attempt}")
                                if is_first:
                                    LOG.write(
                                        "STEP CAPTCHA_TYPE=manual "
                                        "no_hold_button_awaiting_user_input"
                                    )
                                    manual_mode = True
                                    break
                                page.wait_for_timeout(1000)
                                continue

                            # свежий бокс
                            try:
                                fresh = target_frame.locator(
                                    '[aria-label="Press and hold"]'
                                ).first
                                box = fresh.bounding_box()
                            except PlaywrightError as e:
                                LOG.write(f"STEP CAPTCHA_BOX_ERR attempt={hold_attempt} {e}")
                                page.wait_for_timeout(1000)
                                continue

                            if not box or box["width"] < 100 or box["height"] < 30:
                                LOG.write(
                                    f"STEP CAPTCHA_BOX_BAD attempt={hold_attempt} "
                                    f"w={box['width'] if box else None} "
                                    f"h={box['height'] if box else None}"
                                )
                                page.wait_for_timeout(1000)
                                continue

                            pad_x = box["width"] * 0.15
                            pad_y = box["height"] * 0.15
                            x = random.uniform(box["x"] + pad_x, box["x"] + box["width"] - pad_x)
                            y = random.uniform(box["y"] + pad_y, box["y"] + box["height"] - pad_y)
                            LOG.write(
                                f"STEP CAPTCHA_AUTOSOLVE press_at x={x:.1f} y={y:.1f} "
                                f"attempt={hold_attempt}"
                            )

                            remaining = solve_deadline - time.monotonic()
                            if remaining <= 0:
                                LOG.write("STEP CAPTCHA_SOLVE_TIMEOUT_BEFORE_PRESS")
                                break
                            hold_time = min(random.uniform(15.0, 20.0), remaining)
                            LOG.write(f"STEP CAPTCHA_HOLD_START duration={hold_time:.2f}s")
                            page.mouse.move(x, y)
                            page.mouse.down()
                            press_started = time.monotonic()
                            LOG.write(f"STEP CAPTCHA_MOUSE_DOWN attempt={hold_attempt}")
                            try:
                                page.wait_for_timeout(int(hold_time * 1000))
                            finally:
                                page.mouse.up()
                                LOG.write(
                                    f"STEP CAPTCHA_MOUSE_UP held="
                                    f"{(time.monotonic() - press_started):.2f}s"
                                )

                            page.wait_for_timeout(2000)
                            if challenge_completed.is_set():
                                LOG.write(
                                    f"STEP CAPTCHA_SOLVED_AFTER_ATTEMPT attempt={hold_attempt}"
                                )
                                break

                            LOG.write(
                                f"STEP CAPTCHA_NOT_SOLVED_YET attempt={hold_attempt} retrying"
                            )

                        if manual_mode:
                            LOG.write(
                                "STEP CAPTCHA_MANUAL_WAIT awaiting challenge_completed "
                                "or input_finished"
                            )

                    except PlaywrightError as exc:
                        if "closed" not in str(exc).lower():
                            LOG.write(
                                f"STEP CAPTCHA_AUTOSOLVE_PLAYWRIGHT_ERROR "
                                f"error={type(exc).__name__}: {exc}"
                            )
                        try:
                            page.mouse.up()
                            LOG.write("STEP CAPTCHA_MOUSE_UP_FALLBACK")
                        except PlaywrightError:
                            pass
                    except Exception as exc:
                        LOG.write(
                            f"STEP CAPTCHA_AUTOSOLVE_ERROR "
                            f"error={type(exc).__name__}: {exc}"
                        )
                        try:
                            page.mouse.up()
                            LOG.write("STEP CAPTCHA_MOUSE_UP_FALLBACK")
                        except PlaywrightError:
                            pass

                current_url = page.url
                if (
                    current_url.rstrip("/")
                    == "https://www.roblox.com/challenge/cdn/hybrid"
                    and continuation.get("challenge_id")
                    == active_preflight.challenge_id
                    and continuation.get("challenge_metadata")
                    and not challenge_completed.is_set()
                    and not base_url_observed.is_set()
                ):
                    base_url_observed.set()
                    LOG.write(
                        "CAPTCHA_BASE_URL_OBSERVED awaiting_continue_http_200=true"
                    )
            except PlaywrightError as exc:
                if "closed" not in str(exc).lower():
                    raise
                LOG.write(
                    "CAPTCHA_TARGET_CLOSED while_waiting=true "
                    f"challenge_completed={challenge_completed.is_set()} "
                    f"error={exc}"
                )
                break

        if challenge_completed.is_set():
            LOG.write("CAPTCHA_WAIT_RESULT result=SOLVED auto_continue=true")
        elif challenge_invalidated.is_set():
            LOG.write("CAPTCHA_WAIT_RESULT result=REJECTED_BY_ROBLOX")
        elif input_finished.is_set():
            LOG.write("CAPTCHA_WAIT_RESULT result=MANUAL_CONTINUE")
        else:
            LOG.write("CAPTCHA_WAIT_RESULT result=TARGET_CLOSED_UNCONFIRMED")

        try:
            if not page.is_closed():
                page.wait_for_timeout(max(0, CAPTCHA_CAPTURE_SETTLE_SECONDS) * 1000)
                LOG.write(f"CAPTCHA_AFTER_WAIT current_url={page.url}")
        except PlaywrightError as exc:
            if "closed" not in str(exc).lower():
                raise
            LOG.write(f"CAPTCHA_TARGET_CLOSED during_settle=true error={exc}")

        try:
            browser_cookies = context.cookies(
                ["https://www.roblox.com", "https://gamejoin.roblox.com"]
            )
            log_cookie_snapshot("browser_after_challenge", browser_cookies)
            LOG.write(
                "CAPTCHA_BROWSER_COOKIES_CAPTURED names="
                + ",".join(sorted(str(item.get("name", "")) for item in browser_cookies))
            )
            for browser_item in browser_cookies:
                if browser_item.get("name") == ".ROBLOSECURITY":
                    browser_cookie = str(browser_item.get("value") or cookie)
                    LOG.write(
                        "CAPTCHA_BROWSER_COOKIE_CAPTURED "
                        f"changed={browser_cookie != cookie} length={len(browser_cookie)}"
                    )
                    break
        except PlaywrightError as exc:
            LOG.write(f"CAPTCHA_BROWSER_COOKIE_CAPTURE_ERROR error={exc}")

        if (
            challenge_completed.is_set()
            and continuation.get("challenge_metadata")
            and not page.is_closed()
        ):
            encoded_completion = base64.b64encode(
                continuation["challenge_metadata"].encode("utf-8")
            ).decode("ascii")
            LOG.write(
                "STEP GAMEJOIN_BROWSER_REPLAY "
                f"attempt_id={active_preflight.attempt_id} "
                f"challenge_id={active_preflight.challenge_id}"
            )
            try:
                browser_result = page.evaluate(
                    """async ({url, body, challengeId, challengeType, metadata}) => {
                        try {
                            const response = await fetch(url, {
                                method: "POST",
                                credentials: "include",
                                headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json",
                                    "rblx-challenge-id": challengeId,
                                    "rblx-challenge-type": challengeType,
                                    "rblx-challenge-metadata": metadata
                                },
                                body: JSON.stringify(body)
                            });
                            return {
                                status: response.status,
                                ok: response.ok,
                                text: await response.text()
                            };
                        } catch (error) {
                            return {status: 0, ok: false, text: String(error)};
                        }
                    }""",
                    {
                        "url": GAMEJOIN_URL,
                        "body": active_preflight.request_body,
                        "challengeId": active_preflight.challenge_id,
                        "challengeType": continuation.get("challenge_type", "captcha"),
                        "metadata": encoded_completion,
                    },
                )
                browser_replay_accepted = bool(browser_result.get("ok"))
                LOG.write(
                    "GAMEJOIN_BROWSER_REPLAY_RESULT "
                    f"status={browser_result.get('status')} "
                    f"accepted={str(browser_replay_accepted).lower()} "
                    f"body={browser_result.get('text', '')[:1000]}"
                )
                # Fetch мог обновить служебные cookies уже после первого снимка.
                browser_cookies = context.cookies(
                    ["https://www.roblox.com", "https://gamejoin.roblox.com"]
                )
                log_cookie_snapshot("browser_after_gamejoin_replay", browser_cookies)
            except PlaywrightError as exc:
                LOG.write(
                    "GAMEJOIN_BROWSER_REPLAY_ERROR "
                    f"error={type(exc).__name__}: {exc}"
                )

        try:
            context.close()
        except PlaywrightError as exc:
            if "closed" not in str(exc).lower():
                raise

    dispose_profile(profile_dir)

    LOG.write(
        "CAPTCHA_CAPTURE_FINISHED har="
        + (str(har_path) if CAPTCHA_NETWORK_DIAGNOSTICS else "disabled")
    )
    if challenge_invalidated.is_set():
        if PROBE_INVALIDATED_IN_ROBLOX:
            LOG.write(
                "CAPTCHA_CAPTURE_RESULT result=INVALIDATED_PROBE_REQUESTED "
                "next=launch_roblox_and_check_client_log"
            )
            return CaptchaCompletion(
                challenge_id=continuation.get("challenge_id", "")
                or active_preflight.challenge_id,
                challenge_type=continuation.get("challenge_type", "")
                or active_preflight.challenge_type,
                challenge_metadata=continuation.get("challenge_metadata", ""),
                browser_cookie=browser_cookie,
                browser_cookies=browser_cookies,
                browser_replay_accepted=False,
                replay_preflight=active_preflight,
                probe_launch=True,
            )
        LOG.write("CAPTCHA_CAPTURE_RESULT result=REJECTED_BY_ROBLOX")
        return None
    if not challenge_completed.is_set():
        return None
    if not continuation.get("challenge_metadata"):
        LOG.write("CAPTCHA_COMPLETION_MISSING reason=continue_payload_not_captured")
        return None
    return CaptchaCompletion(
        challenge_id=continuation.get("challenge_id", ""),
        challenge_type=continuation.get("challenge_type", "captcha"),
        challenge_metadata=continuation["challenge_metadata"],
        browser_cookie=browser_cookie,
        browser_cookies=browser_cookies,
        browser_replay_accepted=browser_replay_accepted,
        replay_preflight=active_preflight,
    )


def replay_completed_gamejoin(
    session: requests.Session,
    preflight: GameJoinPreflight,
    completion: CaptchaCompletion,
) -> bool:
    """Повторяет тот же join-game с результатом решённой вручную капчи."""
    if completion.challenge_id != preflight.challenge_id:
        LOG.write(
            "GAMEJOIN_CHALLENGE_REPLAY_ABORT reason=challenge_id_mismatch "
            f"preflight={preflight.challenge_id or '<none>'} "
            f"completion={completion.challenge_id or '<none>'}"
        )
        return False

    encoded_completion = base64.b64encode(
        completion.challenge_metadata.encode("utf-8")
    ).decode("ascii")
    LOG.write(
        "STEP GAMEJOIN_CHALLENGE_REPLAY "
        f"attempt_id={preflight.attempt_id} challenge_id={preflight.challenge_id} "
        f"metadata_length={len(completion.challenge_metadata)}"
    )
    response = request_with_trace(
        session,
        "POST",
        GAMEJOIN_URL,
        headers={
            "User-Agent": "Roblox/WinInetRobloxApp/0.738.0.7381397 (GlobalDist; RobloxDirectDownload)",
            "Referer": f"https://www.roblox.com/games/{PLACE_ID}/",
            "Origin": "https://www.roblox.com",
            "Accept": "application/json",
            "rblx-challenge-id": preflight.challenge_id,
            "rblx-challenge-type": completion.challenge_type or "captcha",
            "rblx-challenge-metadata": encoded_completion,
        },
        json=preflight.request_body,
    )
    accepted = response.status_code == 200
    LOG.write(
        "GAMEJOIN_CHALLENGE_REPLAY_RESULT "
        f"status={response.status_code} accepted={str(accepted).lower()} "
        f"next_challenge_id={response.headers.get('rblx-challenge-id', '<none>')}"
    )
    return accepted


def build_launch_uri(ticket: str) -> tuple[str, str]:
    tracker_id = f"{random.randint(100000, 174999)}{random.randint(100000, 899999)}"
    launch_time_ms = int(datetime.now(timezone.utc).timestamp() * 1000)

    request_type = "RequestGameJob" if JOB_ID else "RequestGame"
    query = (
        f"request={request_type}"
        f"&browserTrackerId={tracker_id}"
        f"&placeId={PLACE_ID}"
    )
    if JOB_ID:
        query += f"&gameId={JOB_ID}"
    query += "&isPlayTogetherGame=false"

    place_launcher_url = f"https://assetgame.roblox.com/game/PlaceLauncher.ashx?{query}"
    launch_uri = (
        "roblox-player:1"
        "+launchmode:play"
        f"+gameinfo:{ticket}"
        f"+launchtime:{launch_time_ms}"
        f"+placelauncherurl:{quote_plus(place_launcher_url, safe='')}"
        f"+browsertrackerid:{tracker_id}"
        "+robloxLocale:en_us"
        "+gameLocale:en_us"
        "+channel:"
        "+LaunchExp:InApp"
    )
    return launch_uri, place_launcher_url


def get_protocol_handler() -> str:
    try:
        import winreg
    except ImportError:
        return "<winreg unavailable>"

    locations = (
        (winreg.HKEY_CURRENT_USER, r"Software\Classes\roblox-player\shell\open\command"),
        (winreg.HKEY_CLASSES_ROOT, r"roblox-player\shell\open\command"),
    )
    for hive, key_name in locations:
        try:
            with winreg.OpenKey(hive, key_name) as key:
                value, _ = winreg.QueryValueEx(key, None)
                return str(value)
        except OSError:
            continue
    return "<not registered>"


def discover_log_directories() -> list[Path]:
    local_app_data = Path(os.environ.get("LOCALAPPDATA", ""))
    roots = [
        local_app_data / "Roblox",
        local_app_data / "Bloxstrap",
        local_app_data / "Fishstrap",
        local_app_data / "Potassium",
        local_app_data / "Wave",
    ]
    result: set[Path] = set()
    for root in roots:
        for candidate in (root / "logs", root / "Logs", root):
            if candidate.is_dir():
                result.add(candidate.resolve())
    return sorted(result, key=lambda path: str(path).lower())


def discover_log_files(directories: list[Path]) -> set[Path]:
    files: set[Path] = set()
    for directory in directories:
        try:
            for path in directory.iterdir():
                if path.is_file() and path.suffix.lower() in {".log", ".txt"}:
                    files.add(path.resolve())
        except OSError as exc:
            LOG.write(f"LOG_DISCOVERY_ERROR directory={directory} error={exc}")
    return files


def snapshot_log_positions(directories: list[Path]) -> dict[Path, int]:
    positions: dict[Path, int] = {}
    for path in discover_log_files(directories):
        try:
            positions[path] = path.stat().st_size
        except OSError:
            pass
    return positions


def get_interesting_processes() -> dict[int, str]:
    result: dict[int, str] = {}
    try:
        completed = subprocess.run(
            ["tasklist", "/FO", "CSV", "/NH"],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=5,
            check=False,
        )
        for line in completed.stdout.splitlines():
            match = re.match(r'^"([^"]+)","(\d+)"', line)
            if not match:
                continue
            name, pid_text = match.groups()
            if any(word in name.lower() for word in ("roblox", "bloxstrap", "fishstrap", "potassium")):
                result[int(pid_text)] = name
    except (OSError, subprocess.SubprocessError) as exc:
        LOG.write(f"PROCESS_SCAN_ERROR: {exc}")
    return result


def emit_log_chunk(
    path: Path,
    chunk: bytes,
    pending: dict[Path, str],
    detected: dict[str, bool],
) -> None:
    text = pending.get(path, "") + chunk.decode("utf-8", errors="replace")
    lines = text.splitlines(keepends=True)
    pending[path] = ""
    if lines and not lines[-1].endswith(("\n", "\r")):
        pending[path] = lines.pop()

    for line in lines:
        line = line.rstrip("\r\n")
        if GCS_CHALLENGE_PATTERN.search(line):
            if not detected["gcs"]:
                detected["gcs"] = True
                LOG.write(f"CAPTCHA_DETECTED type=GCS source={path.name}")
        marker = "ROBLOX_LOG_IMPORTANT" if IMPORTANT_LOG_PATTERN.search(line) else "ROBLOX_LOG"
        LOG.write(f"{marker} [{path.name}] {line}")


def monitor_roblox_after_launch(
    directories: list[Path],
    positions: dict[Path, int],
    processes_before_launch: dict[int, str],
) -> tuple[str, dict[int, str]]:
    LOG.write("=" * 78)
    LOG.write(
        f"STEP MONITOR: watching Roblox processes and client logs for {MONITOR_SECONDS}s; "
        "Ctrl+C stops monitoring only"
    )
    LOG.write("Log directories: " + ("; ".join(map(str, directories)) or "<none found>"))

    # Уже существующие логи могут продолжать обновляться другими запущенными
    # экземплярами Roblox. Для этого теста читаем только файлы, созданные после
    # запуска диагностируемого экземпляра.
    baseline_files = set(positions)
    monitored_files: set[Path] = set()
    detected = {"gcs": False}
    known_processes = dict(processes_before_launch)
    started_processes: dict[int, str] = {}
    player_started_at: float | None = None
    first_log_seen_at: float | None = None
    LOG.write(
        "Processes before launch: "
        + json.dumps(processes_before_launch, ensure_ascii=False)
    )
    pending: dict[Path, str] = {}
    deadline = time.monotonic() + MONITOR_SECONDS
    next_process_scan = 0.0

    try:
        while time.monotonic() < deadline:
            now = time.monotonic()
            if now >= next_process_scan:
                current_processes = get_interesting_processes()
                for pid, name in current_processes.items():
                    if pid not in processes_before_launch and pid not in started_processes:
                        started_processes[pid] = name
                        LOG.write(f"PROCESS_STARTED pid={pid} name={name}")
                        if "robloxplayerbeta" in name.lower() and player_started_at is None:
                            player_started_at = now
                for pid, name in known_processes.items():
                    if pid not in current_processes:
                        LOG.write(f"PROCESS_EXITED pid={pid} name={name}")
                known_processes = current_processes
                next_process_scan = now + 1.0

            for path in discover_log_files(directories):
                if path in baseline_files:
                    continue
                if path not in monitored_files:
                    monitored_files.add(path)
                    if first_log_seen_at is None:
                        first_log_seen_at = now
                    positions[path] = 0
                    LOG.write(f"ROBLOX_LOG_SELECTED file={path}")
                try:
                    size = path.stat().st_size
                    position = positions.get(path, 0)
                    if size < position:
                        LOG.write(f"ROBLOX_LOG_TRUNCATED file={path}")
                        position = 0
                    if size > position:
                        with path.open("rb") as stream:
                            stream.seek(position)
                            chunk = stream.read(size - position)
                        positions[path] = size
                        emit_log_chunk(path, chunk, pending, detected)
                except OSError as exc:
                    LOG.write(f"ROBLOX_LOG_READ_ERROR file={path} error={exc}")

            if detected["gcs"]:
                break
            readiness_started_at = player_started_at or first_log_seen_at
            if (
                readiness_started_at is not None
                and monitored_files
                and now - readiness_started_at >= ROBLOX_POST_START_CHECK_SECONDS
            ):
                LOG.write(
                    "MONITOR_DECISION_WINDOW_COMPLETE "
                    f"seconds={ROBLOX_POST_START_CHECK_SECONDS}"
                )
                break

            time.sleep(MONITOR_POLL_SECONDS)
    except KeyboardInterrupt:
        LOG.write("Monitoring stopped by user")
    finally:
        for path, remainder in pending.items():
            if remainder:
                marker = "ROBLOX_LOG_IMPORTANT" if IMPORTANT_LOG_PATTERN.search(remainder) else "ROBLOX_LOG"
                LOG.write(f"{marker} [{path.name}] {remainder}")
        if detected["gcs"]:
            result = "GCS_DETECTED"
            LOG.write("MONITOR_RESULT captcha=GCS_DETECTED")
        elif not monitored_files:
            result = "UNKNOWN"
            LOG.write("MONITOR_RESULT captcha=UNKNOWN reason=no_new_roblox_log")
        else:
            result = "NOT_DETECTED"
            LOG.write("MONITOR_RESULT captcha=NOT_DETECTED")
        LOG.write("STEP MONITOR finished")
    return result, started_processes


def terminate_test_roblox_processes(processes: dict[int, str]) -> None:
    targets = {
        pid: name
        for pid, name in processes.items()
        if "robloxplayerbeta" in name.lower()
        or "robloxcrashhandler" in name.lower()
    }
    if not targets:
        LOG.write("ROBLOX_TERMINATE skipped=no_started_test_processes")
        return
    for pid, name in targets.items():
        LOG.write(f"ROBLOX_TERMINATE_REQUEST pid={pid} name={name}")
        try:
            completed = subprocess.run(
                ["taskkill", "/PID", str(pid), "/T", "/F"],
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                timeout=10,
                check=False,
            )
            LOG.write(
                "ROBLOX_TERMINATE_RESULT "
                f"pid={pid} exit_code={completed.returncode} "
                f"stdout={completed.stdout.strip()} stderr={completed.stderr.strip()}"
            )
        except (OSError, subprocess.SubprocessError) as exc:
            LOG.write(
                f"ROBLOX_TERMINATE_ERROR pid={pid} "
                f"error={type(exc).__name__}: {exc}"
            )


def main() -> int:
    cookie = ROBLOSECURITY.strip()
    if not cookie or cookie == "PASTE_COOKIE_HERE":
        LOG.write("ERROR: укажи ROBLOSECURITY в начале файла")
        return 2
    if os.name != "nt":
        LOG.write("ERROR: запуск roblox-player: этим скриптом поддерживается только на Windows")
        return 2

    LOG.write(f"Log file: {LOG.path}")
    LOG.write(f"Config: place_id={PLACE_ID} job_id={JOB_ID or '<empty>'}")
    LOG.write(f"Cookie: {value_fingerprint(cookie)}")
    LOG.write(f"roblox-player protocol handler: {get_protocol_handler()}")

    log_directories = discover_log_directories()
    initial_log_positions = snapshot_log_positions(log_directories)

    session = requests.Session()
    session.headers.update({
        "Accept": "application/json, text/plain, */*",
        "User-Agent": USER_AGENT,
    })
    configure_requests_network(session)
    session.cookies.set(".ROBLOSECURITY", cookie, domain=".roblox.com", path="/")
    cleanup_old_profiles()
    system_ip = log_system_network_identity()
    python_ip = log_python_network_identity(session)

    try:
        if GAMEJOIN_PREFLIGHT:
            preflight = preflight_gamejoin(session)
            if preflight.captcha_detected:
                replay_accepted = False
                for captcha_attempt in range(1, CAPTCHA_MAX_ATTEMPTS + 1):
                    LOG.write(
                        "STEP CAPTCHA_ATTEMPT "
                        f"current={captcha_attempt} total={CAPTCHA_MAX_ATTEMPTS}"
                    )
                    completion = None
                    if CAPTCHA_PLAYWRIGHT_CAPTURE and preflight.captcha_url:
                        completion = capture_captcha_with_playwright(
                            preflight.captcha_url,
                            cookie,
                            preflight,
                            python_ip=python_ip,
                            system_ip=system_ip,
                        )
                    elif WAIT_FOR_INPUT_ON_PREFLIGHT_CAPTCHA:
                        LOG.write(
                            "WAITING_FOR_CAPTCHA: реши капчу по CAPTCHA_URL, "
                            "затем вернись сюда и нажми Enter"
                        )
                        try:
                            input(
                                "\nКапча решена? Нажми Enter для повторной "
                                "проверки и запуска Roblox: "
                            )
                        except EOFError:
                            LOG.write(
                                "WAITING_FOR_CAPTCHA input=EOF; "
                                "продолжаю без ожидания"
                            )

                    if completion is not None:
                        for browser_item in completion.browser_cookies:
                            name = str(browser_item.get("name") or "")
                            value = str(browser_item.get("value") or "")
                            domain = str(browser_item.get("domain") or ".roblox.com")
                            path = str(browser_item.get("path") or "/")
                            if name:
                                session.cookies.set(
                                    name, value, domain=domain, path=path
                                )
                        LOG.write(
                            "SESSION_COOKIE_SYNC source=playwright "
                            f"count={len(completion.browser_cookies)} "
                            f"roblosecurity_changed={completion.browser_cookie != cookie}"
                        )
                        if completion.browser_cookie != cookie:
                            cookie = completion.browser_cookie
                        if completion.probe_launch:
                            replay_accepted = True
                            LOG.write(
                                "GAMEJOIN_REPLAY_BYPASSED "
                                "reason=invalidated_probe "
                                "next=launch_roblox_and_check_client_log"
                            )
                        else:
                            replay_accepted = completion.browser_replay_accepted
                        if replay_accepted and not completion.probe_launch:
                            LOG.write(
                                "GAMEJOIN_PYTHON_REPLAY_SKIPPED "
                                "reason=browser_replay_accepted"
                            )
                        elif not completion.probe_launch:
                            replay_accepted = replay_completed_gamejoin(
                                session, completion.replay_preflight, completion
                            )
                    else:
                        LOG.write(
                            "GAMEJOIN_CHALLENGE_REPLAY_SKIPPED "
                            "reason=no_captured_completion"
                        )

                    if replay_accepted:
                        LOG.write(
                            "CAPTCHA_ATTEMPT_RESULT "
                            f"attempt={captcha_attempt} "
                            f"result={'PROBE_LAUNCH' if completion and completion.probe_launch else 'ACCEPTED'}"
                        )
                        break
                    LOG.write(
                        "CAPTCHA_ATTEMPT_RESULT "
                        f"attempt={captcha_attempt} result=REJECTED"
                    )
                    if captcha_attempt < CAPTCHA_MAX_ATTEMPTS:
                        LOG.write(
                            "CAPTCHA_RETRY previous_challenge_discarded=true "
                            "creating_new_profile=true creating_new_challenge=true"
                        )

                if not replay_accepted and STOP_ON_PREFLIGHT_CAPTCHA:
                    LOG.write(
                        "STOP: captcha was not accepted after "
                        f"{CAPTCHA_MAX_ATTEMPTS} attempts"
                    )
                    return 3
                if not replay_accepted:
                    LOG.write(
                        "CONTINUE: challenge replay was not accepted, but "
                        "STOP_ON_PREFLIGHT_CAPTCHA=False; trying Roblox launch"
                    )

        csrf = get_csrf_token(session, "CSRF_1")
        if RAM_DOUBLE_CSRF:
            csrf = get_csrf_token(session, "CSRF_2_RAM_COMPAT")
        ticket = get_authentication_ticket(session, csrf)
        launch_uri, place_launcher_url = build_launch_uri(ticket)

        LOG.write("=" * 78)
        LOG.write(f"PlaceLauncher URL: {place_launcher_url}")
        LOG.write(f"Launch URI: {launch_uri}")
        LOG.write("STEP LAUNCH: passing URI to the Windows roblox-player protocol handler")
        processes_before_launch = get_interesting_processes()
        initial_log_positions = snapshot_log_positions(log_directories)
        os.startfile(launch_uri)  # type: ignore[attr-defined]
        LOG.write("Process.Start equivalent returned successfully")
        monitor_result, started_processes = monitor_roblox_after_launch(
            log_directories,
            initial_log_positions,
            processes_before_launch,
        )
        if monitor_result == "NOT_DETECTED":
            terminate_test_roblox_processes(started_processes)
            LOG.write("CAPTCHA_SOLVED_SUCCESSFULLY roblox_terminated=true")
            return 0
        if monitor_result == "GCS_DETECTED":
            LOG.write("CAPTCHA_TEST_FAILED captcha_present_inside_roblox=true")
            return 4
        LOG.write("CAPTCHA_TEST_INCONCLUSIVE reason=roblox_log_not_found")
        return 5
    except requests.RequestException as exc:
        LOG.write(f"HTTP ERROR: {type(exc).__name__}: {exc}")
        return 1
    except Exception as exc:
        LOG.write(
            f"ERROR: {type(exc).__name__}: {exc}\n"
            + traceback.format_exc()
        )
        return 1


if __name__ == "__main__":
    sys.exit(main())
