import { ExampleService } from "@server/services/example.service";
import { ORIGIN } from "@shared/enums/origin.enum";
import { createResource } from "solid-js";
import { isServer } from "solid-js/web";

function createDelay() {
  const startedAt = new Date();
  return new Promise(resolve => {
    setTimeout(() => {
      if (isServer) {
        const service = new ExampleService();
        resolve({ startedAt, isServer, ...service.getData(ORIGIN.SERVER) });
      } else {
        fetch("http://localhost:7456/api")
          .then(response => response.json())
          .then(data => {
            resolve({ startedAt, isServer, ...data });
          });
      }
    }, 3500);
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
