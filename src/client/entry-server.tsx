import { renderToStringAsync } from "solid-js/web";
import { App } from "./App";

export async function render() {
  return await renderToStringAsync(() => <App />);
}
