/**
 * @file This file defines the CarouselTrack component.
 * @module CarouselTrack
 */

import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { isDark } from '../common/utils';
import { CarouselButton } from './carousel-button';
import { CarouselTrackProps } from './carousel-model';
import styles from './carousel-track.module.scss';
import rootStyles from './carousel.module.scss';

/**
 * CarouselTrack is a React Function Component for displaying a track of the carousel.
 * It receives several props to handle its behavior and styling.
 *
 * @param {Object} CarouselTrackProps - The properties that define the CarouselTrack component.
 * @returns {JSX.Element} The CarouselTrack component.
 */
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
  size,
}: CarouselTrackProps) => {
  // Determine if the dark mode is enabled.
  const isDarkMode = useMemo(() => isDark(), []);

  // Compute the classnames for the carousel track.
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

  // Compute the classnames for the carousel container.
  const carouselContainerClass = useMemo(
    () =>
      classNames([
        rootStyles.track_wrapper,
        direction === 'horizontal'
          ? styles.track_wrapper_horizontal
          : styles.track_wrapper_vertical,
      ]),
    [direction]
  );

  // Callback function to handle the selection of a track item.
  const handleItemSelection = useCallback(
    (index: number) => handleSelection(index),
    [handleSelection]
  );

  // Render the CarouselTrack component.
  return (
    <div className={carouselContainerClass}>
      <CarouselButton
        onClick={onPrevious}
        position="left"
        hide={hidePrevious}
        direction={direction}
        focusable={focusable}
        label="Previous"
        size={size}
      />
      <ul className={carouselTrackClass} role="list">
        {Array.from({ length }).map((_, index) => (
          <li
            key={index}
            role="listitem"
            className={classNames([
              styles.track_item,
              index === activeIndex ? styles.track_item_selected : '',
              isDarkMode ? styles.dark : '',
            ])}
            onClick={() => handleItemSelection(index)}
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
        size={size}
      />
    </div>
  );
};

export { CarouselTrack };
