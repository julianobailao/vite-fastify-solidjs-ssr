"use strict";
import { FastifyRequest, FastifyReply } from "fastify";

/**
 * List of API examples.
 * @route GET /api
 */
export const getApi = async (req: FastifyRequest, res: FastifyReply) => {
  return res.status(200).send({ foo: "bar" });
};
