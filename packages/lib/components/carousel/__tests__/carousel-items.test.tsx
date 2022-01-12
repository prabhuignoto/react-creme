import { render } from "@testing-library/react";
import React from "react";
import { CarouselItems } from "../carousel-items";
import { CarouselItemModel } from "./../carousel-model";

const items: CarouselItemModel[] = [
  {
    id: "234",
    height: 300,
    width: 300,
    visible: true,
    left: "0px",
    top: "0px",
  },
  {
    id: "235",
    height: 300,
    width: 300,
    visible: true,
    left: "300px",
    top: "0px",
  },
];

describe("Carousel items", () => {
  it("Should render carousel items", () => {
    const { getByRole, getAllByRole } = render(
      <CarouselItems
        carouselItems={items}
        height={300}
        width={300}
        direction="horizontal"
        totalItems={2}
        activePage={1}
      >
        <span>one</span>
        <span>two</span>
      </CarouselItems>
    );
    expect(getByRole("list")).toBeInTheDocument();
    expect(getAllByRole("listitem")).toHaveLength(1);
  });

  it("Should render carousel items snapshot", () => {
    const { getByRole } = render(
      <CarouselItems
        carouselItems={items}
        height={300}
        width={300}
        direction="horizontal"
        totalItems={2}
        activePage={1}
      >
        <span>one</span>
        <span>two</span>
      </CarouselItems>
    );
    expect(getByRole("list")).toMatchSnapshot();
  });
});
