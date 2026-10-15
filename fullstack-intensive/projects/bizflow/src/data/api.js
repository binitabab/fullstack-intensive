/**
 * HTTP client — same function names as the old mockApi.
 * Pages keep importing listCustomers / createCustomer; only this file changed.
 *
 * In dev, Vite proxies /api → Express (see vite.config.js).
 */

async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let body = null;
  const text = await res.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = { error: text };
    }
  }

  if (!res.ok) {
    const message = body?.error || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return body;
}

export async function listCustomers() {
  return request("/api/customers");
}

export async function createCustomer(input) {
  return request("/api/customers", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
