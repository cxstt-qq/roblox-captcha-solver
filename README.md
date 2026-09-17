# roblox-capctha-solver

Local human-in-the-loop Roblox verification diagnostic tool and
ZeroSolver-compatible HTTP API.

The tool opens the verification page in Chromium, waits for manual completion,
launches Roblox, and checks the Roblox client log to determine whether the
verification was accepted.

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

See [API_README.md](API_README.md) for endpoints and usage examples.

## Security

Never commit `.ROBLOSECURITY` cookies, Chromium profiles, API job output,
proxy credentials, or populated local configuration. Supply a cookie through
`RAM_LAUNCH_COOKIE` or through the local API request.

