import { describe, expect, test } from "vitest";
import bootstrap from "@/app";

describe("SERVER", async () => {
  const app = await bootstrap();

  test("should be testable", async () => {
    const response = await app.inject({ method: "get", url: "/api" });
    expect(response.statusCode).toBe(200);
    expect(response.json().foo).toBe("bar");
  });
});
