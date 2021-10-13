import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { Carousel } from "../carousel";

describe("Carousel", () => {
  it("should render carousel", () => {
    const { getByText } = render(
      <Carousel direction="horizontal">
        <span>one</span>
        <span>two</span>
      </Carousel>
    );

    expect(getByText("one")).toBeInTheDocument();
    expect(getByText("two")).toBeInTheDocument();
  });

  it("should render vertical carousel", () => {
    const { getByText } = render(
      <Carousel direction="vertical">
        <span>one</span>
        <span>two</span>
      </Carousel>
    );

    expect(getByText("one")).toBeInTheDocument();
    expect(getByText("two")).toBeInTheDocument();
  });

  it("should carousel navigation work as expected", async () => {
    const { container } = render(
      <Carousel>
        <span>one</span>
        <span>two</span>
      </Carousel>
    );

    if (container) {
      expect(
        container.querySelector(".carousel-btn-right")
      ).toBeInTheDocument();

      const btnRight = container.querySelector(".carousel-btn-right");
      const btnLeft = container.querySelector(".carousel-btn-left");
      const carouselItems = container.querySelectorAll(".carousel-item");

      if (btnRight && carouselItems) {
        await act(async () => {
          fireEvent.click(btnRight);
        });

        await waitFor(async () => {
          expect(carouselItems[1]).toHaveStyle("visibility: visible");
        });
      }

      if (btnLeft && carouselItems) {
        await act(async () => {
          fireEvent.click(btnLeft);
        });

        await waitFor(async () => {
          expect(carouselItems[0]).toHaveStyle("visibility: visible");
        });
      }
    }
  });
});
