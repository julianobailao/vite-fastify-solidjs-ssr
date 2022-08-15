import { createEffect, onMount } from "solid-js";
import { createStore } from "solid-js/store";

export function createStoragedStore<T extends {}>(key: string, defaultValue: T) {
  const [state, setState] = createStore<T>(defaultValue);

  onMount(() => setState(JSON.parse(localStorage.getItem(key)!) || defaultValue));

  createEffect(() => localStorage.setItem(key, JSON.stringify(state)));

  return { state, setState };
}
