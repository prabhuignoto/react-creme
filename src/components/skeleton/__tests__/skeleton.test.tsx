import { render } from "@testing-library/react";
import React from "react";
import { Skeleton } from "../skeleton";

describe("Skeleton", () => {
  it("should render skeleton", () => {
    const { getByTestId } = render(<Skeleton rows={5} />);

    expect(getByTestId("rc-skeleton")).toBeInTheDocument();

    const children =
      getByTestId("rc-skeleton").querySelectorAll(".rc-skeleton-row");

    expect(children).toHaveLength(5);
  });

  it("should render skeleton blocks", () => {
    const { getByTestId } = render(<Skeleton rows={5} blocks={2} />);

    expect(getByTestId("rc-skeleton")).toBeInTheDocument();

    const children =
      getByTestId("rc-skeleton").querySelectorAll(".rc-skeleton-row");

    expect(children).toHaveLength(10);
  });

  it("should blink", () => {
    const { getByTestId } = render(<Skeleton rows={5} blink rowHeight={20} />);

    expect(getByTestId("rc-skeleton")).toBeInTheDocument();

    const children = getByTestId("rc-skeleton").children;

    expect(children[0].firstChild).toHaveClass("rc-skeleton-blink");
    // expect(children[0].firstChild).toHaveStyle("--height: 20px");
  });
});
