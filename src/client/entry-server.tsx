import { renderToString as solidRenderToString, renderToStream as solidRenderToStream } from "solid-js/web";
import { ORIGIN } from "@shared/dtos/example.dto";
import entry from "./entry";

export async function renderToString(url: string) {
  return solidRenderToString(() => entry(ORIGIN.SERVER));
}

export async function renderToStream(
  url: string,
  writable: {
    write: (v: string) => void;
  },
  done: CallableFunction,
) {
  solidRenderToStream(() => entry(ORIGIN.SERVER), {
    onCompleteAll() {
      done();
    },
  }).pipe(writable);

  return writable;
}
