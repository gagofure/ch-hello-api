// Simple in-memory rate limiter
const rateLimitStore = new Map();
const RATE_LIMIT_REQUESTS = 10; // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in ms

function getRateLimitKey(request) {
	return request.headers.get("CF-Connecting-IP") || "unknown";
}

function isRateLimited(key) {
	const now = Date.now();
	if (!rateLimitStore.has(key)) {
		rateLimitStore.set(key, []);
	}

	const requests = rateLimitStore.get(key);
	// Remove old requests outside the window
	const validRequests = requests.filter((time) => now - time < RATE_LIMIT_WINDOW);
	rateLimitStore.set(key, validRequests);

	if (validRequests.length >= RATE_LIMIT_REQUESTS) {
		return true;
	}

	validRequests.push(now);
	return false;
}

export default {
	async fetch(request, env, ctx) {
		// Check rate limit
		const clientKey = getRateLimitKey(request);
		if (isRateLimited(clientKey)) {
			return json(
				{ error: "Rate limited", retryAfter: 60 },
				429
			);
		}

		const url = new URL(request.url);
		const { pathname } = url;

		// Landing page at "/"
		if (pathname === "/" && request.method === "GET") {
			const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Ogaga Cloudflare Worker</title>
        </head>
        <body>
          <h1>Ogaga's – Cloudflare Worker Playground</h1>
          <p>This Worker exposes a simple JSON API at <code>/api/hello</code>, <code>/api/time</code>, and <code>/api/health</code>.</p>
        </body>
        </html>
      `;
			return new Response(html, {
				status: 200,
				headers: { "Content-Type": "text/html; charset=UTF-8" },
			});
		}

		// Existing JSON API
		if (pathname === "/api/hello" && request.method === "GET") {
			return json({ message: "Hello from Cloudflare Workers" });
		}

		if (pathname === "/api/time" && request.method === "GET") {
			return json({ time: new Date().toISOString() });
		}

		if (pathname === "/api/health" && request.method === "GET") {
			return json({ status: "ok" });
		}

		return json({ error: "Not found" }, 404);
	},
};

function json(body, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}
