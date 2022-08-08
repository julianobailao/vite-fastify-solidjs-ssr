import { describe, expect, test } from "vitest";
import request from "./request";

describe("SERVER", async () => {
  test("should be testable", async () => {
    const response = await request.get("/api").expect("Content-Type", /json/).expect(200);
    expect(response.body.foo).toBe("bar");
  });
});
