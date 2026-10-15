import { config } from "./config.js";

/** @type {"mongo" | "memory"} */
export let dbMode = "mongo";

export async function connectDb() {
  if (process.env.USE_MEMORY_DB === "1") {
    dbMode = "memory";
    console.warn(
      "[bizflow] USE_MEMORY_DB=1 — using in-memory store (data resets on restart).",
    );
    return;
  }

  try {
    const mongoose = (await import("mongoose")).default;
    mongoose.set("strictQuery", true);
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 4000,
    });
    dbMode = "mongo";
    console.log(`[bizflow] MongoDB connected (${config.mongoUri})`);
  } catch (err) {
    dbMode = "memory";
    console.warn(
      `[bizflow] MongoDB unavailable (${err.message}). Falling back to in-memory store so the app can run.`,
    );
    console.warn(
      "[bizflow] When Docker works: npm run dev:mongo  (or set a reachable MONGODB_URI).",
    );
  }
}
