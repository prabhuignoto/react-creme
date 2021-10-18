import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Menu } from "../menu";
import { MenuItemModel } from "../menu-model";

const onSelected = jest.fn();

const items: MenuItemModel[] = [
  { name: "one" },
  { name: "two" },
  { name: "three" },
];

describe("Menu", () => {
  it("should render the host component", async () => {
    const { getByText, container } = render(
      <Menu items={items}>
        <span>icon</span>
      </Menu>
    );

    expect(getByText("icon")).toBeInTheDocument();
  });

  it("should onSelection work as expected", async () => {
    const { getByText } = render(
      <Menu items={items} onSelected={onSelected}>
        <span>icon</span>
      </Menu>
    );
    fireEvent.mouseDown(getByText("one"));
    expect(onSelected).toBeCalledWith("one");
  });

  it("should menu toggle", () => {
    const { getByText, getByRole } = render(
      <Menu items={items} onSelected={onSelected}>
        <span>icon</span>
      </Menu>
    );

    fireEvent.mouseDown(getByText("icon"));
    expect(getByRole("menu")).toHaveClass("rc-menu-open");

    fireEvent.mouseDown(getByText("icon"));
    expect(getByRole("menu")).toHaveClass("rc-menu-close");
  });
});
