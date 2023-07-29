/**
 * @file This file defines the CarouselButton component.
 * @module CarouselButton
 */

import { ChevronRightIcon } from '@icons';
import classNames from 'classnames';
import React from 'react';
import { Button } from '../button/button';
import { CarouselButtonProps } from './carousel-model';
import styles from './carousel.module.scss';

const CarouselButton: React.FunctionComponent<CarouselButtonProps> = ({
  onClick,
  position = 'left',
  hide,
  direction,
  focusable,
  label,
  size,
}: CarouselButtonProps) => {
  // Compute the classnames for the carousel button.
  const buttonClass = classNames(
    [
      styles.btn,
      position === 'left' ? styles.btn_left : styles.btn_right,
      direction === 'horizontal' ? styles.btn_horizontal : styles.btn_vertical,
    ],
    {
      [styles.btn_hide]: hide,
    }
  );

  // Render the CarouselButton component.
  return (
    <span className={buttonClass}>
      <Button
        type="icon"
        onClick={onClick}
        focusable={focusable}
        label={label}
        size={size}
        aria-label={label}
      >
        <ChevronRightIcon />
      </Button>
    </span>
  );
};

CarouselButton.displayName = 'CarouselButton';

export { CarouselButton };
