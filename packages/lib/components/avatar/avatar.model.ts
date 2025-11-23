import React from 'react';

/**
 * Avatar component props
 */
export interface AvatarProps {
  /**
   * Custom content to display (takes priority over letter and default icon)
   */
  children?: React.ReactNode;

  /**
   * Single letter/character to display (e.g., user initials)
   * Shown when children is not provided
   */
  letter?: string;

  /**
   * Size variant
   * @default 'sm'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Accessible label describing the avatar
   * @default undefined
   */
  ariaLabel?: string;

  /**
   * Alternative text for the avatar
   * @default 'User avatar'
   */
  alt?: string;

  /**
   * Custom background color (CSS color value)
   * @default theme.$primary
   */
  bgColor?: string;

  /**
   * Custom text/icon color (CSS color value)
   * @default theme.$white
   */
  color?: string;
}
