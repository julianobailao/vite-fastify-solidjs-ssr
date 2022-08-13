import type { ExampleDTO } from "@shared/dtos/example.dto";
import { ORIGIN } from "@shared/enums/origin.enum";
import { GET } from "fastify-decorators";
import { ExampleService } from "../services/example.service";
import BaseHandler from "./base-handler";

@GET({
  url: "/api",
})
export default class ApiHandler extends BaseHandler {
  async handle() {
    const service = new ExampleService();
    return this.reply.status(200).send(service.getData(ORIGIN.SERVER) as ExampleDTO);
  }
}
