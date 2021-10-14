import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { DropDownMenu } from "../dropdown-menu";
import { MenuOption } from "../dropdown-model";
import { DropdownMenuStyleModel } from "./../dropdown-model";

const options: MenuOption[] = [
  { name: "option1", value: "option1", visible: true, id: "123" },
  { name: "option2", value: "option2", visible: true, id: "345" },
];

const handler = jest.fn();

const menuStyle: DropdownMenuStyleModel = {
  maxMenuHeight: 300,
  top: 10,
  width: 200,
};

describe("Dropdown menu", () => {
  it("should render dropdown menu", async () => {
    const { getByRole } = render(
      <DropDownMenu
        options={options}
        handleSelection={handler}
        open
        style={menuStyle}
      />
    );

    expect(getByRole("listbox")).toBeInTheDocument();

    await waitFor(
      async () => {
        expect(getByRole("listbox").parentElement).toHaveFocus();
      },
      { timeout: 500 }
    );
  });

  it("should call the handler", () => {
    const { getAllByRole } = render(
      <DropDownMenu
        options={options}
        handleSelection={handler}
        open
        style={menuStyle}
      />
    );

    fireEvent.click(getAllByRole("option")[0]);

    expect(handler).toBeCalledWith("option1", "123");
  });
});
