import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // "./" makes every asset path relative, so the site works on GitHub Pages
  // at https://<user>.github.io/<repo-name>/ whatever the repo is called.
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
