import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../models/User.js";

const registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(128),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(128),
});

export async function register(req, res, next) {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) throw Object.assign(new Error("Validation error"), { status: 400, details: parsed.error.errors });
    const { username, email, password } = parsed.data;
    const exists = await User.findOne({ email });
    if (exists) throw Object.assign(new Error("Email already registered"), { status: 409 });
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "Registration successful", id: user._id });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) throw Object.assign(new Error("Validation error"), { status: 400, details: parsed.error.errors });
    const { email, password } = parsed.data;
    const user = await User.findOne({ email });
    if (!user) throw Object.assign(new Error("Invalid credentials"), { status: 401 });
    const match = await user.comparePassword(password);
    if (!match) throw Object.assign(new Error("Invalid credentials"), { status: 401 });
    const secret = process.env.JWT_SECRET;
    if (!secret) throw Object.assign(new Error("JWT_SECRET not set"), { status: 500 });
    const token = jwt.sign({ sub: user._id.toString(), email: user.email, username: user.username }, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}
