import { ORIGIN, ExampleDTO } from "@shared/dtos/example.dto";
import { GET, RequestHandler } from "fastify-decorators";
import { ExampleService } from "../services/example.service";

@GET({
  url: "/api",
})
export default class FirstHandler extends RequestHandler {
  async handle() {
    const service = new ExampleService();
    return this.reply.status(200).send(service.getData(ORIGIN.SERVER) as ExampleDTO);
  }
}
