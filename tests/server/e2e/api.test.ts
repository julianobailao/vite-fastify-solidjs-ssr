import { describe, expect, test } from "vitest";
import { App } from "@root/server";

describe("SERVER", async () => {
  const { web: server } = await App.bootstrap();

  test("should be testable", async () => {
    const response = await server.inject({ method: "get", url: "/api" });
    expect(response.statusCode).toBe(200);
    expect(response.json().foo).toBe("bar");
  });
});
