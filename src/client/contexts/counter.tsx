import { createContext, JSX } from "solid-js";
import { createStoragedStore } from "@client/hooks/createStoragedStore";

export type StateType = { count: number };

export const CounterContext = createContext<{
  state: StateType;
  increment(): void;
  decrement(): void;
}>();

export function CounterProvider(props: { children: JSX.Element }) {
  const { state, setState } = createStoragedStore<StateType>("count", { count: 0 });

  const counter = {
    state,
    increment() {
      setState("count", count => count + 1);
    },
    decrement() {
      setState("count", count => count + 1);
    },
  };

  return <CounterContext.Provider value={counter}>{props.children}</CounterContext.Provider>;
}
