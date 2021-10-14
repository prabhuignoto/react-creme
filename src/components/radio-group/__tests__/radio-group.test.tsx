import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { RadioGroup } from "../radio-group";

const items = ["one", "two", "three"];

const handler = jest.fn();

describe("Radio Group", () => {
  it("should render the radio group", () => {
    const { getByRole, getAllByRole } = render(<RadioGroup items={items} />);

    expect(getByRole("radiogroup")).toBeInTheDocument();
    expect(getAllByRole("radio")).toHaveLength(3);
  });

  it("should call the handler", async () => {
    const { getAllByRole } = render(
      <RadioGroup items={items} onSelected={handler} />
    );
    fireEvent.click(getAllByRole("radio")[0]);

    expect(handler).toBeCalledWith("one");
  });
});
