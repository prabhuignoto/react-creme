import { ReactNode } from 'react';

/**
 * Card component props
 */
export interface CardProps {
  /**
   * Horizontal alignment of the footer content
   * @default 'left'
   */
  alignFooter?: 'left' | 'center' | 'right';

  /**
   * Horizontal alignment of the header content
   * @default 'left'
   */
  alignHeader?: 'left' | 'center' | 'right';

  /**
   * Whether to show a border around the card
   * @default false
   */
  border?: boolean;

  /**
   * Main content of the card
   */
  children?: ReactNode | ReactNode[];

  /**
   * Optional footer content
   */
  footer?: ReactNode;

  /**
   * Optional header content
   */
  header?: ReactNode;

  /**
   * Minimum height of the card in pixels
   * @default 200
   */
  height?: number;

  /**
   * Whether to show a drop shadow
   * @default true
   */
  shadow?: boolean;

  /**
   * Size variant for consistent styling
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Custom aria-label for the card region
   * @default undefined
   */
  ariaLabel?: string;

  /**
   * Whether the card is interactive/clickable
   * @default false
   */
  interactive?: boolean;

  /**
   * Click handler for interactive cards
   */
  onClick?: () => void;
}
