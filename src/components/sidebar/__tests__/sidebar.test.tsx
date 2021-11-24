import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Sidebar } from "../sidebar";

describe("Sidebar", () => {
  it("should render", () => {
    const { getAllByRole, getByText } = render(
      <Sidebar
        groups={[
          { title: "one", items: [{ name: "item1" }, { name: "item2" }] },
          { title: "two", items: [{ name: "item3" }, { name: "item4" }] },
          { title: "three", items: [{ name: "item5" }, { name: "item6" }] },
        ]}
      />
    );

    expect(getAllByRole("group")).toHaveLength(3);
    expect(getByText("one")).toBeInTheDocument();
  });

  it("should call handler", () => {
    const handler = jest.fn();
    const { getByText } = render(
      <Sidebar
        groups={[
          { title: "one", items: [{ name: "item1" }, { name: "item2" }] },
          { title: "two", items: [{ name: "item3" }, { name: "item4" }] },
          { title: "three", items: [{ name: "item5" }, { name: "item6" }] },
        ]}
        onSelect={handler}
      />
    );

    fireEvent.click(getByText("item1"));

    expect(handler).toHaveBeenCalled();
  });
});
