import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    assetsDir: "assets", // Ensures assets are placed in the correct folder
  },
});
