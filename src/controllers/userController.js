export async function getMe(req, res, next) {
  try {
    const user = req.user;
    if (!user) throw Object.assign(new Error("Unauthorized"), { status: 401 });
    res.json({ id: user.sub, email: user.email, username: user.username });
  } catch (err) {
    next(err);
  }
}
