import fs from "fs/promises";
import Minipass from "minipass";
import type { FastifyRequest } from "fastify";
import type { ServerInstance } from "@root/server";
import { App } from "@root/server";
import { generateHydrationScript } from "solid-js/web";
import { RENDER_TYPE } from "../enums/render-type.enum";

export class SpaRendererService {
  static readonly HEAD_INJECTION = "<!--head-injection-->";
  static readonly BODY_INJECTION = "<!--body-injection-->";

  private constructor(private readonly _type: RENDER_TYPE, private readonly request: FastifyRequest) {}

  private get $app(): App {
    return (this.request.server as ServerInstance).$app;
  }

  public get url() {
    return this.request.url;
  }

  private async _getStyleSheets() {
    return this.$app.getStyleSheets();
  }

  private async _getHeadIncludes(): Promise<string> {
    const cssAssets = App.isProd ? "" : await this._getStyleSheets();
    return [cssAssets, generateHydrationScript()].join("");
  }

  private async _getIndexHtml(): Promise<string> {
    const devHtmlPath = `index.html`;
    const productionHtmlPath = `dist/client/index.html`;
    let html = await fs.readFile(this.$app.resolve(App.isProd ? productionHtmlPath : devHtmlPath), "utf-8");
    html = await this.$app.vite.transformIndexHtml(this.url, html);
    return html.replace(SpaRendererService.HEAD_INJECTION, await this._getHeadIncludes());
  }

  private async _getRenderers() {
    let productionBuildPath = this.$app.resolve("./dist/server/entry-server.mjs");
    let devBuildPath = this.$app.resolve("./src/client/entry-server.tsx");
    return await this.$app.vite.ssrLoadModule(App.isProd ? productionBuildPath : devBuildPath);
  }

  private async _renderToString(html: string): Promise<string> {
    const { renderToString } = await this._getRenderers();

    return html.replace(SpaRendererService.BODY_INJECTION, await renderToString(this.url));
  }

  private async _renderToStream(html: string): Promise<Minipass> {
    const { renderToStream } = await this._getRenderers();
    const [head, foot] = html.split(SpaRendererService.BODY_INJECTION);
    const output = new Minipass();

    output.write(head);
    renderToStream(this.url, output, () => output.write(foot));

    return output;
  }

  private async _render() {
    const html = await this._getIndexHtml();

    return this._type === RENDER_TYPE.STREAM ? this._renderToStream(html) : this._renderToString(html);
  }

  static render(type: RENDER_TYPE, request: FastifyRequest) {
    const instance = new this(type, request);
    return instance._render();
  }
}
