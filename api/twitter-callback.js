export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  const CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
  const CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
  const REDIRECT_URI = "https://catkitsune.xyz/api/twitter-callback";

  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  try {
    const tokenResponse = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        code_verifier: "challenge"
      })
    });

    const token = await tokenResponse.json();

    if (!token.access_token) {
      return res.status(400).json({ error: "Failed to obtain access token", token });
    }

    // --- USER DATA ---
    const userReq = await fetch("https://api.twitter.com/2/users/me?user.fields=profile_image_url,name,username", {
      headers: {
        "Authorization": `Bearer ${token.access_token}`,
      },
    });

    const user = await userReq.json();

    const name = encodeURIComponent(user.data.name);
    const username = encodeURIComponent(user.data.username);
    const avatar = encodeURIComponent(user.data.profile_image_url);

    return res.redirect(`https://catkitsune.xyz/?name=${name}&username=${username}&avatar=${avatar}`);

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
