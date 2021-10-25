import classNames from "classnames";
import React from "react";
import { Button } from "..";
import { ChevronRightIcon } from "../../icons";
import { CarouselButtonModel } from "./carousel-model";
import "./carousel.scss";

const CarouselButton: React.FunctionComponent<CarouselButtonModel> = React.memo(
  ({ onClick, position, hide, direction }: CarouselButtonModel) => {
    return (
      <span
        className={classNames(
          [
            "rc-carousel-btn",
            `rc-carousel-btn-${position}`,
            `rc-carousel-btn-${direction}`,
          ],
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
