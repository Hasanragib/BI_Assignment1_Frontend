import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // This tells Vite to use the modern Sass compiler API
        api: "modern-compiler",
      },
    },
  },
});
