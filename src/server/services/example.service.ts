import { ORIGIN } from "@shared/enums/origin.enum";
import type { ExampleDTO } from "@shared/dtos/example.dto";

export class ExampleService {
  getData(origin: ORIGIN): ExampleDTO {
    return { foo: "bar", origin, date: new Date() };
  }
}
