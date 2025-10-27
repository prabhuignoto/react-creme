import { ReactNode } from 'react';

export interface GalleryProps {
  /**
   * Custom React children (typically Image components)
   * Takes priority over imagesURL if provided
   */
  children?: ReactNode[];

  /**
   * Whether clicking an image expands it in a modal
   * @default false
   */
  expandImageOnClick?: boolean;

  /**
   * Gap between grid items in pixels
   * @default undefined (uses CSS default)
   */
  gap?: number;

  /**
   * Grid dimensions as [columns, rows]
   * @default [3, 3]
   */
  gridDimension?: [number, number];

  /**
   * Width/height of each grid item in pixels
   * @default 100
   */
  imageDimension?: number;

  /**
   * Array of alt text for images (should match imagesURL length)
   * @default []
   */
  imagesALT?: string[];

  /**
   * Array of image URLs to display in the gallery
   * @default []
   */
  imagesURL?: string[];

  /**
   * Accessible label for the gallery container
   * @default "Image gallery"
   */
  ariaLabel?: string;

  /**
   * Size variant for consistent styling
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
}
