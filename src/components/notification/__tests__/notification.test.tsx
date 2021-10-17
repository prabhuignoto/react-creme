import { act, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { Notification } from "../notification";

describe("Drawer", () => {
  it("should render the notification", () => {
    const { getByRole, getByText } = render(
      <Notification width={400} position="top-left" title="test notification">
        <span>content</span>
      </Notification>
    );

    expect(getByRole("dialog")).toBeInTheDocument();
    expect(getByRole("dialog")).toHaveStyle("--min-width: 400px");
    expect(getByText("content")).toBeInTheDocument();
  });

  it("should close the notification", async () => {
    const { container, queryByRole, getByRole } = render(
      <Notification position="bottom-left" title="test notification">
        <span>content</span>
      </Notification>
    );

    await act(async () => {
      fireEvent.keyUp(getByRole("dialog"), {
        key: "Escape",
        keyCode: "Escape",
      });
    });

    await waitFor(
      async () => {
        expect(queryByRole("dialog")).not.toBeInTheDocument();
      },
      {
        timeout: 1000,
      }
    );
  });
});
