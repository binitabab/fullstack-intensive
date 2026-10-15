import dotenv from "dotenv";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

export const config = {
  port: Number(process.env.PORT) || 4000,
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bizflow",
  jwtSecret: process.env.JWT_SECRET || "dev-only-insecure-secret-change-me",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://127.0.0.1:5173",
  cookieName: "bizflow_token",
  isProd,
};

if (!process.env.JWT_SECRET && isProd) {
  throw new Error("JWT_SECRET is required in production");
}

if (!process.env.JWT_SECRET) {
  console.warn(
    "[bizflow] JWT_SECRET not set — using a fragile dev default. Set it in .env before any real deploy.",
  );
}
