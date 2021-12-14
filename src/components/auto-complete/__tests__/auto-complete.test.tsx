import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { AutoComplete } from "../auto-complete";

const suggestions = ["one", "two", "three", "four", "five"];

describe("AutoComplete", () => {
  it("should render auto complete", () => {
    const { getByTestId } = render(<AutoComplete suggestions={suggestions} />);
    expect(getByTestId("rc-auto-complete")).toBeInTheDocument();
  });

  it("should render auto complete with placeholder", () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <AutoComplete suggestions={suggestions} placeholder="placeholder" />
    );
    expect(getByTestId("rc-auto-complete")).toBeInTheDocument();
    expect(getByPlaceholderText("placeholder")).toBeInTheDocument();
  });

  it("should render suggestions", async () => {
    const { getByRole, getByPlaceholderText, getAllByRole } = render(
      <AutoComplete suggestions={suggestions} placeholder="enter input" />
    );

    userEvent.type(getByPlaceholderText("enter input"), "o");

    await waitFor(() => {
      expect(getByRole("listbox")).toBeInTheDocument();
      expect(getAllByRole("option")).toHaveLength(1);
    });
  });

  it("should show the selected item", async () => {
    const { getByRole, getByPlaceholderText, getByText } = render(
      <AutoComplete suggestions={suggestions} placeholder="enter input" />
    );

    userEvent.type(getByPlaceholderText("enter input"), "o");

    await waitFor(() => {
      expect(getByRole("listbox")).toBeInTheDocument();
      expect(getByText("one")).toBeInTheDocument();

      fireEvent.click(getByText("one"));

      expect(getByPlaceholderText("enter input")).toHaveValue("one");
    });
  });
});