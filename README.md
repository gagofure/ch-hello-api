Here’s a simple README you can drop into a `README.md` file in your project.

***

# Cloudflare Workers – Hello API

A simple Cloudflare Worker that serves:

- A **landing page** at `/` (HTML)  
- JSON API endpoints at `/api/hello`, `/api/time`, and `/api/health`

## Prerequisites

- Node.js (LTS) installed  
- A Cloudflare account  
- Wrangler CLI installed:

```bash
npm install -g wrangler
```

Check Wrangler:

```bash
wrangler --version
```

## Setup

1. Clone or copy this project into a folder:

```bash
git clone <this-repo-url>
cd <project-folder>
```

2. Configure Cloudflare:

- Make sure you have a Cloudflare account.  
- (If needed) create an API token with Workers permissions in the Cloudflare dashboard.

3. Configure Wrangler (if using an API token):

On macOS / Linux:

```bash
export CLOUDFLARE_API_TOKEN=YOUR_TOKEN_VALUE
```

On Windows PowerShell:

```powershell
$env:CLOUDFLARE_API_TOKEN="YOUR_TOKEN_VALUE"
```

Make sure `wrangler.json` contains your account ID, for example:

```json
{
  "name": "ch-hello-api",
  "main": "src/index.js",
  "compatibility_date": "2024-10-01",
  "account_id": "YOUR_ACCOUNT_ID"
}
```

Cloudflare’s Wrangler configuration docs describe these fields in more detail. [developers.cloudflare](https://developers.cloudflare.com/workers/wrangler/configuration/)

## Local development

From the project folder:

```bash
wrangler dev
```

This starts a local dev server, usually at:

```text
http://127.0.0.1:8787
```

Test in your browser or with curl:

- Landing page:  
  `http://127.0.0.1:8787/`

- JSON endpoints:  
  `http://127.0.0.1:8787/api/hello`  
  `http://127.0.0.1:8787/api/time`  
  `http://127.0.0.1:8787/api/health`

Cloudflare’s “Get started with Workers (CLI)” guide uses the same `wrangler dev` workflow for local testing. [developers.cloudflare](https://developers.cloudflare.com/workers/get-started/guide/)

## Deploy

Deploy the Worker to Cloudflare:

```bash
wrangler deploy
```

Wrangler will output a public URL like:

```text
https://ch-hello-api.<your-name>.workers.dev
```

You can then access:

- `https://...workers.dev/` – landing page  
- `https://...workers.dev/api/hello` – hello JSON  
- `https://...workers.dev/api/time` – time JSON  
- `https://...workers.dev/api/health` – health JSON

## Project structure

Example structure:

```text
.
├─ src/
│  └─ index.js      # Worker code (HTML landing page + JSON API)
├─ wrangler.json    # Wrangler configuration (name, main, account_id, compatibility_date)
└─ README.md
```

Configuration options for `wrangler.json` are documented in the Wrangler configuration reference. [app.studyraid](https://app.studyraid.com/en/read/14352/488193/configuring-wranglertoml-for-your-project-needs)

***
