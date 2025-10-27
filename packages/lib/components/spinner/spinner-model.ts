/**
 * Spinner component props
 */
export interface SpinnerProps {
  /**
   * Accessibility label for the spinner
   * @default 'Loading'
   */
  label?: string;

  /**
   * Size of the spinner
   * @default 'sm'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Animation speed
   * @default 'slow'
   */
  speed?: 'slow' | 'medium' | 'fast';
}
