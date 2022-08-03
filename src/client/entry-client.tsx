import { isServer } from "solid-js/web";
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
if (isServer) {
  hydrate(() => <FullApp />, container!);
} else {
  render(() => <FullApp />, container!);
}
