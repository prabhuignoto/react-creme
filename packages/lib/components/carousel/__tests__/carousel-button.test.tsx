import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { CarouselButton } from "../carousel-button";

const handler = jest.fn();

describe("Carousel Button", () => {
  it("should render with position", () => {
    const { container } = render(
      <CarouselButton
        position="left"
        onClick={handler}
        direction="horizontal"
        label="Previous"
      />
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("rc-carousel-btn-left");
  });

  it("should render carousel button snapshot", () => {
    const { getByRole } = render(
      <CarouselButton
        position="left"
        onClick={handler}
        direction="vertical"
        label="previous"
      />
    );

    expect(getByRole("button")).toMatchSnapshot();
  });

  it("should call the onClick handler", () => {
    const { getByRole } = render(
      <CarouselButton
        position="left"
        onClick={handler}
        direction="horizontal"
        label="Previous"
      />
    );

    fireEvent.click(getByRole("button"));

    expect(handler).toBeCalled();
  });
});