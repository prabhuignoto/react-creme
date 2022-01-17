import classNames from 'classnames';
import React from 'react';
import { ChevronRightIcon } from '../../icons';
import { Button } from '../button/button';
import { CarouselButtonProps } from './carousel-model';
import './carousel.scss';

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
          'rc-carousel-btn',
          `rc-carousel-btn-${position}`,
          `rc-carousel-btn-${direction}`,
        ],
        {
          'rc-carousel-btn-hide': hide,
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
