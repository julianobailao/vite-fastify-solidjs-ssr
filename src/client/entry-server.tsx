import { renderToString as solidRenderToString, renderToStream as solidRenderToStream } from "solid-js/web";
import entry from "./entry";

export async function renderToString(url: string) {
  return solidRenderToString(() => entry());
}

export async function renderToStream(
  url: string,
  writable: {
    write: (v: string) => void;
  },
  done: CallableFunction,
) {
  solidRenderToStream(() => entry(), {
    onCompleteAll() {
      done();
    },
  }).pipe(writable);

  return writable;
}
