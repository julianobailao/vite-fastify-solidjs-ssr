import { createResource } from "solid-js";
import { ApiConsumerService } from "@shared/services/api-consumer.service";
import { ExampleDTO } from "@root/src/shared/dtos/example.dto";

const AjaxDataLoader = () => {
  const [data] = createResource<ExampleDTO>(ApiConsumerService.getExampleData);

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
