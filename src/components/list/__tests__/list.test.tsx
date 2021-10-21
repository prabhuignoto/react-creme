import { act, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { List } from "../list";

const handler = jest.fn();

const options = [
  { name: "usa", value: "usa" },
  { name: "uk", value: "uk" },
  { name: "germany", value: "germany", disabled: true },
  { name: "pakistan", value: "pakistan" },
  { name: "srilanka", value: "srilanka" },
  { name: "india", value: "india" },
];

describe("List", () => {
  it("should render list", () => {
    const { getByRole } = render(<List options={options} />);

    expect(getByRole("listbox")).toBeInTheDocument();
    expect(getByRole("listbox").querySelectorAll("li")).toHaveLength(6);
  });

  it("should call handler", async () => {
    const { getByRole } = render(
      <List options={options} onSelection={handler} />
    );
    const target = getByRole("listbox").querySelectorAll("li")[0]
      .firstChild as HTMLElement;

    if (target) {
      await act(async () => {
        fireEvent.click(target);
      });

      await waitFor(async () => {
        expect(handler).toBeCalled();
      });
    }
  });

  it("should handle search", async () => {
    const { container, getByRole } = render(<List options={options} />);

    const input = container.querySelector(".rc-input input[type='text'");

    if (input) {
      expect(input).toBeInTheDocument();

      await act(async () => {
        fireEvent.change(input, {
          target: {
            value: "usa",
          },
        });
      });

      await waitFor(
        async () => {
          expect(getByRole("listbox").querySelectorAll("li")).toHaveLength(1);
        },
        {
          timeout: 500,
        }
      );

      await act(async () => {
        fireEvent.change(input, {
          target: {
            value: "",
          },
        });
      });

      await waitFor(
        async () => {
          expect(getByRole("listbox").querySelectorAll("li")).toHaveLength(6);
        },
        {
          timeout: 500,
        }
      );
    }
  });

  it("should render multi selection", async () => {
    const { getByRole, getAllByRole } = render(
      <List options={options} allowMultipleSelection onSelection={handler} />
    );

    expect(getByRole("listbox")).toBeInTheDocument();
    expect(getAllByRole("checkbox")).toHaveLength(6);

    fireEvent.click(getAllByRole("checkbox")[0]);
    expect(handler).toBeCalled();
  });
});
