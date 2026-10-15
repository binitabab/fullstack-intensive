import { Router } from "express";
import {
  clearAuthCookie,
  requireAuth,
  setAuthCookie,
  signToken,
} from "../middleware/auth.js";
import {
  createUser,
  findUserByEmail,
  hashPassword,
} from "../repos/users.js";
import { seedCustomersForUser } from "../seedForUser.js";

const router = Router();

function publicUser(user) {
  const id = user._id ?? user.id;
  return { id: String(id), name: user.name, email: user.email };
}

router.post("/register", async (req, res, next) => {
  try {
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
    const email =
      typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password =
      typeof req.body?.password === "string" ? req.body.password : "";

    if (!name) {
      const err = new Error("Name is required");
      err.status = 400;
      throw err;
    }
    if (!email || !email.includes("@")) {
      const err = new Error("A valid email is required");
      err.status = 400;
      throw err;
    }
    if (password.length < 8) {
      const err = new Error("Password must be at least 8 characters");
      err.status = 400;
      throw err;
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser({ name, email, passwordHash });
    const userId = user._id ?? user.id;
    await seedCustomersForUser(userId);

    const token = signToken(user);
    setAuthCookie(res, token);
    res.status(201).json({ user: publicUser(user) });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const email =
      typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password =
      typeof req.body?.password === "string" ? req.body.password : "";

    if (!email || !password) {
      const err = new Error("Email and password are required");
      err.status = 400;
      throw err;
    }

    const user = await findUserByEmail(email);
    if (!user || !(await user.verifyPassword(password))) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      throw err;
    }

    const token = signToken(user);
    setAuthCookie(res, token);
    res.json({ user: publicUser(user) });
  } catch (err) {
    next(err);
  }
});

router.post("/logout", (_req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

export default router;
