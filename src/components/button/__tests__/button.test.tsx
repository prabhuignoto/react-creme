import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Button } from "../button";

const handler = jest.fn();

describe("Button", () => {
  it("should render default", () => {
    const { container } = render(<Button />);

    const button = container.firstChild;

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("rc-btn-default");
  });

  it("should render label", () => {
    const { getByText } = render(<Button label="My Button" />);
    expect(getByText("My Button")).toBeInTheDocument();
  });

  it("should render size", () => {
    const { getByRole } = render(<Button label="My Button" size="lg" />);
    expect(getByRole("button")).toBeInTheDocument();
    expect(getByRole("button")).toHaveClass("rc-btn-lg");
  });

  it("should render button snapshot", () => {
    const { getByRole } = render(<Button label="My Button" />);
    expect(getByRole("button")).toMatchSnapshot();
  });

  it("should render disabled button", () => {
    const handler = jest.fn();

    const { getByRole } = render(
      <Button label="My Button" disabled onClick={handler} />
    );

    expect(getByRole("button")).toHaveClass("rc-btn-disabled");

    fireEvent.click(getByRole("button"));

    expect(handler).not.toBeCalled();
  });

  it("should call handler", () => {
    const { getByText } = render(
      <Button label="My Button" onClick={handler} />
    );

    fireEvent.click(getByText("My Button"));

    expect(handler).toBeCalled();
  });
});
