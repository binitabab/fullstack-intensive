/**
 * MOCK API — pretends to be a backend.
 *
 * UPGRADE PATH (Week 2):
 * Replace function bodies with fetch('/api/customers') etc.
 * Keep the same exported names so pages barely change.
 *
 * WHY delay? Real networks are slow. UI must handle loading states.
 */

import { normalizeCustomerInput } from "../domain/customer.js";

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
let db = structuredClone(SEED);

const DELAY_MS = 450;

function wait(ms = DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Flip to true in DevTools to practice ErrorState: mockApi.forceFail = true */
export const mockApi = {
  forceFail: false,
};

async function maybeFail() {
  await wait();
  if (mockApi.forceFail) {
    throw new Error("Mock API failure — practice the error UI (set mockApi.forceFail = false to recover)");
  }
}

export async function listCustomers() {
  await maybeFail();
  return structuredClone(db);
}

export async function createCustomer(input) {
  await maybeFail();
  const clean = normalizeCustomerInput(input);
  const customer = {
    id: crypto.randomUUID(),
    ...clean,
    createdAt: new Date().toISOString(),
  };
  db = [customer, ...db];
  return structuredClone(customer);
}

export async function resetMockData() {
  db = structuredClone(SEED);
}
