/**
 * In-memory store on the SERVER.
 * Milestone 3 replaces this with MongoDB — keep the same function names.
 */

import { randomUUID } from "node:crypto";
import { normalizeCustomerInput } from "../shared/customerValidation.js";

const SEED = [
  {
    id: "c1",
    name: "Ada Okonkwo",
    email: "ada@brightkitchen.co",
    status: "active",
    createdAt: "2026-09-01T10:00:00.000Z",
  },
  {
    id: "c2",
    name: "Ben Hale",
    email: "ben@hale.studio",
    status: "lead",
    createdAt: "2026-09-12T14:20:00.000Z",
  },
  {
    id: "c3",
    name: "Carla Mendes",
    email: "carla@mendes.supply",
    status: "active",
    createdAt: "2026-09-20T09:05:00.000Z",
  },
  {
    id: "c4",
    name: "Diego Park",
    email: "diego@parktools.io",
    status: "inactive",
    createdAt: "2026-08-15T16:40:00.000Z",
  },
  {
    id: "c5",
    name: "Elena Rossi",
    email: "elena@rossi.cafe",
    status: "lead",
    createdAt: "2026-10-01T11:10:00.000Z",
  },
  {
    id: "c6",
    name: "Farah Khan",
    email: "farah@khan.logistics",
    status: "active",
    createdAt: "2026-10-05T08:30:00.000Z",
  },
  {
    id: "c7",
    name: "Gabe Liu",
    email: "gabe@liu.print",
    status: "lead",
    createdAt: "2026-10-08T13:00:00.000Z",
  },
];

/** @type {typeof SEED} */
let customers = structuredClone(SEED);

export function listCustomers() {
  return customers.map((c) => ({ ...c }));
}

export function createCustomer(input) {
  const clean = normalizeCustomerInput(input);
  const customer = {
    id: randomUUID(),
    ...clean,
    createdAt: new Date().toISOString(),
  };
  customers = [customer, ...customers];
  return { ...customer };
}

export function resetCustomers() {
  customers = structuredClone(SEED);
}
