import { Component } from "solid-js";
import Main from "@client/pages/Main";
import { Footer } from "@client/components/Footer";
import { CounterProvider } from "@client/contexts/counter";

export const App: Component = () => {
  return (
    <CounterProvider>
      <div class="bg-gray-200 h-screen font-sans flex align-bottom justify-center flex-col">
        <div class="flex-1 flex flex-col items-center justify-center">
          <Main />
        </div>
        <div class="flex-none">
          <Footer />
        </div>
      </div>
    </CounterProvider>
  );
};

export default App;
