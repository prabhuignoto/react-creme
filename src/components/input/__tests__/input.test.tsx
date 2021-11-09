import { act, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { Input } from "../input";

const handler = jest.fn();

describe("Input", () => {
  it("should render default", () => {
    const { getAllByRole } = render(<Input />);

    expect(getAllByRole("textbox")[0]).toBeInTheDocument();
    expect(getAllByRole("textbox")[0]).toHaveClass("rc-input-default");
  });

  it("should render state", () => {
    const { getAllByRole } = render(<Input state="error" />);

    expect(getAllByRole("textbox")[0]).toBeInTheDocument();
    expect(getAllByRole("textbox")[0]).toHaveClass("rc-input-error");
  });

  it("should call onchange", async () => {
    const { getByPlaceholderText } = render(<Input onChange={handler} />);
    const input = getByPlaceholderText("Please enter a value ...");

    await act(async () => {
      fireEvent.change(input, {
        target: {
          value: "test",
        },
      });
    });

    await act(async () => new Promise((resolve) => setTimeout(resolve, 100)));

    await act(async () => {
      fireEvent.keyUp(input, {
        key: "E",
      });
    });

    await waitFor(() => expect(handler).toBeCalled());
  });

  it("should clear work", async () => {
    const handler = jest.fn();
    const { getByRole } = render(<Input onChange={handler} enableClear />);

    await act(async () => {
      fireEvent.mouseDown(getByRole("button"));
    });

    await waitFor(async () => expect(handler).toBeCalledWith(""));
  });
});
