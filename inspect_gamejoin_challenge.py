"""Print decoded Roblox gamejoin challenge metadata without solving it."""

from __future__ import annotations

import argparse
import base64
import getpass
import json
import os
import sys
import uuid
from typing import Any

import requests


GAMEJOIN_URL = "https://gamejoin.roblox.com/v1/join-game"
DEFAULT_PLACE_ID = 2809202155
USER_AGENT = (
    "Roblox/WinInetRobloxApp/0.738.0.7381397 "
    "(GlobalDist; RobloxDirectDownload)"
)


def decode_metadata(value: str) -> Any:
    raw = value.strip()
    if not raw:
        return None
    raw += "=" * (-len(raw) % 4)
    for decoder in (base64.b64decode, base64.urlsafe_b64decode):
        try:
            decoded = decoder(raw).decode("utf-8")
            return json.loads(decoded)
        except (ValueError, UnicodeDecodeError, json.JSONDecodeError):
            continue
    raise ValueError("rblx-challenge-metadata is not valid base64 JSON")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Request and print Roblox /v1/join-game challenge metadata."
    )
    parser.add_argument("--place-id", type=int, default=DEFAULT_PLACE_ID)
    parser.add_argument("--timeout", type=float, default=30.0)
    args = parser.parse_args()

    cookie = os.getenv("ROBLOSECURITY", "").strip()
    if not cookie:
        cookie = getpass.getpass(".ROBLOSECURITY: ").strip()
    if not cookie:
        print("Cookie is empty.", file=sys.stderr)
        return 2

    attempt_id = str(uuid.uuid4())
    session = requests.Session()
    session.cookies.set(".ROBLOSECURITY", cookie, domain=".roblox.com", path="/")

    try:
        response = session.post(
            GAMEJOIN_URL,
            headers={
                "User-Agent": USER_AGENT,
                "Referer": f"https://www.roblox.com/games/{args.place_id}/",
                "Origin": "https://www.roblox.com",
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            json={
                "placeId": args.place_id,
                "gameJoinAttemptId": attempt_id,
            },
            timeout=args.timeout,
        )
    except requests.RequestException as exc:
        print(f"Request failed: {type(exc).__name__}: {exc}", file=sys.stderr)
        return 1

    encoded_metadata = response.headers.get("rblx-challenge-metadata", "")
    try:
        response_body: Any = response.json()
    except requests.exceptions.JSONDecodeError:
        response_body = response.text

    response_headers = {
        name: ("<redacted>" if name.lower() == "set-cookie" else value)
        for name, value in response.headers.items()
    }
    result: dict[str, Any] = {
        "request": {
            "method": "POST",
            "url": GAMEJOIN_URL,
            "body": {
                "placeId": args.place_id,
                "gameJoinAttemptId": attempt_id,
            },
            "userAgent": USER_AGENT,
        },
        "response": {
            "status": response.status_code,
            "headers": response_headers,
            "body": response_body,
        },
        "challenge": {
            "id": response.headers.get("rblx-challenge-id", ""),
            "type": response.headers.get("rblx-challenge-type", ""),
            "encodedMetadata": encoded_metadata,
            "decodedMetadata": None,
        },
    }

    if encoded_metadata:
        try:
            result["challenge"]["decodedMetadata"] = decode_metadata(encoded_metadata)
        except ValueError as exc:
            result["challenge"]["metadataDecodeError"] = str(exc)

    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
