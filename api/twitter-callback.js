export default async function handler(req, res) {
  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).json({ ok: false, error: "Missing ?code parameter" });
    }

    const params = new URLSearchParams();
    params.append("client_id", process.env.TWITTER_CLIENT_ID);
    params.append("client_secret", process.env.TWITTER_CLIENT_SECRET);
    params.append("code", code);
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", "https://catkitsune.xyz/api/twitter-callback");
    params.append("code_verifier", "challenge");

    // --- Twitter token csere ---
    const tokenRes = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      return res.status(400).json({
        ok: false,
        error: "Token csere sikertelen",
        details: tokenData,
      });
    }

    // Ha minden ok → visszaadjuk a tokent
    return res.status(200).json({
      ok: true,
      message: "Twitter token csere sikeres.",
      tokens: tokenData,
      state,
    });

  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}
