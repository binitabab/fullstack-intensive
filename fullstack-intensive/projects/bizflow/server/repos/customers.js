import { dbMode } from "../db.js";
import * as mem from "../memory/customers.js";

async function mongoCustomer() {
  const mod = await import("../models/Customer.js");
  return mod.Customer;
}

export async function countCustomersForOwner(ownerId) {
  if (dbMode === "memory") return mem.countForOwner(ownerId);
  const Customer = await mongoCustomer();
  return Customer.countDocuments({ owner: ownerId });
}

export async function seedCustomers(ownerId, rows) {
  if (dbMode === "memory") return mem.insertManyForOwner(ownerId, rows);
  const Customer = await mongoCustomer();
  await Customer.insertMany(rows.map((row) => ({ ...row, owner: ownerId })));
}

export async function listCustomersForOwner(ownerId) {
  if (dbMode === "memory") return mem.listForOwner(ownerId);
  const Customer = await mongoCustomer();
  const rows = await Customer.find({ owner: ownerId }).sort({ createdAt: -1 });
  return rows.map((r) => r.toJSON());
}

export async function createCustomerForOwner(ownerId, clean) {
  if (dbMode === "memory") return mem.createForOwner(ownerId, clean);
  const Customer = await mongoCustomer();
  const customer = await Customer.create({ ...clean, owner: ownerId });
  return customer.toJSON();
}
