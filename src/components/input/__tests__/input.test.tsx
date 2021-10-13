import { act, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { Input } from "../input";

const handler = jest.fn();

describe("Input", () => {
  it("should render default", () => {
    const { container } = render(<Input />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("should receive focus", async () => {
    const { getByPlaceholderText, container } = render(<Input />);

    const input = getByPlaceholderText("Please enter a value ...");

    await act(async () => {
      fireEvent.click(input);
    });

    expect(container.firstChild).toHaveClass("focus");
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
    const { getByRole } = render(<Input onChange={handler} enableClear />);

    await act(async () => {
      fireEvent.mouseDown(getByRole("button"));
    });

    await act(async () => new Promise((resolve) => setTimeout(resolve, 100)));

    expect(handler).toBeCalledWith("");
  });
});
