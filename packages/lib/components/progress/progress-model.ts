export interface ProgressProps {
  /**
   * Enables right-to-left (RTL) text direction for the progress bar.
   * Useful for languages like Arabic, Hebrew, and Persian.
   * @default false
   */
  RTL?: boolean;

  /**
   * The current progress value. Used with determinate progress bars.
   * Should be between 0 and maxValue.
   * @default 0
   */
  currentValue?: number;

  /**
   * Animation style for indeterminate progress bars.
   * - 'disappear': Progress bar disappears and reappears (fade effect)
   * - 'bob': Progress bar bounces back and forth (alternate direction)
   * Only applies when type='indeterminate'
   * @default 'disappear'
   */
  indeterminateStyle?: 'disappear' | 'bob';

  /**
   * Accessible name for the progress bar. Announces the purpose/context
   * to screen reader users. Should describe what is being loaded/progressed.
   * @example label="Uploading file: document.pdf"
   * @default 'progress bar'
   */
  label?: string;

  /**
   * The maximum value that currentValue can reach.
   * Used to calculate the progress percentage (currentValue / maxValue).
   * @default 100
   */
  maxValue?: number;

  /**
   * Whether to display the current progress as a percentage inside the bar.
   * Only shown for determinate progress when size is 'md' or 'lg'.
   * @default false
   */
  showProgressValue?: boolean;

  /**
   * Size variant of the progress bar affecting height and typography.
   * - 'sm': 10px height - compact size for minimal UI
   * - 'md': 20px height - default size
   * - 'lg': 40px height - prominent size for better accessibility
   * @default 'md'
   */
  size?: 'lg' | 'md' | 'sm';

  /**
   * Visual status/state of the progress bar affecting colors.
   * - 'default': Primary color (neutral state)
   * - 'success': Green color (operation completed successfully)
   * - 'error': Red color (operation failed)
   * @default 'default'
   */
  status?: 'success' | 'error' | 'default';

  /**
   * Additional status text for screen readers describing the current state.
   * Useful for error messages or specific status information.
   * @example statusText="Upload failed: Network error"
   */
  statusText?: string;

  /**
   * Determines the progress bar behavior and animation style.
   * - 'determinate': Shows actual progress based on currentValue/maxValue ratio
   * - 'indeterminate': Shows an animated progress indicator (loading state)
   * **Required** - must be specified for the component to function
   */
  type: 'determinate' | 'indeterminate';

  /**
   * Width of the progress bar in pixels.
   * @default 250
   */
  width?: number;
}
