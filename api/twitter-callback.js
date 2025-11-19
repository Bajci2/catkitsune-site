// /api/twitter-callback.js

export default async function handler(req, res) {
  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).json({
        ok: false,
        error: "Hiányzik a 'code' paraméter."
      });
    }

    // Twitter app adatai
    const CLIENT_ID = process.env.TWITTER_CLIENT_ID;
    const CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;

    // A token csere endpoint
    const tokenUrl = "https://api.twitter.com/2/oauth2/token";

    // Authorization Basic header létrehozása
    const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

    // Token csere request
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "https://catkitsune.xyz/api/twitter-callback",
      code_verifier: "challenge"
    });

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body.toString()
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({
        ok: false,
        error: "Token csere sikertelen",
        details: data
      });
    }

    // Sikeres token csere
    return res.status(200).json({
      ok: true,
      message: "Twitter callback + token csere működik!",
      token_response: data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Szerver hiba",
      details: error.message
    });
  }
}
