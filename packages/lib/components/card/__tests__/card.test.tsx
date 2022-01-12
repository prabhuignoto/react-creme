import { render } from "@testing-library/react";
import React from "react";
import { Card } from "../card";

describe("Card", () => {
  it("should render a basic card", () => {
    const { container } = render(<Card />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render header and footer", () => {
    const { container, getByText } = render(
      <Card header={<span>header</span>} footer={<span>footer</span>} />
    );

    expect(container.firstChild).toBeInTheDocument();

    expect(getByText("header")).toBeInTheDocument();
    expect(getByText("footer")).toBeInTheDocument();
  });
});
