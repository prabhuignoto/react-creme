import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Dropdown } from "../dropdown";

const options = [
  { name: "usa", value: "usa" },
  { name: "uk", value: "uk" },
  { name: "germany", value: "germany", disabled: true },
  { name: "india", value: "india" },
  { name: "srilanka", value: "srilanka" },
];

const handler = jest.fn();

describe("Dropdown", () => {
  it("should render the dropdown", () => {
    const { getByText, getByTestId } = render(
      <Dropdown options={options} placeholder="select a option" />
    );
    expect(getByText("select a option")).toBeInTheDocument();
    fireEvent.click(getByText("select a option"));
    expect(getByTestId("icon")).toBeInTheDocument();
    expect(getByTestId("icon")).toHaveClass("rc-dropdown-chevron-icon-rotate");
  });

  it("should handler be called", async () => {
    const { container } = render(
      <Dropdown
        options={options}
        placeholder="select a option"
        onSelected={handler}
      />
    );

    if (container) {
      const ele = container.querySelector(".rc-dropdown-value-container");

      if (ele) {
        fireEvent.click(ele);

        await waitFor(async () => {
          expect(screen.getByRole("listbox")).toBeInTheDocument();
          expect(screen.getAllByRole("option")).toHaveLength(5);

          const target = screen.getAllByRole("option")[0]?.firstChild;

          if (target) {
            fireEvent.click(target);

            await waitFor(async () => {
              expect(handler).toBeCalled();
            });
          }
        });
      }
    }
  });

  it("should auto close menu", async () => {
    const { container } = render(
      <Dropdown
        options={options}
        placeholder="select a option"
        onSelected={handler}
      />
    );

    if (container) {
      const ele = container.querySelector(".rc-dropdown-value-container");

      if (ele) {
        fireEvent.click(ele);

        await waitFor(async () => {
          expect(screen.getByRole("listbox")).toBeInTheDocument();
          expect(screen.getAllByRole("option")).toHaveLength(5);
        });
      }

      expect(screen.getByTestId("rc-overlay")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("rc-overlay"));

      await waitFor(async () => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    }
  });
});
