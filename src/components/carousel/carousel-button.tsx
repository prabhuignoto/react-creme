import classNames from "classnames";
import React from "react";
import { ChevronRightIcon } from "../../icons";
import "./carousel.scss";

interface CarouselButtonModel {
  onClick: () => void;
  position: "left" | "right";
}

const CarouselButton: React.FunctionComponent<CarouselButtonModel> = React.memo(
  ({ onClick, position }: CarouselButtonModel) => {
    return (
      <button
        className={classNames([
          "rc-carousel-btn",
          `rc-carousel-btn-${position}`,
        ])}
        onClick={onClick}
      >
        <ChevronRightIcon />
      </button>
    );
  }
);

CarouselButton.displayName = "CarouselButton";

export { CarouselButton };
