import React from 'react';

export type CarouselProps = {
  // AutoPlay (in millis seconds) controls the speed at which each item is shown before moving to the next.
  autoPlay?: number;

  // Border defines whether or not to draw a border around the component.
  border?: boolean;

  //Children are the React elements/components displayed inside the Carousel component.
  children: React.ReactNode | React.ReactNode[];

  // The direction determines if the items move horizontally or vertically in the carousel.
  direction?: 'horizontal' | 'vertical';

  // enableSwipe enable swipe gestures for moving forward and backward. Defaults to true.
  enableSwipe?: boolean;

  //focusable defines whether or not the node can be focused, false by default.
  focusable?: boolean;

  //height sets the height of the element.
  height?: number;

  //size sets the size of the element.
  size?: 'sm' | 'md' | 'lg';

  //transition configures the transition effect between slides.
  transition?: string;
};

export type CarouselItemProps = {
  height: number;
  id: string;
  left?: string;
  top?: string;
  visible?: boolean;
  width: number;
};

// The CarouselItemsProps type is a combination of props from the CarouselProps type and additional props
export type CarouselItemsProps = Pick<
  CarouselProps,
  'children' | 'direction' | 'size'
> & {
  // The activePage prop keeps tracks of which page/item is currently in view
  activePage: number;

  // The carouselItems prop contains an array of CarouselItemProps
  carouselItems: CarouselItemProps[];

  // The height prop is used to determine the size of the carousel
  height: number;

  // The totalItems prop stores the total items/pages in the carousel
  totalItems: number;

  // The width prop determines the width of the carousel
  width: number;
};

export type CarouselTrackProps = Pick<
  CarouselProps,
  'direction' | 'focusable' | 'size'
> & {
  activeIndex: number;
  focusable?: boolean;
  handleSelection: (index: number) => void;
  hideNext?: boolean;
  hidePrevious?: boolean;
  length: number;
  onNext: () => void;
  onPrevious: () => void;
};

export type CarouselButtonProps = Pick<
  CarouselProps,
  'direction' | 'focusable' | 'size'
> & {
  hide?: boolean;
  label: string;
  onClick: () => void;
  position: 'left' | 'right';
};
