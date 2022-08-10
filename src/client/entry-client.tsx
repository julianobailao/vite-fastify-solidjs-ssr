import { hydrate } from "solid-js/web";
import { ORIGIN } from "@shared/dtos/example.dto";
import entry from "./entry";

hydrate(() => entry(ORIGIN.CLIENT), document.getElementById("app")!);
