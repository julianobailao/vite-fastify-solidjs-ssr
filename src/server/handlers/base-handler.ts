import type { FastifyReply, FastifyRequest } from "fastify";
import { RequestHandler } from "fastify-decorators";

export default abstract class BaseHandler extends RequestHandler {
  constructor(request: FastifyRequest, reply: FastifyReply) {
    super(request, reply);
  }

  abstract handle(): void | Promise<unknown>;
}
