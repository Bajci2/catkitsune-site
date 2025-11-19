export default async function handler(req, res) {
  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).json({
        ok: false,
        message: "Hiányzik a Twitter által küldött 'code' paraméter."
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Twitter callback működik!",
      code: code,
      state: state
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}
