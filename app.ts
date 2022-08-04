import { Request, Response } from "express";
import { getApi } from "./src/server/routes/api";
import { generateHydrationScript } from "solid-js/web";

const fs = require("fs");
const path = require("path");
const express = require("express");

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

export default async function createServer(root = __dirname, isProd = process.env.NODE_ENV === "production") {
  const resolve = (p: string) => path.resolve(__dirname, p);

  const indexProd = isProd ? fs.readFileSync(resolve("client/index.html"), "utf-8") : "";

  const app = express();

  const requestHandler = express.static(resolve("assets"));
  app.use(requestHandler);
  app.use("/assets", requestHandler);

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite: any;
  if (!isProd && !isTest) {
    vite = await require("vite").createServer({
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: "ssr",
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
      },
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use(require("compression")());
    app.use(
      require("serve-static")(resolve("dist/client"), {
        index: false,
      }),
    );
  }

  app.use("/api", getApi);

  app.use("*", async (req: Request, res: Response) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("src/client/entry-server.tsx")).render;
      } else {
        template = indexProd;
        render = require("./server/entry-server.js").render;
      }

      const context = {};
      const appHtml = await render(url, context);
      let html = template.replace(`<!--app-html-->`, appHtml);
      html = template.replace(`<!--hydratation-script-->`, generateHydrationScript());

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}
