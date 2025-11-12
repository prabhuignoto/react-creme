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
  // Determine if the dark mode is enabled (no need for useMemo).
  const isDarkMode = isDark();

  // Compute the classnames for the carousel track.
  const carouselTrackClass = useMemo(
    () =>
      classNames([
        styles.track,
        direction === 'horizontal'
          ? styles.track_horizontal
          : styles.track_vertical,
      ]),
    [direction]
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

  // Keyboard navigation handler for track dots
  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent, currentIndex: number) => {
      let newIndex: number | null = null;

      switch (ev.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          ev.preventDefault();
          newIndex =
            currentIndex < length - 1 ? currentIndex + 1 : currentIndex;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          ev.preventDefault();
          newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
          break;
        case 'Home':
          ev.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          ev.preventDefault();
          newIndex = length - 1;
          break;
        default:
          return;
      }

      if (newIndex !== null && newIndex !== currentIndex) {
        handleItemSelection(newIndex);
        // Focus the new button
        const buttons = document.querySelectorAll('[role="tab"]');
        (buttons[newIndex] as HTMLButtonElement)?.focus();
      }
    },
    [length, handleItemSelection]
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
      <div
        className={carouselTrackClass}
        role="tablist"
        aria-label="Carousel slides"
      >
        {Array.from({ length }).map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to slide ${index + 1}`}
            aria-controls={`carousel-slide-${index}`}
            tabIndex={index === activeIndex ? 0 : -1}
            className={classNames([
              styles.track_item,
              index === activeIndex ? styles.track_item_selected : '',
              isDarkMode ? styles.dark : '',
            ])}
            onClick={() => handleItemSelection(index)}
            onKeyDown={ev => handleKeyDown(ev, index)}
          />
        ))}
      </div>
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
