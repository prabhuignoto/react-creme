import classNames from "classnames";
import React, { useMemo } from "react";
import { CarouselButton } from "./carousel-button";
import { CarouselTrackModel } from "./carousel-model";
import "./carousel-track.scss";

const CarouselTrack: React.FunctionComponent<CarouselTrackModel> = ({
  length,
  handleSelection,
  activeIndex,
  direction,
  onNext,
  onPrevious,
  hidePrevious,
  hideNext,
}: CarouselTrackModel) => {
  const carouselTrackClass = useMemo(
    () => classNames(["rc-carousel-track", `rc-carousel-track-${direction}`]),
    []
  );

  const carouselContainerClass = useMemo(
    () =>
      classNames("rc-carousel-track-wrapper", {
        [`rc-carousel-track-wrapper-${direction}`]: true,
      }),
    [direction]
  );

  return (
    <div className={carouselContainerClass}>
      <CarouselButton
        onClick={onPrevious}
        position="left"
        hide={hidePrevious}
        direction={direction}
      />
      <ul className={carouselTrackClass} role="list">
        {Array.from({ length }).map((_, index) => (
          <li
            key={index}
            role="listitem"
            className={classNames([
              "rc-carousel-track-item",
              index === activeIndex ? "rc-carousel-track-item-selected" : "",
            ])}
            onClick={() => handleSelection(index)}
          ></li>
        ))}
      </ul>
      <CarouselButton
        onClick={onNext}
        position="right"
        hide={hideNext}
        direction={direction}
      />
    </div>
  );
};

export { CarouselTrack };
