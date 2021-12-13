import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
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

    expect(getByRole("button")).toHaveClass("rc-disabled");

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

  it("should call handler via keyboard action", async () => {
    const { getByText } = render(
      <Button label="My Button" onClick={handler} />
    );

    await act(async () => {
      fireEvent.keyDown(getByText("My Button"), { key: "Enter" });
    });

    await waitFor(() => {
      expect(handler).toBeCalled();
    });
  });

  it("should have focus", () => {
    const { getByRole } = render(
      <Button label="My Button" onClick={handler} focusable />
    );

    fireEvent.focus(getByRole("button"));

    expect(getByRole("button")).toHaveAttribute("tabIndex", "0");
  });
});
