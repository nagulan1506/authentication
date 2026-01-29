import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") throw Object.assign(new Error("Unauthorized"), { status: 401 });
    const token = parts[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) throw Object.assign(new Error("JWT_SECRET not set"), { status: 500 });
    const decoded = jwt.verify(token, secret);
    const exists = await User.exists({ _id: decoded.sub });
    if (!exists) throw Object.assign(new Error("Unauthorized"), { status: 401 });
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") err.status = 401;
    next(err);
  }
}
