// ============================================================
// ============================================================
// vite.config.js
// owns: build config, dev server, multi page entries
// ============================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// each version is its own html entry. vite builds them all.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        router: resolve(__dirname, "index.html"),
        mobile: resolve(__dirname, "@Mobile Version/Mobile.html"),
        tablet: resolve(__dirname, "@Tablet Version/Tablet.html"),
        laptop: resolve(__dirname, "@Laptop Version/Laptop.html"),
        dynamic: resolve(__dirname, "@Dynamic Version/Dynamic.html"),
        error: resolve(__dirname, "@Error Version/Error.html")
      }
    }
  }
});