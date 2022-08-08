import { hydrate } from "solid-js/web";
import { App } from "./App";
import "./index.css";

hydrate(() => <App />, document.getElementById("app")!);
