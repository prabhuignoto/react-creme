import classNames from 'classnames';
import React from 'react';
import { ChevronRightIcon } from '../../icons';
import { Button } from '../button/button';
import { CarouselButtonProps } from './carousel-model';
import styles from './carousel.module.scss';

const CarouselButton: React.FunctionComponent<CarouselButtonProps> = ({
  onClick,
  position,
  hide,
  direction,
  focusable,
  label,
}: CarouselButtonProps) => {
  return (
    <span
      className={classNames(
        [
          styles.btn,
          position === 'left' ? styles.btn_left : styles.btn_right,
          direction === 'horizontal'
            ? styles.btn_horizontal
            : styles.btn_vertical,
        ],
        {
          [styles.btn_hide]: hide,
        }
      )}
    >
      <Button type="icon" onClick={onClick} focusable={focusable} label={label}>
        <ChevronRightIcon />
      </Button>
    </span>
  );
};

CarouselButton.displayName = 'CarouselButton';

export { CarouselButton };
