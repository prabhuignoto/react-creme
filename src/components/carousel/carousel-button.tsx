import classNames from "classnames";
import React from "react";
import { Button } from "..";
import { ChevronRightIcon } from "../../icons";
import "./carousel.scss";

interface CarouselButtonModel {
  onClick: () => void;
  position: "left" | "right";
}

const CarouselButton: React.FunctionComponent<CarouselButtonModel> = React.memo(
  ({ onClick, position }: CarouselButtonModel) => {
    return (
      <span
        className={classNames([
          "rc-carousel-btn",
          `rc-carousel-btn-${position}`,
        ])}
      >
        <Button type="icon" onClick={onClick}>
          <ChevronRightIcon />
        </Button>
      </span>
    );
  }
);

CarouselButton.displayName = "CarouselButton";

export { CarouselButton };
