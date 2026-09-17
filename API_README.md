# Local manual ZeroSolver-compatible API

The server exposes a human-in-the-loop API around `ram_launch_debug.py`.
Jobs run one at a time. Chromium opens locally and the user completes the
verification; the script then validates the result by launching Roblox and
reading its client log.

## Start

```powershell
pip install -r requirements.txt
playwright install chromium
python zerosolver_api.py
```

On Windows, `start_api.cmd` can be used after dependencies are installed.

Default base URL:

```text
http://127.0.0.1:8765/api/zerosolver-api
```

Set `api_key` in `api_config.json` to require authentication through
`X-API-Key`, `?api_key=...`, `?key=...`, or the JSON body.

## Chromium proxy

Set these fields in `api_config.json` and restart the API:

```json
"chromium_proxy_server": "http://127.0.0.1:8080",
"chromium_proxy_username": "",
"chromium_proxy_password": "",
"chromium_proxy_bypass": "localhost,127.0.0.1"
```

HTTP(S) and SOCKS proxies are accepted by Chromium/Playwright. The proxy is
applied to the whole persistent browser context, including loaded extensions.
An extension that explicitly changes Chrome proxy settings may override it.

`probe_invalidated_in_roblox` enables a diagnostic fallback: when the web
challenge reports `challengeInvalidated`, the tool launches Roblox once and
uses the new Roblox client log as the final captcha verdict.

## Start a check

```powershell
curl.exe -X POST "http://127.0.0.1:8765/api/zerosolver-api/solve" `
  -H "Content-Type: application/json" `
  -d '{"username":"account","cookie":"_|WARNING..."}'
```

The endpoint immediately returns HTTP `202`, `status=processing`, and a
`job_id`. Poll `GET /status/{job_id}` for progress and the final result.

## Batch endpoints

- `POST /api/zerosolver-api/submit`
- `GET /api/zerosolver-api/status/{job_id}`
- `POST /api/zerosolver-api/cancel/{job_id}`
- `GET /api/zerosolver-api/download/{job_id}/{filename}`
- `GET /api/zerosolver-api/credits`
- `GET /api/zerosolver-api/active`
- `GET /health`

Per-account logs and result files are stored under `api_jobs/{job_id}`.

Only one account is processed at a time because all attempts share the local
interactive Chromium profile. Cancelling a processing job does not interrupt
the currently open verification; it prevents subsequent accounts from starting.
