import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { findUserById } from "../repos/users.js";

export function signToken(user) {
  const id = user._id ?? user.id;
  return jwt.sign(
    { sub: String(id), email: user.email },
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

    const user = await findUserById(payload.sub);
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
