import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // env variable from .env file
    "process.env.VITE_SERVER_URI": JSON.stringify(process.env.VITE_SERVER_URI),
  },
});
