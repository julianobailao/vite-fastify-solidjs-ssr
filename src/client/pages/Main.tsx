import { createSignal, onCleanup } from "solid-js";
import { Footer } from "../components/Footer";

const Main = () => {
  const [count, setCount] = createSignal(0),
    timer = setInterval(() => setCount(count() + 1), 1000);

  onCleanup(() => clearInterval(timer));

  const setUp = (e: MouseEvent) => {
    e.preventDefault();
    setCount(count() + 1);
  };

  return (
    <div class="flex bg-white-100 font-sans items-center flex-col justify-between h-screen">
      <h2>Paginas</h2>
      <button onClick={setUp}>Up</button>
      <h3>{count()}</h3>
      <Footer />
    </div>
  );
};

export default Main;
