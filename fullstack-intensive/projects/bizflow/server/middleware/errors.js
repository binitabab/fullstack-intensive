export function notFound(_req, res) {
  res.status(404).json({ error: "Not found" });
}

export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  const message =
    status === 500 ? "Internal server error" : err.message || "Request failed";

  if (status === 500) {
    console.error(err);
  }

  // Duplicate email (Mongo unique index)
  if (err?.code === 11000) {
    return res.status(409).json({ error: "Email is already registered" });
  }

  res.status(status).json({ error: message });
}
