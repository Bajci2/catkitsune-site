export default async function handler(req, res) {
  const { access_token } = req.query;

  if (!access_token) {
    return res.status(400).json({ ok: false, error: "Missing access_token" });
  }

  try {
    const response = await fetch("https://api.twitter.com/2/users/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await response.json();

    if (data.errors) {
      return res.status(400).json({ ok: false, error: data.errors });
    }

    return res.status(200).json({
      ok: true,
      user: {
        id: data.data.id,
        name: data.data.name,
        username: data.data.username,
        profile_image_url: data.data.profile_image_url,
      }
    });

  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}
