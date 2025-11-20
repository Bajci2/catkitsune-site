export default async function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Missing token" });
  }

  try {
    const response = await fetch("https://api.twitter.com/2/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    return res.status(200).json({ ok: true, user: data });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
