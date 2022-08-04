import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

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
  },
});
