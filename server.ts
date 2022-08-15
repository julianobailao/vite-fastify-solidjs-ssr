import "./aliases";
import { existsSync as checkDirectoryExists } from "fs";
import fs from "fs/promises";
import path from "path";
import fastify from "fastify";
import { bootstrap as fastifyDecorators } from "fastify-decorators";
import type { ViteDevServer } from "vite";
import { createServer as createViteServer } from "vite";
import fastifyMiddie from "@fastify/middie";
import { FastifyInstance as FastifyInstance } from "fastify";
import fp from "fastify-plugin";
// @ActionHandlers
import StreamExampleHandler from "@server/handlers/stream-example.handler";
import SpaRendererHandler from "@server/handlers/spa-render.handler";
import ApiHandler from "@server/handlers/api.handler";

const root = __dirname;
const pathResolve = (p: string) => path.resolve(root, p);

export type NextFunction = (err?: any) => void;

export interface ServerInstance extends FastifyInstance {
  $app: App;
}

export class App {
  private _web!: FastifyInstance;
  private _vite!: ViteDevServer;
  private _assetDirectory!: string;
  private _isRunning = false;
  private _port!: number;
  private _host!: string;

  private constructor() {
    this._web = fastify({ logger: !App.isProd && !App.isTest });
    this._assetDirectory = this.resolve(!App.isProd ? "./dist/assets" : "assets");
  }

  public resolve(p: string) {
    return pathResolve(p);
  }

  private async registerMiddlewares() {
    await this._web.register(fastifyMiddie);
  }

  private async startViteServer() {
    this._vite = await createViteServer({
      root,
      server: { middlewareMode: true },
      appType: "custom",
      logLevel: App.isTest ? "error" : "info",
    });
    this._web.use(this._vite.middlewares);
  }

  private async registerAppDecorate() {
    await this._web.register(
      fp((instance: FastifyInstance, options: unknown, done: NextFunction) => {
        instance.decorate("$app", this as App);
        done();
      }),
    );
  }

  private async registerFastifyDecorators() {
    await this._web.register(fastifyDecorators, {
      controllers: [ApiHandler, SpaRendererHandler, StreamExampleHandler],
    });
  }

  private async registerStaticServer() {
    const enabledCompression = App.isProd && !!process.env.ENABLED_COMPRESSION;
    if (checkDirectoryExists(this._assetDirectory))
      await this._web.register(require("@fastify/static"), {
        root: this._assetDirectory,
        prefix: "/assets/",
        preCompressed: enabledCompression,
      });

    if (enabledCompression) await this._web.register(import("@fastify/compress"), { encodings: ["br", "gzip"] });
  }

  public async up(port = process.env.PORT || 7456, host = process.env.HOST || "0.0.0.0") {
    if (this._isRunning) throw new Error(`Application is already running on port: ${this._port}`);

    this._port = Number(port);
    this._host = host;

    await this._web.listen({ port: this._port, host: this._host }, () => {
      this._isRunning = true;
      console.log(`App is listening on port: ${port}`);
    });
  }

  public static get isProd() {
    console.log(process.env.NODE_ENV);
    return process.env.NODE_ENV === "production";
  }

  public static get isTest() {
    return process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
  }

  public get vite(): ViteDevServer {
    return this._vite as ViteDevServer;
  }

  public get web(): ServerInstance {
    return this._web as ServerInstance;
  }

  public get port(): number {
    return this._port;
  }

  public get host(): string {
    return this._host;
  }

  public async getStyleSheets(): Promise<string | undefined> {
    const assetpath = this.resolve("dist/assets");
    if (!checkDirectoryExists(assetpath)) return;

    const files = await fs.readdir(assetpath);
    const cssAssets = files.filter(l => l.endsWith(".css"));
    const allContent: string[] = [];

    for (const asset of cssAssets) {
      const content = await fs.readFile(path.join(assetpath, asset), "utf-8");
      allContent.push(`<style type="text/css">${content}</style>`);
    }

    return allContent.join("\n");
  }

  private static _instance: App;

  public static async bootstrap() {
    if (!this._instance) {
      this._instance = new App();
      await this._instance.registerMiddlewares();
      await this._instance.startViteServer();
      await this._instance.registerAppDecorate();
      await this._instance.registerFastifyDecorators();
      await this._instance.registerStaticServer();
      await this._instance.up();
    }

    return this._instance;
  }

  public static async initialize() {
    if (App.isTest) return;

    return await App.bootstrap();
  }
}

App.initialize();
