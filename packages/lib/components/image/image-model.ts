import { OverlayModel } from '../common/overlay-model';
import React from 'react';

export interface ImageOverlayProps extends OverlayModel<null> {
  height?: number;
  src: string;
  width?: number;
}

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
  expandImageOnClick?: boolean;
  fitImage?: boolean;
  focusable?: boolean;
  isOverlay?: boolean;
  loaderSize?: 'xs' | 'sm' | 'md' | 'lg';
  onLoad?: (evt: React.SyntheticEvent) => void;
  showLoader?: boolean;
}
