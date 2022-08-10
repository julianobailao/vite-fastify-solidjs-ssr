import { Accessor, createContext, JSX } from "solid-js";
import { createStoredSignal } from "../hooks/createStoredSignal";

export const CounterContext = createContext<{
  count: Accessor<number>;
  increment(): void;
  decrement(): void;
}>();

export function CounterProvider(props: { children: JSX.Element }) {
  const [count, setCount] = createStoredSignal<number>("count", 0);

  const counter = {
    count,
    increment() {
      setCount(count => count++);
    },
    decrement() {
      setCount(count => count--);
    },
  };

  return <CounterContext.Provider value={counter}>{props.children}</CounterContext.Provider>;
}
