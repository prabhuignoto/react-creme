import { render } from "@testing-library/react";
import React from "react";
import { Skeleton } from "../skeleton";

describe("Skeleton", () => {
  it("should render skeleton", () => {
    const { getByTestId } = render(<Skeleton rows={10} />);

    expect(getByTestId("rc-skeleton")).toBeInTheDocument();

    const children = getByTestId("rc-skeleton").children;

    expect(children).toHaveLength(10);
  });

  it("should blink", () => {
    const { getByTestId } = render(<Skeleton rows={5} blink rowHeight={20} />);

    expect(getByTestId("rc-skeleton")).toBeInTheDocument();

    const children = getByTestId("rc-skeleton").children;

    expect(children[0]).toHaveClass("rc-skeleton-blink");
    expect(children[0]).toHaveStyle("--height: 20px");
  });
});
