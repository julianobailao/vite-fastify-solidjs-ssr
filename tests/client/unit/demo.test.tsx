import { describe, test } from "vitest";
import { render } from "solid-testing-library";
import { Footer } from "@client/components/Footer";

describe("CLIENT UNIT", () => {
  test("should be testable", ({ expect }) => {
    expect(1 + 1).toBe(2);
  });

  test("should be able to test component", ({ expect }) => {
    const { getByText, unmount } = render(() => <Footer />);
    expect(getByText("Repo")).toMatchSnapshot();
    unmount();
  });
});
