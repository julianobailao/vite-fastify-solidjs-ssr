import { Component } from "solid-js";
import Main from "./pages/Main";
import { Footer } from "./components/Footer";

export const App: Component = () => {
  return (
    <div class="bg-gray-200 h-screen font-sans flex align-bottom justify-center flex-col">
      <div class="flex-1 flex items-center justify-center">
        <Main />
      </div>
      <div class="flex-none">
        <Footer />
      </div>
    </div>
  );
};

export default App;
