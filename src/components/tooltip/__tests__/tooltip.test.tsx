import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { Tooltip } from "../tooltip";

describe("Tooltip", () => {
  it("Should render tooltip", () => {
    const { getByRole } = render(
      <Tooltip position="top center" message="this is a test tooltip">
        <span>content</span>
      </Tooltip>
    );

    expect(getByRole("tooltip")).toBeInTheDocument();
  });

  it("Should show/hide tooltip on hover", async () => {
    const { getByRole } = render(
      <Tooltip position="top center" message="this is a test tooltip">
        <span>content</span>
      </Tooltip>
    );

    const hostContent = getByRole("tooltip").querySelector(
      ".tooltip-host-content"
    );
    const message = getByRole("tooltip").querySelector(".tooltip-message");

    if (hostContent && message) {
      await act(async () => {
        fireEvent.mouseEnter(hostContent);
      });

      await waitFor(
        async () => {
          expect(message).toHaveClass("show-tooltip");
        },
        {
          timeout: 1500,
        }
      );

      await act(async () => {
        fireEvent.mouseLeave(hostContent);
      });

      await waitFor(
        async () => {
          expect(message).toHaveClass("hide-tooltip");
        },
        {
          timeout: 1500,
        }
      );
    }
  });
});
