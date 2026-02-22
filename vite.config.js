import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/resume/", // GitHub Pages base path (repo name)
  envDir: ".", // load .env from project root
});
