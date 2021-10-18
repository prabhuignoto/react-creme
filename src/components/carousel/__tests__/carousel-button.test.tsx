import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { CarouselButton } from "../carousel-button";

const handler = jest.fn();

describe("Carousel Button", () => {
  it("should render with position", () => {
    const { container } = render(
      <CarouselButton position="left" onClick={handler} />
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("rc-carousel-btn-left");
  });

  it("should call the onClick handler", () => {
    const { container } = render(
      <CarouselButton position="left" onClick={handler} />
    );

    if (container.firstChild) {
      fireEvent.click(container.firstChild);

      expect(handler).toBeCalled();
    }
  });
});
