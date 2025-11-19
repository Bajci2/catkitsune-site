export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({
      ok: false,
      message: "Hiányzik a Twitter 'code' paraméter."
    });
  }

  return res.status(200).json({
    ok: true,
    message: "Twitter callback működik.",
    code,
    state
  });
}
