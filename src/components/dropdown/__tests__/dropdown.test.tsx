import { fireEvent, render, waitFor } from "@testing-library/react";
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
    const { getAllByRole } = render(
      <Dropdown
        options={options}
        placeholder="select a option"
        onSelected={handler}
      />
    );
    const usa = getAllByRole("option")[0].firstChild;

    if (usa) {
      fireEvent.click(usa);
      await waitFor(
        async () => {
          expect(handler).toBeCalledWith("usa");
        },
        { timeout: 500 }
      );
    }
  });
  it("should menu auto close", async () => {
    const { getByText, getByTestId } = render(
      <Dropdown options={options} placeholder="select" />
    );
    const text = getByText("select");
    fireEvent.click(text);
    await waitFor(
      async () => {
        expect(getByTestId("icon")).toHaveClass(
          "rc-dropdown-chevron-icon-rotate"
        );
      },
      {
        timeout: 1200,
      }
    );
    if (text?.parentElement?.parentElement) {
      fireEvent.blur(text.parentElement.parentElement);
    }
    await waitFor(
      async () => {
        expect(getByTestId("icon")).not.toHaveClass(
          "rc-dropdown-chevron-icon-rotate"
        );
      },
      {
        timeout: 1200,
      }
    );
  });
});
