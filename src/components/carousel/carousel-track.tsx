import classNames from "classnames";
import React, { useMemo } from "react";
import "./carousel-track.scss";

interface CarouselTrackModel {
  activeIndex: number;
  direction: "horizontal" | "vertical";
  handleSelection: (index: number) => void;
  length: number;
}

const CarouselTrack: React.FunctionComponent<CarouselTrackModel> = React.memo(
  ({ length, handleSelection, activeIndex, direction }: CarouselTrackModel) => {
    const carouselTrackWrapper = useMemo(
      () => classNames(["carousel-track", `carousel-track-${direction}`]),
      []
    );

    return (
      <ul className={carouselTrackWrapper} role="list">
        {Array.from({ length }).map((_, index) => (
          <li
            key={index}
            role="listitem"
            className={classNames([
              "carousel-track-item",
              index === activeIndex ? "carousel-track-item-selected" : "",
            ])}
            onClick={() => handleSelection(index)}
          ></li>
        ))}
      </ul>
    );
  },
  (prev, cur) => prev.activeIndex === cur.activeIndex
);

CarouselTrack.displayName = "CarouselTrack";

export { CarouselTrack };
