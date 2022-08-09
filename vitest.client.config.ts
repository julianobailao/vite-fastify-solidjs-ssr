import { defineConfig } from "vitest/config";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid({ ssr: true })],
  test: {
    include: ["tests/client/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    environment: "jsdom",
    transformMode: {
      web: [/.[jt]sx?/],
    },
    threads: false,
    isolate: false,
    deps: {
      inline: [/solid-testing-library/],
    },
  },
});
