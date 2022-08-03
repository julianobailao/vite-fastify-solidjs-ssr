"use strict";
import { Request, Response } from "express";

/**
 * List of API examples.
 * @route GET /api
 */
export const getApi = async (req: Request, res: Response) => {
  return res.json({ foo: "bar" }).status(200).end();
};
