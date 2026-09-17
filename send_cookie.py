import time

import requests


API_URL = "http://127.0.0.1:8765/api/zerosolver-api"
API_KEY = ""  # Оставь пустым, если api_key в api_config.json не установлен.
USERNAME = "account"
COOKIE = "PASTE_COOKIE_HERE"
def headers():
    result = {"Content-Type": "application/json"}
    if API_KEY:
        result["X-API-Key"] = API_KEY
    return result


def main():
    cookie = COOKIE.strip()
    if not cookie or cookie == "PASTE_COOKIE_HERE" or "_|WARNING" not in cookie:
        raise SystemExit("Вставь Roblox cookie в переменную COOKIE.")

    response = requests.post(
        f"{API_URL}/solve",
        headers=headers(),
        json={"username": USERNAME, "cookie": cookie, "captcha_type": "ingame"},
        timeout=100,
    )
    data = response.json()
    print(f"Задача принята: HTTP {response.status_code}")
    print(f"Job ID: {data.get('job_id', '—')}")
    print(f"Место в очереди: {data.get('queue_position', '—')}")

    if response.status_code != 202:
        response.raise_for_status()
        return

    job_id = data["job_id"]
    while True:
        time.sleep(3)
        status_response = requests.get(
            f"{API_URL}/status/{job_id}",
            headers=headers(),
            timeout=15,
        )
        status_response.raise_for_status()
        status = status_response.json()
        current = status.get("current_account") or "—"
        print(
            f"[{status['status']}] обработано {status['processed']}/"
            f"{status['total_accounts']}; аккаунт={current}; "
            f"решено={status['successful']}; уже чистый={status['already_solved']}; "
            f"ошибок={status['failed']}"
        )
        if status["status"] in {"completed", "failed", "cancelled"}:
            print(f"Готово. Итог: {status['status']}")
            break


if __name__ == "__main__":
    main()
