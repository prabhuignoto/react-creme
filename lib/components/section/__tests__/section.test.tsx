import { render } from "@testing-library/react";
import React from "react";
import { Section } from "../section";

describe("Section", () => {
  it("should render Section correctly", () => {
    const { container, getByText } = render(
      <Section title="test">
        <span></span>
      </Section>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(getByText("test")).toBeInTheDocument();
  });

  it("should render section content", () => {
    const { getByText } = render(<Section>Section content</Section>);
    expect(getByText("Section content")).toBeInTheDocument();
  });
});