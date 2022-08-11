import { createEffect, createSignal, onMount, Signal } from "solid-js";

export function createStoragedSignal<T>(key: string, defaultValue: T): Signal<T> {
  const [value, setValue] = createSignal<T>(defaultValue);

  onMount(() => setValue(JSON.parse(localStorage.getItem(key)!) || defaultValue));

  createEffect(() => localStorage.setItem(key, JSON.stringify(value())));

  return [value, setValue];
}
