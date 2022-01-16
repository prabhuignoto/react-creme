import React from "react";

export interface CarouselModel {
  autoPlay?: number;
  children: React.ReactNode | React.ReactNode;
  direction?: "horizontal" | "vertical";
  enableSwipe?: boolean;
  focusable?: boolean;
  height?: number;
  transition?: string;
}

export interface CarouselItemModel {
  height: number;
  id: string;
  left?: string;
  top?: string;
  visible?: boolean;
  width: number;
}

export interface CarouselItemsModel {
  activePage: number;
  carouselItems: CarouselItemModel[];
  children: React.ReactNode[] | React.ReactNode;
  direction: "horizontal" | "vertical";
  height: number;
  totalItems: number;
  width: number;
}

export interface CarouselTrackModel {
  activeIndex: number;
  direction: "horizontal" | "vertical";
  focusable?: boolean;
  handleSelection: (index: number) => void;
  hideNext?: boolean;
  hidePrevious?: boolean;
  length: number;
  onNext: () => void;
  onPrevious: () => void;
}

export interface CarouselButtonModel {
  direction: "horizontal" | "vertical";
  focusable?: boolean;
  hide?: boolean;
  label: string;
  onClick: () => void;
  position: "left" | "right";
}
