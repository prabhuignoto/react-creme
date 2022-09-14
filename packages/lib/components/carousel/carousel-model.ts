import React from 'react';

export type CarouselProps = {
  autoPlay?: number;
  border?: boolean;
  children: React.ReactNode | React.ReactNode[];
  direction?: 'horizontal' | 'vertical';
  enableSwipe?: boolean;
  focusable?: boolean;
  height?: number;
  size?: 'sm' | 'md' | 'lg';
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

export type CarouselItemsProps = Pick<
  CarouselProps,
  'children' | 'direction' | 'height' | 'size'
> & {
  activePage: number;
  carouselItems: CarouselItemProps[];
  totalItems: number;
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
