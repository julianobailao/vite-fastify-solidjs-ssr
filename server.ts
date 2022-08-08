import bootstrap from "./app";

async function createServer(isProd = process.env.NODE_ENV === "production") {
  const app = await bootstrap(isProd);
  const port = process.env.PORT || 7456;
  app.listen(Number(port), "0.0.0.0", () => {
    console.log(`App is listening on http://localhost:${port}`);
  });
}

createServer();
