import bcrypt from "bcryptjs";
import { memoryState, newId } from "./state.js";

function wrap(user) {
  if (!user) return null;
  return {
    _id: user.id,
    id: user.id,
    name: user.name,
    email: user.email,
    passwordHash: user.passwordHash,
    async verifyPassword(password) {
      return bcrypt.compare(password, user.passwordHash);
    },
  };
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export async function createUser({ name, email, passwordHash }) {
  if (memoryState.users.some((u) => u.email === email)) {
    const err = new Error("Email is already registered");
    err.status = 409;
    err.code = 11000;
    throw err;
  }
  const user = { id: newId(), name, email, passwordHash };
  memoryState.users.push(user);
  return wrap(user);
}

export async function findByEmail(email) {
  return wrap(memoryState.users.find((u) => u.email === email) || null);
}

export async function findById(id) {
  return wrap(memoryState.users.find((u) => u.id === String(id)) || null);
}
