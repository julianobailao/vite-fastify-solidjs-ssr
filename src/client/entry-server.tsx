import { renderToString } from "solid-js/web";
import { App } from "./App";
import "./index.css";

export async function render(url: string) {
  return renderToString(() => <App />);
}
