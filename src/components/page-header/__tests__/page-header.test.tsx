import { render } from "@testing-library/react";
import React from "react";
import { PageHeader } from "../page-header";

describe("PageHeader", () => {
  it("should render", () => {
    const { container, getByText } = render(<PageHeader title="Tests" />);
    expect(getByText("Tests")).toBeInTheDocument();
  });

  it("should render the children", () => {
    const { container, getByText } = render(
      <PageHeader title="Tests">Test</PageHeader>
    );
    expect(getByText("Test")).toBeInTheDocument();
  });
});
