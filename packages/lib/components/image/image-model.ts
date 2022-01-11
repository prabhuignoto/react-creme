import { OverlayModel } from "../common/overlay-model";
import React from "react";

export interface ImageOverlayProps extends OverlayModel {
  src: string;
  width?: number;
  height?: number;
}

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  expandImageOnClick?: boolean;
  isOverlay?: boolean;
  fitImage?: boolean;
  showLoader?: boolean;
  loaderSize?: "xs" | "sm" | "md" | "lg";
  onLoad?: (evt: React.SyntheticEvent) => void;
  alt?: string;
}
