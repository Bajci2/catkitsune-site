export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  const TOKEN_URL = "https://api.twitter.com/2/oauth2/token";

  const params = new URLSearchParams({
    code: code,
    grant_type: "authorization_code",
    redirect_uri: "https://catkitsune.xyz/api/twitter-callback",
    client_id: process.env.TWITTER_CLIENT_ID,
    code_verifier: "challenge",
  });

  try {
    const tokenRes = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const token = await tokenRes.json();

    if (!token.access_token) {
      return res.status(500).json({ error: "Failed to obtain access token", token });
    }

    const userRes = await fetch("https://api.twitter.com/2/users/me", {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    const userData = await userRes.json();

    if (!userData.data) {
      return res.status(500).json({ error: "User fetch failed", userData });
    }

    const name = userData.data.name;
    const username = userData.data.username;
    const avatar = userData.data.profile_image_url;

    return res.redirect(
      `https://catkitsune.xyz?name=${encodeURIComponent(
        name
      )}&username=${encodeURIComponent(
        username
      )}&avatar=${encodeURIComponent(avatar)}`
    );
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
