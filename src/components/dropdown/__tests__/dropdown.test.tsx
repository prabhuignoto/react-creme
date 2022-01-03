import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Dropdown } from "../dropdown";

const options = [
  { name: "usa", value: "usa" },
  { name: "uk", value: "uk" },
  { name: "germany", value: "germany", disabled: true },
  { name: "india", value: "india", selected: false },
  { name: "sri lanka", value: "sri lanka", selected: false },
];

const options_selected = [
  { name: "usa", value: "usa" },
  { name: "uk", value: "uk" },
  { name: "germany", value: "germany", disabled: true },
  { name: "india", value: "india", selected: true },
  { name: "sri lanka", value: "sri lanka", selected: true },
];

const handler = jest.fn();

describe("Dropdown", () => {
  // it("should render the dropdown", () => {
  //   const { getByText, getByTestId } = render(
  //     <Dropdown options={options} placeholder="select a option" />
  //   );
  //   expect(getByText("select a option")).toBeInTheDocument();
  //   fireEvent.click(getByText("select a option"));
  //   expect(getByTestId("icon")).toBeInTheDocument();
  //   expect(getByTestId("icon")).toHaveClass("rc-dropdown-chevron-icon-rotate");
  // });

  it("should handler be called", async () => {
    const handler = jest.fn();
    const { container, getByText, getByRole, getAllByRole } = render(
      <Dropdown
        options={options}
        placeholder="select a option"
        onSelected={handler}
      />
    );

    expect(getByText("select a option")).toBeInTheDocument();

    userEvent.click(getByText("select a option"));

    await waitFor(async () => {
      expect(getByRole("listbox")).toBeInTheDocument();
      expect(getAllByRole("option")).toHaveLength(5);

      expect(getByText("germany")).toBeInTheDocument();

      userEvent.click(getByText("india"));

      expect(handler).toBeCalled();
    });
  });

  it("should auto close menu", async () => {
    const { container, getByRole, getAllByRole, getByText, queryByRole } =
      render(
        <Dropdown
          options={options}
          placeholder="select a option"
          onSelected={handler}
        />
      );

    expect(getByText("select a option")).toBeInTheDocument();

    fireEvent.click(getByText("select a option"));

    await waitFor(async () => {
      expect(getByRole("listbox")).toBeInTheDocument();
      expect(getAllByRole("option")).toHaveLength(5);
      expect(screen.getByTestId("rc-overlay")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("rc-overlay"));

    await waitFor(async () => {
      expect(queryByRole("listbox")).not.toBeInTheDocument();
    });
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
    expect(getByText("sri lanka")).toBeInTheDocument();
    fireEvent.click(getByText("sri lanka"));

    await waitFor(() => {
      expect(getByRole("listbox")).toBeInTheDocument();
    });
  });
});
