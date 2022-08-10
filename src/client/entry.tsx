import { ExampleService } from "../server/services/example.service";
import { ExampleDTO, ORIGIN } from "../shared/dtos/example.dto";
import { App } from "./App";
import "./index.css";

export default function entry(origin: ORIGIN) {
  const exampleService = new ExampleService();
  const data: ExampleDTO = exampleService.getData(origin);

  return <App {...data} />;
}
