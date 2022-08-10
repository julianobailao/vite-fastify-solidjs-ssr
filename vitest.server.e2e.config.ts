import { defineConfig } from "vitest/config";
import config from "./vite.config.default";

export default defineConfig({
  ...config,
  test: {
    include: ["tests/server/e2e/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    environment: "node",
    transformMode: {
      web: [/.[jt]sx?/],
    },
    threads: false,
    isolate: false,
  },
});
