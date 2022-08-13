import axios from "axios";
import { createResource } from "solid-js";

function createDelay() {
  const startedAt = new Date();
  return new Promise(resolve => {
    setTimeout(() => axios.get("http://localhost:7456/api").then(({ data }) => resolve({ startedAt, ...data })), 3500);
  });
}

const AjaxDataLoader = () => {
  const [data] = createResource("data", createDelay);
  return (
    <>
      <h3>Data loaded from /api:</h3>
      <pre class="bg-gray-800 text-white p-3 mt-2 rounded">
        <code>{JSON.stringify(data(), null, 2)}</code>
      </pre>
    </>
  );
};

export default AjaxDataLoader;
