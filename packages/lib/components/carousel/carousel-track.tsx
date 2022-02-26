import classNames from 'classnames';
import React, { useMemo } from 'react';
import { CarouselButton } from './carousel-button';
import { CarouselTrackProps } from './carousel-model';
import styles from './carousel-track.module.scss';
import rootStyles from './carousel.module.scss';

const CarouselTrack: React.FunctionComponent<CarouselTrackProps> = ({
  length,
  handleSelection,
  activeIndex,
  direction,
  onNext,
  onPrevious,
  hidePrevious,
  hideNext,
  focusable,
}: CarouselTrackProps) => {
  const carouselTrackClass = useMemo(
    () =>
      classNames([
        styles.track,
        direction === 'horizontal'
          ? styles.track_horizontal
          : styles.track_vertical,
      ]),
    []
  );

  const carouselContainerClass = useMemo(
    () =>
      classNames([
        rootStyles.track_wrapper,
        direction === 'horizontal'
          ? styles.track_wrapper_horizontal
          : styles.track_wrapper_vertical,
        // [styles[`track-wrapper-${direction}`]]: true,
      ]),
    [direction]
  );

  return (
    <div className={carouselContainerClass}>
      <CarouselButton
        onClick={onPrevious}
        position="left"
        hide={hidePrevious}
        direction={direction}
        focusable={focusable}
        label="Previous"
      />
      <ul className={carouselTrackClass} role="list">
        {Array.from({ length }).map((_, index) => (
          <li
            key={index}
            role="listitem"
            className={classNames([
              styles.track_item,
              index === activeIndex ? styles.track_item_selected : '',
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
        focusable={focusable}
        label="Next"
      />
    </div>
  );
};

export { CarouselTrack };
