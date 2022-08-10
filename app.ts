import "module-alias/register";
import type { FastifyRequest as Request, FastifyReply as Response } from "fastify";
import { existsSync as checkDirectoryExists } from "fs";
import fs from "fs/promises";
import path from "path";
import fastify from "fastify";
import compression from "compression";
import serveStatic from "serve-static";
import { createServer as createViteServer } from "vite";
import { generateHydrationScript } from "solid-js/web";
import { getApi } from "./src/server/routes/api";
import fastifyMiddie from "@fastify/middie";

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
const resolve = (p: string) => path.resolve(__dirname, p);
const getStyleSheets = async () => {
  const assetpath = resolve("dist/assets");
  if (!checkDirectoryExists(assetpath)) return;
  const files = await fs.readdir(assetpath);
  const cssAssets = files.filter(l => l.endsWith(".css"));
  const allContent: string[] = [];
  for (const asset of cssAssets) {
    const content = await fs.readFile(path.join(assetpath, asset), "utf-8");
    allContent.push(`<style type="text/css">${content}</style>`);
  }
  return allContent.join("\n");
};

export default async function bootstrap(isProd = process.env.NODE_ENV === "production") {
  const app: any = fastify({ logger: !isProd && !isTest });

  // adds middleware support to Fastify.
  await app.register(fastifyMiddie);

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    root: __dirname,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: isTest ? "error" : "info",
  });

  // use vite's connect instance as middleware
  app.use((req: Request, resp: Response, next: any) => {
    if (req.url.includes("api")) return next();
    return vite.middlewares(req as any, resp as any, next);
  });

  const assetDirectory = resolve("assets");
  if (checkDirectoryExists(assetDirectory)) {
    await app.register(require("@fastify/static"), {
      root: assetDirectory,
      prefix: "/assets/",
    });
  }

  if (isProd) {
    app.use(compression());
    app.use(
      serveStatic(resolve("dist/client"), {
        index: false,
      }),
    );
  }

  app.get("/api", getApi);

  const stylesheets = getStyleSheets();
  app.get("*", async (req: Request, res: Response, next: any) => {
    const url = req.url;

    try {
      // 1. Read index.html
      let template = await fs.readFile(isProd ? resolve("dist/client/index.html") : resolve("index.html"), "utf-8");

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template);

      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      let productionBuildPath = path.join(__dirname, "./dist/server/entry-server.mjs");
      let devBuildPath = path.join(__dirname, "./src/client/entry-server.tsx");
      const { render } = await vite.ssrLoadModule(isProd ? productionBuildPath : devBuildPath);

      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = await render(url);
      const cssAssets = isProd ? "" : await stylesheets;
      const headThings = [cssAssets, generateHydrationScript()];

      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace(`<!--app-html-->`, appHtml).replace(`<!--head-->`, headThings.join(""));

      // 6. Send the rendered HTML back.
      res.status(200).header("Content-Type", "text/html").send(html);
    } catch (e: any) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  return app;
}
