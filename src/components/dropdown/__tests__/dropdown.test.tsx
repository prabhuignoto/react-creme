import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { Dropdown } from "../dropdown";

const options = [
  { name: "usa", value: "usa" },
  { name: "uk", value: "uk" },
  { name: "germany", value: "germany", disabled: true },
  { name: "india", value: "india", selected: false },
  { name: "srilanka", value: "srilanka", selected: false },
];

const options_selected = [
  { name: "usa", value: "usa" },
  { name: "uk", value: "uk" },
  { name: "germany", value: "germany", disabled: true },
  { name: "india", value: "india", selected: true },
  { name: "srilanka", value: "srilanka", selected: true },
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

  it("should render disabled", () => {
    const { getByText, container } = render(
      <Dropdown options={options} placeholder="select a option" disabled />
    );
    expect(getByText("select a option")).toBeInTheDocument();
    expect(container?.firstChild).toHaveClass("rc-dropdown-disabled");
    expect(container?.firstChild?.firstChild).toHaveAttribute(
      "aria-disabled",
      "true"
    );
    expect(container?.firstChild?.firstChild).toHaveAttribute("tabindex", "-1");
  });

  it("should render allowMultiSelection mode", async () => {
    const { getByText, getByRole } = render(
      <Dropdown
        options={options_selected}
        placeholder="select a option"
        allowMultiSelection
      />
    );
    expect(getByText("srilanka")).toBeInTheDocument();
    fireEvent.click(getByText("srilanka"));

    await waitFor(() => {
      expect(getByRole("listbox")).toBeInTheDocument();
    });
  });
});
