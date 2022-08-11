import { Component } from "solid-js";
import Main from "@client/pages/Main";
import { Footer } from "@client/components/Footer";
import { ExampleDTO } from "@shared/dtos/example.dto";
import { CounterProvider } from "@client/contexts/counter";

export const App: Component<ExampleDTO> = (props: ExampleDTO) => {
  return (
    <CounterProvider>
      <div class="bg-gray-200 h-screen font-sans flex align-bottom justify-center flex-col">
        <div class="flex-1 flex flex-col items-center justify-center">
          <Main />
          <div class="inline-block xl:w-1/4 lg:w-1/3  p-5 rounded shadow bg-white font-sans m-3">
            <h3>Data loaded from SSR: {JSON.stringify(props)}</h3>
          </div>
        </div>
        <div class="flex-none">
          <Footer />
        </div>
      </div>
    </CounterProvider>
  );
};

export default App;
