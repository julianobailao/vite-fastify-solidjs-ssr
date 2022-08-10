import { renderToString } from "solid-js/web";
import { ORIGIN } from "../shared/dtos/example.dto";
import entry from "./entry";

export async function render(url: string) {
  console.log("url", url);
  return renderToString(() => entry(ORIGIN.SERVER));
}
