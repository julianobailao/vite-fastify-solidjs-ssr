import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid({ ssr: true })],
  test: {
    include: ["tests/client/e2e/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    testTimeout: 60_000,
    hookTimeout: 60_000,
  },
});
