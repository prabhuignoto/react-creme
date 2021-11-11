import { act, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { MenuButton } from "../menu-button";

describe("Menu Button", () => {
  it("should render the Menu button", () => {
    const { getByText } = render(
      <MenuButton
        items={["save", "cancel", "delete"]}
        label="Choose an option"
        position="right"
        width={150}
      />
    );

    expect(getByText("Choose an option")).toBeInTheDocument();
  });

  it("should open menu on click", async () => {
    const handler = jest.fn();
    const { getByRole, getByText } = render(
      <MenuButton
        items={["save", "cancel", "delete"]}
        label="Choose an option"
        position="right"
        width={150}
        onChange={handler}
      />
    );

    await act(async () => {
      fireEvent.click(getByRole("img"));
    });

    await waitFor(async () => {
      expect(getByRole("menu")).toBeInTheDocument();
      expect(getByText("save")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(getByText("save"));
      expect(handler).toBeCalledWith("save");
    });
  });
});
