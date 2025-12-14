const ALLOWED_HOSTS = [".fal.ai", ".fal.run"];

function isAllowedTarget(urlString) {
  try {
    const u = new URL(urlString);
    const host = u.hostname.toLowerCase();
    return ALLOWED_HOSTS.some((suffix) => host === suffix.slice(1) || host.endsWith(suffix));
  } catch {
    return false;
  }
}

module.exports = async (req, res) => {
  // 1) Only GET + POST
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  // 2) Validate x-fal-target-url
  const targetUrl = req.headers["x-fal-target-url"];
  if (!targetUrl) {
    res.status(400).json({ error: "Missing x-fal-target-url header" });
    return;
  }
  if (!isAllowedTarget(targetUrl)) {
    res.status(412).json({ error: "Invalid target URL" });
    return;
  }

  // 3) Enforce JSON body for POST
  let body = undefined;
  if (req.method === "POST") {
    const contentType = (req.headers["content-type"] || "").toLowerCase();
    if (!contentType.includes("application/json")) {
      res.status(415).json({ error: "Unsupported Media Type" });
      return;
    }

    // Vercel may provide req.body already parsed OR as a string
    if (req.body == null) {
      body = undefined;
    } else if (typeof req.body === "string") {
      body = req.body;
    } else {
      body = JSON.stringify(req.body);
    }
  }

  // 4) Add server-side authorization: Key <FAL_KEY>
  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    res.status(500).json({ error: "Missing FAL_KEY env var on server" });
    return;
  }

  // 5) Forward request to FAL
  const headers = {
    // Copy through most headers, but we’ll control these:
    "authorization": `Key ${falKey}`,
    "content-type": "application/json",
  };

  // If FAL sends back useful headers, we’ll pass them through (except forbidden ones)
  const upstream = await fetch(targetUrl, {
    method: req.method,
    headers,
    body,
  });

  const text = await upstream.text();

  // Copy headers except content-length/content-encoding (Vercel sets those)
  upstream.headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (k === "content-length" || k === "content-encoding") return;
    res.setHeader(key, value);
  });

  res.status(upstream.status).send(text);
};
