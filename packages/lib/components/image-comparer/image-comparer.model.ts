export interface ImageComparerProps {
  /** Direction of comparison - horizontal (left/right) or vertical (top/bottom) */
  direction?: 'horizontal' | 'vertical';

  /** First image source URL (required for comparison) */
  sourceOne: string;

  /** Second image source URL */
  sourceTwo: string;

  /** Accessible label for the comparison slider */
  ariaLabel?: string;

  /** Large step size for PageUp/PageDown navigation (percentage, 1-100) */
  largeStep?: number;
}
