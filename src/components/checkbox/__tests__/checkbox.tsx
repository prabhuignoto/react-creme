import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { CheckBox } from "../checkbox";

const handler = jest.fn();

describe("Checkbox", () => {
  it("should render default", () => {
    const { container } = render(<CheckBox label="My Checkbox" />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render disabled", () => {
    const { container } = render(<CheckBox label="My Checkbox" disabled />);

    expect(container.firstChild).toHaveClass("checkbox-disabled");
  });

  it("should render default prop isChecked", () => {
    const { container } = render(<CheckBox label="My Checkbox" isChecked />);

    expect(container.querySelector(".checkbox-icon")).toHaveClass(
      "checkbox-checked"
    );
  });

  it("should call the handler", () => {
    const { getByText } = render(
      <CheckBox label="My Checkbox" onChange={handler} />
    );

    fireEvent.click(getByText("My Checkbox"));

    expect(handler).toBeCalled();
    expect(handler).toHaveBeenCalledWith(true);
  });
});
