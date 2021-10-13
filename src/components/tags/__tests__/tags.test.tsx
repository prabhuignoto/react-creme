import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { Tags } from "../tags";
import { TagItemModel } from "../tags-model";

const onSelected = jest.fn();

const tags: TagItemModel[] = [
  { name: "one" },
  { name: "two" },
  { name: "three" },
];

const tagsWithDisabled: TagItemModel[] = [
  { name: "one" },
  { name: "two", disabled: true },
];

describe("Tags", () => {
  it("Should render default", () => {
    const {
      getByText,
      container: { firstChild: element },
    } = render(<Tags items={tags} />);

    expect(
      (element as HTMLElement).querySelector(".tags-wrap")
    ).toBeInTheDocument();

    expect(
      (element as HTMLElement).querySelectorAll(
        ".tags-wrap li:not(.tags-input-wrapper)"
      ).length
    ).toEqual(3);

    expect(getByText("three")).toBeInTheDocument();
  });

  it("Should render disabled", () => {
    const {
      getByText,
      container: { firstChild: element },
    } = render(<Tags items={tagsWithDisabled} />);

    expect(
      (element as HTMLElement).querySelectorAll(
        ".tags-wrap li:not(.tags-input-wrapper"
      ).length
    ).toEqual(2);

    expect(getByText("two").parentElement).toHaveClass("disabled");
  });

  it("Should create new tag", async () => {
    const { getByPlaceholderText, getByRole } = render(<Tags items={tags} />);
    const input = getByPlaceholderText("Please enter a value ...");

    await act(async () => {
      fireEvent.change(input, {
        target: {
          value: "new",
        },
      });
    });

    await act(async () => new Promise((resolve) => setTimeout(resolve, 100)));

    await act(async () => {
      fireEvent.keyUp(input, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
      });
    });

    const list = await waitFor(() => getByRole("list"));

    expect(list.querySelectorAll("li").length).toEqual(5);
  });

  it("should delete a tag", async () => {
    const { getByText, getByRole } = render(<Tags items={tags} />);

    const one = getByText("one");
    const oneParent = one.parentElement;

    if (oneParent) {
      const closeIcon = oneParent.querySelector(".tag-icon");

      await act(async () => {
        if (closeIcon) {
          fireEvent.click(closeIcon);
        }
      });

      expect(getByRole("list").querySelectorAll("li").length).toEqual(3);
    }
  });

  it("should call on change", async () => {
    const { getByPlaceholderText } = render(
      <Tags items={tags} onSelected={onSelected} />
    );

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
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
      });
    });

    expect(onSelected).toBeCalled();
    expect(onSelected).toBeCalledWith(["one", "two", "three", "test"]);
  });
});
