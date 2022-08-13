import { GET } from "fastify-decorators";
import { App, ServerInstance } from "@root/server";
import { RENDER_TYPE } from "@shared/enums/render-type.enum";
import { SpaRendererService } from "@shared/services/spa-renderer.service";
import BaseHandler from "./base-handler";

@GET({
  url: "*",
})
export default class SpaRendererHandler extends BaseHandler {
  async handle() {
    const { $app } = this.request.server as ServerInstance;

    try {
      this.reply.header("Content-Type", "text/html").code(200);
      return SpaRendererService.render(RENDER_TYPE.STREAM, this.request);
    } catch (e: any) {
      console.log(e.stack);
      !App.isProd && $app.vite.ssrFixStacktrace(e);
      $app.vite.ssrFixStacktrace(e);
      const errorReply = this.reply.status(500);
      !App.isProd && errorReply.send(e);
    }
  }
}
