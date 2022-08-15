import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import compress from "vite-plugin-compression";
import config from "./vite.config.default";

process.env.NODE_ENV = "production";
process.env.ENABLED_COMPRESSION = "true";

const isProd = process.env.NODE_ENV === "production";
const compressByAlgotithm = (algorithm: "gzip" | "brotliCompress") => {
  const enableCompress = isProd && !!process.env.ENABLED_COMPRESSION;
  if (!enableCompress) return;
  return compress({ verbose: true, algorithm });
};

// https://vitejs.dev/config/
export default defineConfig({
  ...config,
  plugins: [
    compressByAlgotithm("brotliCompress"), // Compress with brotli (.br)
    compressByAlgotithm("gzip"), // Compress with gzip (.gz)
    solid({ ssr: true }),
  ],
  server: { port: 3000 },
  build: {
    minify: isProd,
  },
  root: "",
});
