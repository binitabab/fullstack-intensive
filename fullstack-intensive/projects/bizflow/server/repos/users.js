import { dbMode } from "../db.js";
import * as mem from "../memory/users.js";

async function mongoUser() {
  const mod = await import("../models/User.js");
  return mod.User;
}

export async function hashPassword(password) {
  if (dbMode === "memory") return mem.hashPassword(password);
  const User = await mongoUser();
  return User.hashPassword(password);
}

export async function createUser({ name, email, passwordHash }) {
  if (dbMode === "memory") {
    return mem.createUser({ name, email, passwordHash });
  }
  const User = await mongoUser();
  return User.create({ name, email, passwordHash });
}

export async function findUserByEmail(email) {
  if (dbMode === "memory") return mem.findByEmail(email);
  const User = await mongoUser();
  return User.findOne({ email });
}

export async function findUserById(id) {
  if (dbMode === "memory") return mem.findById(id);
  const User = await mongoUser();
  return User.findById(id).select("name email");
}
