"use strict";
import { FastifyRequest, FastifyReply } from "fastify";
import { ExampleDTO, ORIGIN } from "@shared/dtos/example.dto";
import { ExampleService } from "@server/services/example.service";

/**
 * List of API examples.
 * @route GET /api
 */
export const getApi = async (req: FastifyRequest, res: FastifyReply) => {
  const service = new ExampleService();
  return res.status(200).send(service.getData(ORIGIN.SERVER) as ExampleDTO);
};
