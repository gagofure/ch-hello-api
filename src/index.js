export default {
	async fetch(request, env, ctx) {
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
