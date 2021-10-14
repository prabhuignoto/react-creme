import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { MenuBar } from "../menubar";

const items = [
  { name: "File", menu: [{ name: "open" }, { name: "close" }] },
  {
    name: "Edit",
    menu: [
      { name: "cut" },
      { name: "copy", disabled: true },
      { name: "paste" },
    ],
  },
  { name: "Selection", menu: [{ name: "mars" }, { name: "moon" }] },
];

const handler = jest.fn();

describe("Menubar", () => {
  it("should render Menubar", () => {
    const { getByRole } = render(<MenuBar items={items} />);

    expect(getByRole("menubar")).toBeInTheDocument();
    expect(
      getByRole("menubar").querySelectorAll(".menu-bar-item-wrapper")
    ).toHaveLength(3);
  });

  it("should open Menu", () => {
    const { getByText, getByRole } = render(<MenuBar items={items} />);

    fireEvent.click(getByText("File"));

    expect(getByRole("menubar").querySelectorAll("li")[0]).toHaveClass(
      "menu-bar-item-active"
    );

    fireEvent.click(getByText("File"));

    expect(getByRole("menubar").querySelectorAll("li")[0]).not.toHaveClass(
      "menu-bar-item-active"
    );
  });

  it("should call the handler", () => {
    const { getByText } = render(
      <MenuBar items={items} onSelected={handler} />
    );

    const copy = getByText("copy");

    if (copy && copy.parentElement) {
      fireEvent.mouseDown(copy.parentElement);
    }

    expect(handler).toBeCalledWith("Edit>copy");
  });

  it("should close on blur event", () => {
    const { getByRole, getByText, baseElement } = render(
      <MenuBar items={items} onSelected={handler} />
    );

    fireEvent.click(getByText("File"));

    expect(getByRole("menubar")).toHaveFocus();
  });
});