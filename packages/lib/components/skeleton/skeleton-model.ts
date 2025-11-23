import { CSSProperties } from 'react';

/**
 * Skeleton component props
 */
export interface SkeletonProps {
  /**
   * Right to left direction
   * @default false
   */
  RTL?: boolean;

  /**
   * Enable loading animation
   * @default false
   */
  animate?: boolean;

  /**
   * Number of skeleton blocks to render
   * @default 1
   */
  blocks?: number;

  /**
   * Accessibility label for the skeleton loader
   * @default 'Loading...'
   */
  label?: string;

  /**
   * Height of each row in pixels
   * @default 10
   */
  rowHeight?: number;

  /**
   * Number of rows per block
   * @default 4
   */
  rows?: number;

  /**
   * Show circular placeholder
   * @default false
   */
  showCircle?: boolean;

  /**
   * Custom CSS styles
   */
  style?: CSSProperties;

  /**
   * Custom width in pixels
   */
  width?: number;
}

/**
 * Individual skeleton row props
 */
export interface SkeletonRowProps {
  /**
   * Disable animation for this row
   */
  disableAnimation?: boolean;

  /**
   * Unique identifier for the row
   */
  id: string;

  /**
   * Whether the row is visible
   */
  visible?: boolean;

  /**
   * Width of the row in pixels
   */
  width?: number;
}

/**
 * Skeleton block containing multiple rows
 */
export interface SkeletonBlockProps {
  /**
   * Unique identifier for the block
   */
  id: string;

  /**
   * Array of skeleton rows
   */
  rows: SkeletonRowProps[];
}
