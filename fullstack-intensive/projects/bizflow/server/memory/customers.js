import { memoryState, newId } from "./state.js";

function toJson(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    status: row.status,
    createdAt: row.createdAt,
  };
}

export async function countForOwner(ownerId) {
  return memoryState.customers.filter((c) => c.ownerId === String(ownerId)).length;
}

export async function insertManyForOwner(ownerId, rows) {
  for (const row of rows) {
    memoryState.customers.push({
      id: newId(),
      ownerId: String(ownerId),
      name: row.name,
      email: row.email,
      status: row.status,
      createdAt: new Date().toISOString(),
    });
  }
}

export async function listForOwner(ownerId) {
  return memoryState.customers
    .filter((c) => c.ownerId === String(ownerId))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map(toJson);
}

export async function createForOwner(ownerId, clean) {
  const row = {
    id: newId(),
    ownerId: String(ownerId),
    name: clean.name,
    email: clean.email,
    status: clean.status,
    createdAt: new Date().toISOString(),
  };
  memoryState.customers.unshift(row);
  return toJson(row);
}
