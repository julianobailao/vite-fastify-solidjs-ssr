import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid({ ssr: true })],
  server: { port: 3000 },
  build: {
    minify: false,
  },
  root: "",
  resolve: {
    conditions: ["development", "browser"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
