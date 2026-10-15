/** In-process fallback when MongoDB/Docker is unavailable. Resets on restart. */

import { randomUUID } from "node:crypto";

export const memoryState = {
  users: [],
  customers: [],
};

export function newId() {
  return randomUUID();
}
