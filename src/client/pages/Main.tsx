import { createSignal, onCleanup, onMount } from "solid-js";

const Main = () => {
  const [name, setName] = createSignal("");
  const [count, setCount] = createSignal(0);

  const interval = setInterval(() => setCount(c => c + 1), 1000);
  onCleanup(() => clearInterval(interval));

  const [foo, setFoo] = createSignal({});

  onMount(() => {
    fetch("/api")
      .then(res => res.json())
      .then(res => setFoo(res));
  });

  return (
    <div class="flex flex-col w-full items-center">
      <div class="inline-block xl:w-1/4 lg:w-1/3  p-5 rounded shadow bg-white font-sans m-5">
        <div class="flex items-center flex-col pt-10">
          <h1 class="font-bold text-gray-900 text-5xl lg:text-7xl text-center ">Hi{name() ? `, ${name()}` : ""}!</h1>
          <h2 class={"w-full p-5 items-center text-center min-w-[320px]"} style={{ color: "purple" }}>
            This is a Vite Solidjs SSR Tailwind boilerplate!
          </h2>
          <h3>Counter: {count()}</h3>

          <input
            placeholder={"Enter your name"}
            onkeyup={e => setName(e.currentTarget.value)}
            style={{ background: "#8080802e" }}
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-2xl border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
      <div class="inline-block xl:w-1/4 lg:w-1/3  p-5 rounded shadow bg-white font-sans m-5">
        <h3>Data loaded from ajax: {JSON.stringify(foo())}</h3>
      </div>
    </div>
  );
};

export default Main;
