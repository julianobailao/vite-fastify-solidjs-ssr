import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import compress from "vite-plugin-compress";
import config from "./vite.config.default";

const isProd = process.env.NODE_ENV === "production";
const enableCompress = isProd && !!process.env.ENABLE_COMPRESSION;

// https://vitejs.dev/config/
export default defineConfig({
  ...config,
  plugins: [enableCompress && compress({ verbose: true }), solid({ ssr: true })],
  server: { port: 3000 },
  build: {
    minify: isProd,
  },
  root: "",
});
