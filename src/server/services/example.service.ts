import { ExampleDTO, ORIGIN } from "../../shared/dtos/example.dto";

export class ExampleService {
  getData(origin: ORIGIN): ExampleDTO {
    return { foo: "bar", origin };
  }
}
