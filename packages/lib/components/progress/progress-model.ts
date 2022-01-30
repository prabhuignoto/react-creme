export interface ProgressProps {
  /**
   * Right to left direction
   */
  RTL?: boolean;

  /**
   * The value of the progress bar.
   */
  currentValue?: number;

  indeterminateStyle?: 'disappear' | 'bob';
  /**
   * progress bar label
   */

  label?: string;
  /**
   * The maximum value of the progress bar.
   */

  maxValue?: number;

  /**
   * When enabled shows the progress value
   */
  showProgressValue?: boolean;

  /**
   * sets the size of the progress bar
   */
  size?: 'lg' | 'md' | 'sm';

  /**
   * status of the progress bar
   */
  status?: 'success' | 'error' | 'default';

  /**
   * status text of the progress bar
   */
  statusText?: string;

  /**
   * Type of progress bar
   */
  type: 'determinate' | 'indeterminate';

  /**
   * width of the progress bar
   */
  width?: number;
}
