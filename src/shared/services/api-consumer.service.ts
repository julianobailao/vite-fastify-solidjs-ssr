import { isServer } from "solid-js/web";
import { ExampleService } from "@server/services/example.service";
import { ORIGIN } from "../enums/origin.enum";
import { ExampleDTO } from "../dtos/example.dto";

export class ApiConsumerService {
  public static async getExampleData(): Promise<ExampleDTO> {
    const startedAt = new Date();
    return new Promise(resolve => {
      // simulate delay
      setTimeout(() => {
        if (isServer) {
          // TODO: Find a way to remove duplicated code on api controller
          const service = new ExampleService();
          resolve({ startedAt, ...service.getData(ORIGIN.SERVER) });
        } else {
          fetch("http://localhost:7456/api")
            .then(response => response.json())
            .then(data => {
              data.origin = ORIGIN[isServer ? "SERVER" : "CLIENT"];
              resolve({ startedAt, ...data });
            });
        }
      }, 3500);
    });
  }
}
