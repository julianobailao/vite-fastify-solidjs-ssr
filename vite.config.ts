import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import compress from "vite-plugin-compress";

const isProd = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [isProd && compress({ verbose: true }), solid({ ssr: true })],
  server: { port: 3000 },
  build: {
    minify: false,
  },
  root: "",
});
