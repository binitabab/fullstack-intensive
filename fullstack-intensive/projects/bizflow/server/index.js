/**
 * BizFlow API — Express (Milestone 2)
 *
 * LISTEN: http://127.0.0.1:4000
 * Routes:
 *   GET  /api/health
 *   GET  /api/customers
 *   POST /api/customers
 *
 * Data is still in-memory (lost on server restart). Mongo arrives in Milestone 3.
 */

import cors from "cors";
import express from "express";
import { createCustomer, listCustomers } from "./customersStore.js";

const PORT = Number(process.env.PORT) || 4000;
const app = express();

app.use(cors({ origin: true }));
app.use(express.json({ limit: "32kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "bizflow-api", milestone: 2 });
});

app.get("/api/customers", (_req, res) => {
  res.json(listCustomers());
});

app.post("/api/customers", (req, res, next) => {
  try {
    const customer = createCustomer(req.body ?? {});
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
});

// Central error handler — predictable JSON for the React client
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message =
    status === 500 ? "Internal server error" : err.message || "Request failed";
  if (status === 500) {
    console.error(err);
  }
  res.status(status).json({ error: message });
});

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`BizFlow API listening on http://127.0.0.1:${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Stop the other process, then run npm run dev again.`,
    );
  } else {
    console.error(err);
  }
  process.exit(1);
});
