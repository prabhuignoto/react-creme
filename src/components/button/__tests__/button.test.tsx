import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Button } from "../button";

const handler = jest.fn();

describe("Button", () => {
  it("should render default", () => {
    const { container } = render(<Button />);

    const button = container.firstChild;

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("button-comp");
  });

  it("should render border-less", () => {
    const { container } = render(<Button borderLess />);
    expect(container.firstChild).toHaveClass("button-comp-no-border");
  });

  it("should render label", () => {
    const { getByText } = render(<Button label="My Button" />);
    expect(getByText("My Button")).toBeInTheDocument();
  });

  it("should call handler", () => {
    const { getByText } = render(
      <Button label="My Button" onClick={handler} />
    );

    fireEvent.click(getByText("My Button"));

    expect(handler).toBeCalled();
  });
});
