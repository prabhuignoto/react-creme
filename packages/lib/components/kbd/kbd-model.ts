import React from 'react';

/**
 * Size variant for keyboard display
 * - `sm`: Small (20px height)
 * - `md`: Medium (25px height)
 * - `lg`: Large (30px height)
 */
export type KbdSize = 'sm' | 'md' | 'lg';

/**
 * Shadow/raise direction for the keyboard button
 * - `left`: Shadow appears on left side
 * - `right`: Shadow appears on right side
 */
export type KbdButtonRaisedDirection = 'left' | 'right';

/**
 * Props for the Kbd component
 */
export interface KbdProps {
  /**
   * Content to display in the keyboard button
   * Can be text (e.g., "Shift", "Enter") or React nodes (e.g., arrow icons)
   */
  children: React.ReactNode;

  /**
   * Size variant of the keyboard button
   * @default 'sm'
   */
  size?: KbdSize;

  /**
   * Direction of the shadow/raised effect
   * @default 'left'
   */
  buttonRaised?: KbdButtonRaisedDirection;

  /**
   * Shadow thickness in pixels
   * Controls the depth of the raised button effect
   * @default 2
   */
  thickness?: number;
}

/**
 * Props for the KbdCombination component
 * Used to display multiple keys with "+" separators (e.g., Ctrl + C)
 */
export interface KbdCombinationProps {
  /**
   * Array of keyboard buttons to display
   * Each element should be a Kbd component
   * Example: [<Kbd>Ctrl</Kbd>, <Kbd>C</Kbd>]
   */
  children: React.ReactNode[];

  /**
   * Size variant for all keyboard buttons in the combination
   * @default 'sm'
   */
  size?: KbdSize;
}
