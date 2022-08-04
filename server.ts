import createServer from "./app";

createServer().then(({ app }) => {
  const port = process.env.PORT || 7456;
  app.listen(Number(port), "0.0.0.0", () => {
    console.log(`App is listening on http://localhost:${port}`);
  });
});
