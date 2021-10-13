import React from "react";

export interface CarouselModel {
  children: React.ReactNode | React.ReactNode;
  direction?: "horizontal" | "vertical";
  height?: number;
}

export interface CarouselItemModel {
  height?: number;
  id: string;
  left?: string;
  top?: string;
  visible?: boolean;
  width?: number;
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
