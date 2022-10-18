import { ReactNode } from 'react';

export type GalleryProps = {
  children?: ReactNode[];
  expandImageOnclick?: boolean;
  gap?: number;
  gridDimension?: [number, number];
  imageDimension?: number;
  imagesALT?: string[];
  imagesURL?: string[];
};
