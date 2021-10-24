import classNames from "classnames";
import React from "react";
import { Button } from "..";
import { ChevronRightIcon } from "../../icons";
import "./carousel.scss";

interface CarouselButtonModel {
  onClick: () => void;
  position: "left" | "right";
  hide?: boolean;
}

const CarouselButton: React.FunctionComponent<CarouselButtonModel> = React.memo(
  ({ onClick, position, hide }: CarouselButtonModel) => {
    return (
      <span
        className={classNames(
          ["rc-carousel-btn", `rc-carousel-btn-${position}`],
          {
            "rc-carousel-btn-hide": hide,
          }
        )}
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
