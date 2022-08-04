import { describe, expect, test } from "vitest";
import request from "supertest";
import createServer from "../../../app";

describe("SERVER", async () => {
  const { app } = await createServer();

  test("should be testable", async () => {
    const response = await request(app).get("/api").expect("Content-Type", /json/).expect(200);
    expect(response.body.foo).toBe("bar");
  });
});
