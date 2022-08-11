import { GET, RequestHandler } from "fastify-decorators";
import type { ServerInstance } from "@root/server";
import { RENDER_TYPE } from "@shared/enums/render-type.enum";
import { SpaRendererService } from "@shared/services/spa-renderer.service";

@GET({
  url: "*",
})
export default class SpaRenderer extends RequestHandler {
  async handle() {
    const { $app } = this.request.server as ServerInstance;

    try {
      this.reply.header("Content-Type", "text/html").code(200);
      return SpaRendererService.render(RENDER_TYPE.STREAM, this.request);
    } catch (e: any) {
      console.log(e.stack);
      !$app.isProd && $app.vite.ssrFixStacktrace(e);
      $app.vite.ssrFixStacktrace(e);
      const errorReply = this.reply.status(500);
      !$app.isProd && errorReply.send(e);
    }
  }
}
