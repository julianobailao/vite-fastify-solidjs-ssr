import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin({ ssr: true })],
  server: { port: 3000 },
  build: {
    minify: false,
  },
  root: "",
});
