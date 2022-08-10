import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/server/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    environment: "node",
    transformMode: {
      web: [/.[jt]sx?/],
    },
    threads: false,
    isolate: false,
  },
});
