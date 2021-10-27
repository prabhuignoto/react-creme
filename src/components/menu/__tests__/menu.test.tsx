import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { Menu } from "../menu";
import { MenuItemModel } from "../menu-model";

const onSelected = jest.fn();

const items: MenuItemModel[] = [
  { name: "one" },
  { name: "two" },
  { name: "three", disabled: true },
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
    fireEvent.click(getByText("one"));
    expect(onSelected).toBeCalledWith("one");
  });

  it("should menu toggle", () => {
    const { getByText, getByRole } = render(
      <Menu items={items} onSelected={onSelected}>
        <span>icon</span>
      </Menu>
    );

    fireEvent.click(getByText("icon"));
    expect(getByRole("menu")).toHaveClass("rc-menu-open");

    fireEvent.click(getByText("icon"));
    expect(getByRole("menu")).toHaveClass("rc-menu-close");
  });

  it("should not select the disabled item", async () => {
    const handler = jest.fn();

    const { getByText, getByRole } = render(
      <Menu items={items} onSelected={handler}>
        <span>icon</span>
      </Menu>
    );

    await act(async () => {
      fireEvent.click(getByText("three"));
      expect(handler).not.toBeCalled();
    });
  });
});
