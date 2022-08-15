import Loader from "./Loader";
import AjaxDataLoader from "./AjaxDataLoader";

import { lazy, Suspense } from "solid-js";

const Greetings = lazy(async () => {
  // simulate delay
  await new Promise(r => setTimeout(r, 3000));
  return import("./Greetings");
});

export const SuspenseContent = () => {
  return (
    <>
      <div class="w-full p-5 rounded shadow bg-white font-sans m-5 mt-0">
        <Suspense fallback={<Loader />}>
          <Greetings />
        </Suspense>
      </div>
      <div class="w-full p-5 rounded shadow bg-white font-sans m-5 mt-0">
        <Suspense fallback={<Loader />}>
          <AjaxDataLoader />
        </Suspense>
      </div>
    </>
  );
};

export default SuspenseContent;
