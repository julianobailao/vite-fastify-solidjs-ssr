"use strict";
import { FastifyRequest, FastifyReply } from "fastify";
import { ExampleService } from "../services/example.service";

/**
 * List of API examples.
 * @route GET /api
 */
export const getApi = async (req: FastifyRequest, res: FastifyReply) => {
  const service = new ExampleService();
  return res.status(200).send(service.getData());
};
