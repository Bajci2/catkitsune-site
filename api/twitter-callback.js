export default async function handler(req, res) {
  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).json({ ok: false, error: "Missing code" });
    }

    // --- TOKEN CSERE ---
    const tokenResponse = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.TWITTER_CLIENT_ID + ":" + process.env.TWITTER_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        grant_type: "authorization_code",
        client_id: process.env.TWITTER_CLIENT_ID,
        redirect_uri: "https://catkitsune.xyz/api/twitter-callback",
        code_verifier: "challenge",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res.status(400).json({
        ok: false,
        error: "Token exchange failed",
        details: tokenData,
      });
    }

    // --- USER ADATOK LETÖLTÉSE ---
    const userResponse = await fetch(
      "https://api.twitter.com/2/users/me?user.fields=profile_image_url,name,username",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const user = await userResponse.json();

    if (!user.data) {
      return res.status(400).json({
        ok: false,
        error: "User fetch error",
        details: user,
      });
    }

    // --- ADATOK KINYERÉSE ---
    const name = encodeURIComponent(user.data.name);
    const username = encodeURIComponent(user.data.username);
    const avatar = encodeURIComponent(user.data.profile_image_url);

    // --- ÁTIRÁNYÍTÁS A FŐOLDALRA ---
    return res.redirect(
      `https://catkitsune.xyz/?name=${name}&username=${username}&avatar=${avatar}`
    );
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
