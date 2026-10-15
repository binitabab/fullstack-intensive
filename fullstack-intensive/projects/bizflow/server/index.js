/**
 * BizFlow API — Milestone 3
 * Express + MongoDB + cookie JWT auth
 */

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { config } from "./config.js";
import { connectDb, dbMode } from "./db.js";
import { errorHandler, notFound } from "./middleware/errors.js";
import authRoutes from "./routes/auth.js";
import customerRoutes from "./routes/customers.js";

const app = express();

app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true,
  }),
);
app.use(express.json({ limit: "32kb" }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "bizflow-api", milestone: 3, db: dbMode });
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  await connectDb();

  const server = app.listen(config.port, "127.0.0.1", () => {
    console.log(`BizFlow API listening on http://127.0.0.1:${config.port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `Port ${config.port} is already in use. Stop the other process, then run npm run dev again.`,
      );
    } else {
      console.error(err);
    }
    process.exit(1);
  });
}

start().catch((err) => {
  console.error("[bizflow] failed to start:", err.message || err);
  process.exit(1);
});
