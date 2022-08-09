import bootstrap from "./app";

export async function createServer(isProd = process.env.NODE_ENV === "production") {
  const app = await bootstrap(isProd);
  const port = process.env.PORT || 7456;
  await app.listen(Number(port), "0.0.0.0", () => {
    console.log(`App is listening on http://localhost:${port}`);
  });

  return { app, port };
}

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
if (!isTest) createServer();
