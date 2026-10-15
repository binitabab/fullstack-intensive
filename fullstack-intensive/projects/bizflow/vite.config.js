import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true, // fail clearly if 5173 is busy (don't silently hop ports)
    proxy: {
      // Browser calls /api/... → Express on :4000 (avoids CORS pain in local dev)
      "/api": {
        target: "http://127.0.0.1:4000",
        changeOrigin: true,
      },
    },
  },
});
