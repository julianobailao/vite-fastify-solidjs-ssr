import { describe, test } from "vitest";
import { ExampleService } from "../../../src/server/services/example.service";

describe("SERVER UNIT", () => {
  test("should be able to test a service", ({ expect }) => {
    const instance = new ExampleService();

    expect(instance instanceof ExampleService).toBeTruthy();
    expect(instance.getData().foo).toBe("bar");
  });
});
