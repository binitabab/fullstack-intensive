import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { User } from "../models/User.js";

export function signToken(user) {
  return jwt.sign(
    { sub: String(user._id), email: user.email },
    config.jwtSecret,
    { expiresIn: "7d" },
  );
}

export function setAuthCookie(res, token) {
  res.cookie(config.cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: config.isProd,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

export function clearAuthCookie(res) {
  res.clearCookie(config.cookieName, {
    httpOnly: true,
    sameSite: "lax",
    secure: config.isProd,
    path: "/",
  });
}

/** Requires a valid session cookie. Attaches req.user. */
export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.[config.cookieName];
    if (!token) {
      const err = new Error("Authentication required");
      err.status = 401;
      throw err;
    }

    let payload;
    try {
      payload = jwt.verify(token, config.jwtSecret);
    } catch {
      const err = new Error("Invalid or expired session");
      err.status = 401;
      throw err;
    }

    const user = await User.findById(payload.sub).select("name email");
    if (!user) {
      const err = new Error("Authentication required");
      err.status = 401;
      throw err;
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
