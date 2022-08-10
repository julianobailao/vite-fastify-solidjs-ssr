import fs from "fs/promises";
import type { App, ServerInstance } from "@root/server";
import { GET, RequestHandler } from "fastify-decorators";
import { generateHydrationScript } from "solid-js/web";

@GET({
  url: "*",
})
export default class SPARenderHandler extends RequestHandler {
  async handle() {
    const { $app } = this.request.server as ServerInstance;
    const stylesheets = $app.getStyleSheets();
    const url = this.request.url;

    try {
      // 1. Read index.html
      // TODO: change this to a TSX with solid
      let template = await fs.readFile(
        $app.isProd ? $app.resolve("dist/client/index.html") : $app.resolve("index.html"),
        "utf-8",
      );

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      template = await $app.vite.transformIndexHtml(url, template);

      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      let productionBuildPath = $app.resolve("./dist/server/entry-server.mjs");
      let devBuildPath = $app.resolve("./src/client/entry-server.tsx");
      const { render } = await $app.vite.ssrLoadModule($app.isProd ? productionBuildPath : devBuildPath);

      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = await render(url);
      const cssAssets = $app.isProd ? "" : await stylesheets;
      const headThings = [cssAssets, generateHydrationScript()];

      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace(`<!--app-html-->`, appHtml).replace(`<!--head-->`, headThings.join(""));

      // 6. Send the rendered HTML back.
      this.reply.status(200).header("Content-Type", "text/html").send(html);
    } catch (e: any) {
      !$app.isProd && $app.vite.ssrFixStacktrace(e);
      console.log(e.stack);
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      $app.vite.ssrFixStacktrace(e);
      const errorReply = this.reply.status(500);
      // Display error on response only outside production
      !$app.isProd && errorReply.send(e);
    }
  }
}
