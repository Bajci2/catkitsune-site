export default async function handler(req, res) {
  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).json({
        ok: false,
        error: "Missing authorization code",
      });
    }

    const CLIENT_ID = process.env.TWITTER_CLIENT_ID;
    const CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
    const REDIRECT_URI = "https://catkitsune.xyz/api/twitter-callback";

    // 1️⃣ TOKEN EXCHANGE — csere authorization code → access token
    const tokenResponse = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: new URLSearchParams({
        code: code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
        code_verifier: "challenge", // ugyanaz mint login-nél!
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res.status(400).json({
        ok: false,
        error: "Token csere sikertelen",
        details: tokenData,
      });
    }

    const accessToken = tokenData.access_token;

    // 2️⃣ USER ADATOK LEKÉRÉSE
    const userResponse = await fetch(
      "https://api.twitter.com/2/users/me?user.fields=profile_image_url,name,username",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userData = await userResponse.json();

    // 3️⃣ VISSZA FRONTENDNEK
    return res.status(200).json({
      ok: true,
      message: "Twitter callback + token csere működik",
      token: tokenData,
      user: userData,
      state,
    });
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: "Server error",
      details: e.message,
    });
  }
}
