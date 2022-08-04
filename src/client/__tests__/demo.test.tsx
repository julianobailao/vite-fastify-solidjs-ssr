import { describe, expect, test } from "vitest";
import { render } from "solid-testing-library";
import { Footer } from "../components/Footer";

describe("CLIENT", () => {
  test("should be testable", () => {
    expect(1 + 1).toBe(2);
  });

  test("should be able to test component", () => {
    const { getByText } = render(() => <Footer />);
    expect(getByText("Repo")).toMatchSnapshot();
  });
});
