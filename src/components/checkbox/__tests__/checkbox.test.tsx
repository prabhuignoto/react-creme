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
    const { getByRole } = render(<CheckBox label="My Checkbox" disabled />);

    expect(getByRole("checkbox")).toHaveClass("rc-disabled");
  });

  it("should render default prop isChecked", () => {
    const { container } = render(<CheckBox label="My Checkbox" isChecked />);

    expect(container.querySelector(".rc-checkbox-icon")).toHaveClass(
      "rc-checkbox-checked"
    );
  });

  it("should call the handler", () => {
    const { getByRole } = render(
      <CheckBox label="My Checkbox" onChange={handler} />
    );

    fireEvent.click(getByRole("checkbox"));

    expect(handler).toBeCalled();
    expect(handler).toHaveBeenCalledWith(true);
  });
});
