import React, { CSSProperties, ReactNode, useMemo } from "react";
import { CarouselItemsModel } from "./carousel-model";
import "./carousel.scss";

const CarouselItems: React.FunctionComponent<CarouselItemsModel> = ({
  activePage = 0,
  carouselItems,
  children,
  direction,
  height,
  totalItems,
  width,
}: CarouselItemsModel) => {
  const carouselStyle = useMemo(() => {
    return {
      width: `${width * totalItems}px`,
      transform:
        direction === "horizontal"
          ? `translateX(-${width * activePage}px)`
          : `translateY(-${height * activePage}px)`,
    } as CSSProperties;
  }, [width, height, activePage]);

  return (
    <ul className={"rc-carousel"} style={carouselStyle} role="list">
      {carouselItems.map((item, index) => (
        <li
          key={item.id}
          className={"rc-carousel-item"}
          role="listitem"
          style={{
            width: item.width,
            height: direction === "horizontal" ? "100%" : item.height - 32,
            top: direction === "horizontal" ? 0 : item.top,
            left: direction === "horizontal" ? item.left : 0,
          }}
        >
          <div className="rc-carousel-item-container">
            {(children as ReactNode[])[index]}
          </div>
        </li>
      ))}
    </ul>
  );
};

CarouselItems.displayName = "CarouselItems";

export { CarouselItems };
