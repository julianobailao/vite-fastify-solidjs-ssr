import { hydrate } from "solid-js/web";
import entry from "./entry";

hydrate(() => entry(), document.getElementById("app")!);
