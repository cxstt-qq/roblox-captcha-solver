# roblox-captcha-solver

Local human-in-the-loop Roblox verification diagnostic tool and
ZeroSolver-compatible HTTP API.

The tool opens the verification page in Chromium, waits for manual completion,
launches Roblox, and checks the Roblox client log to determine whether the
verification was accepted.

When Playwright capture is enabled, the initial `/v1/join-game`, challenge
completion, and challenge replay all run inside the same Chromium context.
Python does not issue a separate gamejoin preflight or replay in this mode.

## Setup

```powershell
python -m pip install -r requirements.txt
python -m playwright install chromium
Copy-Item api_config.example.json api_config.json
```

Start the API:

```powershell
python zerosolver_api.py
```

Inspect one gamejoin challenge without solving or continuing it:

```powershell
python inspect_gamejoin_challenge.py --place-id 2809202155
```

The cookie is requested through hidden console input and is never printed. The
script prints the request details, response status/headers/body, challenge
identifiers, and both encoded and decoded metadata. `Set-Cookie` is redacted.

See [API_README.md](API_README.md) for endpoints and usage examples.

## Security

Never commit `.ROBLOSECURITY` cookies, Chromium profiles, API job output,
proxy credentials, or populated local configuration. Supply a cookie through
`RAM_LAUNCH_COOKIE` or through the local API request.
