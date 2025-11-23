/**
 * CircularProgress - A circular spinner component indicating loading or processing state.
 *
 * **Features:**
 * - Smooth rotating circular indicator
 * - Four size options: xs (16px), sm (32px), md (48px), lg (56px)
 * - Dark mode support with automatic theme detection
 * - Accessibility: Proper ARIA progressbar role and labels
 * - Reduced motion: Respects prefers-reduced-motion for accessibility
 *
 * **Accessibility:**
 * - Always include a descriptive `label` prop explaining the loading state
 * - The component automatically adds role="progressbar" for screen readers
 *
 * **Props:**
 * @property {string} [label] - Accessible name describing what is loading
 * @property {string} [size] - Size variant: 'xs' | 'sm' | 'md' | 'lg'
 * @returns {JSX.Element} The CircularProgress spinner component
 *
 * @example
 * // Basic usage - shows loading spinner
 * <CircularProgress label="Loading data..." />
 *
 * @example
 * // With custom size
 * <CircularProgress label="Processing file upload" size="lg" />
 */

import classNames from 'classnames';
import React, { useMemo } from 'react';
import { isDark } from '../common/utils';
import styles from './circular-progress.module.scss';

export interface CircularProgressProps {
  /**
   * Accessibility label for the progress indicator
   * @default 'Loading'
   */
  label?: string;
  /**
   * Size of the circular progress indicator
   * @default 'sm'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const CircularProgress: React.FunctionComponent<CircularProgressProps> =
  React.memo(({ size = 'sm', label = 'Loading' }) => {
    const isDarkMode = isDark();
    const wrapperClass = useMemo(() => {
      return classNames(
        styles.circular_progress,
        styles[`circular_progress_${size}`],
        {
          [styles.dark]: isDarkMode,
        }
      );
    }, [isDarkMode, size]);
    return (
      <span className={wrapperClass} role="progressbar" aria-label={label}>
        <span
          className={classNames(styles.inner_circle_2, {
            [styles.dark]: isDarkMode,
          })}
        ></span>
      </span>
    );
  });

CircularProgress.displayName = 'CircularProgress';

export { CircularProgress };
