import React from "react";

export interface CarouselModel {
  children: React.ReactNode | React.ReactNode;
  direction?: "horizontal" | "vertical";
  height?: number;
  autoPlay?: number;
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
  handleSelection: (index: number) => void;
  length: number;
  onNext: () => void;
  onPrevious: () => void;
  hideNext?: boolean;
  hidePrevious?: boolean;
}
