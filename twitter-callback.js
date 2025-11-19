import axios from "axios";

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({
      ok: false,
      error: "Missing authorization code.",
    });
  }

  try {
    // Token csere Twittertől
    const tokenRes = await axios.post(
      "https://api.twitter.com/2/oauth2/token",
      new URLSearchParams({
        code: code,
        grant_type: "authorization_code",
        redirect_uri: "https://catkitsune.xyz/api/twitter-callback",
        client_id: process.env.TWITTER_CLIENT_ID,
        code_verifier: "login",
      }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const access_token = tokenRes.data.access_token;

    // Profil lekérés
    const profileRes = await axios.get("https://api.twitter.com/2/users/me", {
      headers: { Authorization: `Bearer ${access_token}` },
      params: { "user.fields": "profile_image_url,username" },
    });

    const user = profileRes.data.data;

    return res.status(200).json({
      ok: true,
      username: user.username,
      profile_image_url: user.profile_image_url,
    });

  } catch (err) {
    console.error("Twitter callback error:", err?.response?.data || err);

    return res.status(500).json({
      ok: false,
      error: "Failed to complete Twitter login.",
    });
  }
}
