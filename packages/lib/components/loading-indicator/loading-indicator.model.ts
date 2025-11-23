/** Loading indicator component props */
export type LoadingIndicatorProps = {
  /** Accessible label for screen readers */
  ariaLabel?: string;

  /** Number of indicator dots/squares to display */
  count?: number;

  /** Custom size in pixels (overrides size prop) */
  customSize?: number;

  /** Enable right-to-left layout */
  rtl?: boolean;

  /** Shape of the loading indicator */
  shape?: 'circle' | 'square';

  /** Predefined size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Animation speed */
  speed?: 'slow' | 'normal' | 'fast';
};
