[![Deploy Worker](https://github.com/gagofure/ch-hello-api/actions/workflows/deploy-worker.yml/badge.svg)](https://github.com/gagofure/ch-hello-api/actions/workflows/deploy-worker.yml)


Here’s a tailored `README.md` you can paste directly into that repo.

***

# ch-hello-api

A simple Cloudflare Worker that serves:

- A **landing page** at `/` (HTML)  
- JSON API endpoints at `/api/hello`, `/api/time`, and `/api/health`

Deployed Worker URL (example):  
`https://ch-hello-api.<your-account>.workers.dev`

## Features

- Edge‑hosted HTTP API using **Cloudflare Workers**  
- Simple HTML landing page at the root path (`/`)  
- JSON endpoints suitable for monitoring demos or as a starter for more complex APIs

Cloudflare’s Workers runtime is documented here. [developers.cloudflare](https://developers.cloudflare.com/workers/get-started/guide/)

## Prerequisites

- **Node.js** (LTS) installed  
- **Cloudflare account**  
- **Wrangler CLI** installed globally:

```bash
npm install -g wrangler
```

Check Wrangler:

```bash
wrangler --version
```

## Configuration

This project uses `wrangler.json` for configuration (Wrangler 4.x). [developers.cloudflare](https://developers.cloudflare.com/workers/wrangler/configuration/)

Example:

```json
{
  "name": "ch-hello-api",
  "main": "src/index.js",
  "compatibility_date": "2024-10-01",
  "account_id": "YOUR_ACCOUNT_ID"
}
```

- `name`: Worker name.  
- `main`: Entry file for the Worker.  
- `compatibility_date`: Workers compatibility date.  
- `account_id`: Your Cloudflare account ID (from the Cloudflare dashboard URL).  

See the Wrangler configuration docs for field details. [app.studyraid](https://app.studyraid.com/en/read/14352/488193/configuring-wranglertoml-for-your-project-needs)

## Authentication (using API token)

If Wrangler’s browser login is problematic, you can authenticate with a Cloudflare API token. [cloudflare-docs-zh.pages](https://cloudflare-docs-zh.pages.dev/workers/wrangler/ci-cd/)

1. In the Cloudflare dashboard:  
   - My Profile → **API Tokens** → **Create Token**  
   - Use a template that includes Workers permissions (e.g. “Edit Cloudflare Workers”). [developers.cloudflare](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/authentication/)
   - Copy the token value.

2. In your terminal, set the `CLOUDFLARE_API_TOKEN` environment variable.

On macOS / Linux:

```bash
export CLOUDFLARE_API_TOKEN=YOUR_TOKEN_VALUE
```

On Windows PowerShell:

```powershell
$env:CLOUDFLARE_API_TOKEN="YOUR_TOKEN_VALUE"
```

Check:

```bash
wrangler whoami
```

It should print your Cloudflare account information instead of asking you to log in. [cloudflare-docs-zh.pages](https://cloudflare-docs-zh.pages.dev/workers/wrangler/ci-cd/)

## Local development

Clone the repo and start a local dev server:

```bash
git clone https://github.com/gagofure/ch-hello-api.git
cd ch-hello-api

wrangler dev
```

Wrangler will start a local server, usually at:

```text
http://127.0.0.1:8787
```

Test endpoints:

- Landing page:  
  `http://127.0.0.1:8787/`

- JSON API:  
  `http://127.0.0.1:8787/api/hello`  
  `http://127.0.0.1:8787/api/time`  
  `http://127.0.0.1:8787/api/health`

The local dev flow matches Cloudflare’s “Get started – CLI” guide for Workers. [developers.cloudflare](https://developers.cloudflare.com/workers/get-started/guide/)

## Deploy

From the repo root:

```bash
wrangler deploy
```

On success, Wrangler prints the public Worker URL, for example:

```text
https://ch-hello-api.<your-account>.workers.dev
```

You can then access:

- `https://...workers.dev/` – HTML landing page  
- `https://...workers.dev/api/hello` – hello JSON  
- `https://...workers.dev/api/time` – time JSON  
- `https://...workers.dev/api/health` – health JSON

## Project structure

```text
ch-hello-api/
├─ src/
│  └─ index.js      # Worker code (landing page + JSON API)
├─ wrangler.json    # Wrangler configuration (name, main, account_id, compatibility_date)
└─ README.md
```