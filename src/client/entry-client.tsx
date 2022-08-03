import { createRoot, getOwner } from "solid-js";
import { hydrate, render } from "solid-js/web";
import { App } from "./App";
import "./index.css";

const container = document.getElementById("app");

const FullApp = () => {
  return (
    <div>
      <App />
    </div>
  );
};

// @ts-ignore
if (import.meta.hot) {
  render(() => <FullApp />, container!);
} else {
  hydrate(() => <FullApp />, container!);
}
