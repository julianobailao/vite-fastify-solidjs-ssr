import { lazy, createSignal, onCleanup, Suspense, useContext } from "solid-js";
import { CounterContext } from "@client/contexts/counter";
import SuspenseContent from "../components/SuspenseContent";

const Main = () => {
  const { state, increment } = useContext(CounterContext)!;
  const [name, setName] = createSignal("");

  const interval = setInterval(() => increment(), 1000);
  onCleanup(() => clearInterval(interval));

  return (
    <div class="flex flex-col w-full items-center">
      <div class="inline-block xl:w-1/4 lg:w-1/3  p-5 rounded shadow bg-white font-sans m-5">
        <div class="flex items-center flex-col pt-10">
          <h1 class="font-bold text-gray-900 text-5xl lg:text-7xl text-center ">Hi{name() ? `, ${name()}` : ""}!</h1>

          <h2 class={"w-full p-5 items-center text-center min-w-[320px]"} style={{ color: "purple" }}>
            This sis a Vite Solidjs SSR Tailwind boilerplate!
          </h2>
          <h3>Counter: {state.count}</h3>

          <input
            placeholder={"Enter your name"}
            onKeyUp={e => setName(e.currentTarget.value)}
            style={{ background: "#8080802e" }}
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-2xl border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
      <SuspenseContent />
    </div>
  );
};

export default Main;
