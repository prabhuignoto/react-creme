import React from 'react';

export interface CarouselProps {
  autoPlay?: number;
  children: React.ReactNode | React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  enableSwipe?: boolean;
  focusable?: boolean;
  height?: number;
  transition?: string;
}

export interface CarouselItemProps {
  height: number;
  id: string;
  left?: string;
  top?: string;
  visible?: boolean;
  width: number;
}

export interface CarouselItemsProps {
  activePage: number;
  carouselItems: CarouselItemProps[];
  children: React.ReactNode[] | React.ReactNode;
  direction: 'horizontal' | 'vertical';
  height: number;
  totalItems: number;
  width: number;
}

export interface CarouselTrackProps {
  activeIndex: number;
  direction: 'horizontal' | 'vertical';
  focusable?: boolean;
  handleSelection: (index: number) => void;
  hideNext?: boolean;
  hidePrevious?: boolean;
  length: number;
  onNext: () => void;
  onPrevious: () => void;
}

export interface CarouselButtonProps {
  direction: 'horizontal' | 'vertical';
  focusable?: boolean;
  hide?: boolean;
  label: string;
  onClick: () => void;
  position: 'left' | 'right';
}
