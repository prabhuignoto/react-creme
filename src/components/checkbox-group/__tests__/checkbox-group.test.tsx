import { render } from "@testing-library/react";
import React from "react";
import { CheckBoxGroup } from "../checkbox-group";

const options = [
  {
    label: "Option 1",
  },
  {
    label: "Option 2",
    isChecked: true,
  },
  {
    label: "Option 3",
    disabled: true,
  },
];

describe("CheckboxGroup", () => {
  it("should render checkbox group", () => {
    const { getByRole, getByText, getAllByRole } = render(
      <CheckBoxGroup options={options} />
    );

    expect(getByText("Option 1")).toBeInTheDocument();
    expect(getByText("Option 2")).toBeInTheDocument();
    expect(getByText("Option 3")).toBeInTheDocument();

    expect(getByRole("group")).toBeInTheDocument();

    expect(getAllByRole("checkbox")).toHaveLength(3);
  });

  it("should match snapshot", () => {
    const { container } = render(<CheckBoxGroup options={options} />);

    expect(container).toMatchSnapshot();
  });

  it("should check for isChecked", () => {
    const { getAllByRole } = render(<CheckBoxGroup options={options} />);

    expect(getAllByRole("checkbox")[1]).toBeChecked();
  });

  it("check for disabled option", () => {
    const { getAllByRole } = render(<CheckBoxGroup options={options} />);

    expect(getAllByRole("checkbox")[2]).toHaveAttribute(
      "aria-disabled",
      "true"
    );
  });
});
