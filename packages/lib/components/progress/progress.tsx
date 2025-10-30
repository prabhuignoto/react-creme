import classNames from 'classnames';
import React from 'react';
import { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';
import { ProgressProps } from './progress-model';
import styles from './progress.module.scss';

/**
 * Progress - A versatile progress indicator component supporting both determinate
 * (actual progress) and indeterminate (loading) states.
 *
 * **Features:**
 * - Determinate mode: Shows actual progress as a filled bar
 * - Indeterminate mode: Animated loading indicator with customizable styles
 * - Status variants: Default, success (green), and error (red) states
 * - Multiple sizes: sm (10px), md (20px), lg (40px) heights
 * - Accessibility: Full ARIA support with proper labels and status announcements
 * - RTL support: Works correctly with right-to-left languages
 * - Reduced motion: Respects prefers-reduced-motion for accessibility
 *
 * **Accessibility:**
 * - Use `label` prop to describe what is being loaded/progressed
 * - Use `statusText` for error messages or specific status information
 * - Automatically includes ARIA progressbar role and required attributes
 *
 * **Props:**
 * @property {boolean} [RTL] - Enable right-to-left direction
 * @property {number} [currentValue] - Current progress value (0-maxValue)
 * @property {string} [indeterminateStyle] - Animation style for indeterminate mode
 * @property {string} [label] - Accessible name for the progress bar
 * @property {number} [maxValue] - Maximum value for percentage calculation
 * @property {boolean} [showProgressValue] - Display percentage text
 * @property {string} [size] - Size variant: 'sm' | 'md' | 'lg'
 * @property {string} [status] - Visual status: 'default' | 'success' | 'error'
 * @property {string} [statusText] - Status text for screen readers
 * @property {string} type - **REQUIRED** - 'determinate' or 'indeterminate'
 * @property {number} [width] - Width in pixels
 * @returns {JSX.Element} The Progress component
 */

const Progress: React.FunctionComponent<ProgressProps> = React.memo(
  ({
    currentValue = 0,
    indeterminateStyle = 'disappear',
    maxValue = 100,
    showProgressValue = false,
    size = 'md',
    status = 'default',
    type = 'determinate',
    width = 250,
    RTL = false,
    statusText = '',
    label = 'progress bar',
  }) => {
  const progressTrackRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Calculate progress percentage
  const progressPercent = useMemo(
    () => currentValue / maxValue,
    [currentValue, maxValue]
  );
  const progressPercentValue = useMemo<string | number>(() => {
    const val = Math.round(progressPercent * 100);
    return val > 5 ? `${val}%` : 0;
  }, [progressPercent]);

  // Determine if progress value can be shown
  const canShowProgressValue = useMemo(
    () =>
      showProgressValue &&
      progressPercentValue !== 0 &&
      type !== 'indeterminate' &&
      size !== 'sm',
    [showProgressValue, progressPercentValue, type, size]
  );

  // Determine fill width based on track width and progress percentage
  // Note: depends on progressPercent (not currentValue directly) to avoid redundant memoization
  const fillWidth = useMemo<number>(() => {
    const trackWidth = progressTrackRef.current?.clientWidth;
    return trackWidth ? Math.round(trackWidth * progressPercent) : 0;
  }, [progressPercent, loaded]);

  // Styles for fill
  const fillStyle = useMemo(
    () =>
      ({
        '--width': type === 'determinate' ? `${fillWidth}px` : '50%',
      }) as CSSProperties,
    [fillWidth, type]
  );
  const progressComplete = useMemo(
    () => fillWidth === progressTrackRef.current?.clientWidth,
    [fillWidth]
  );

  // Class names for different parts
  const fillClass = useMemo(
    () =>
      classNames(
        [
          styles.progress_fill,
          styles[type],
          styles[indeterminateStyle],
          progressComplete ? styles.complete : styles.progressive,
          RTL ? styles.rtl : '',
        ],
        { [styles[`progress_fill_${status}`]]: true }
      ),
    [progressComplete, status, indeterminateStyle, type, RTL]
  );
  // Compute CSS custom properties for sizing
  // Heights: sm=10px (compact), md=20px (default), lg=40px (prominent)
  // These are component-specific sizing values not mapped to design tokens
  const wrapperStyle = useMemo(
    () =>
      ({
        '--height': size === 'lg' ? '40px' : size === 'md' ? '20px' : '10px',
        '--width': `${width}px`,
      }) as CSSProperties,
    [size, width]
  );
  const wrapperClass = useMemo(
    () =>
      classNames(styles.progress_wrapper, {
        [styles[`progress_${status}`]]: true,
      }),
    [status]
  );
  const progressTrackClass = useMemo(
    () =>
      classNames(styles.progress_track, {
        [styles[`progress_track_${status}`]]: true,
        [styles.progress_track_rtl]: RTL,
      }),
    [status, RTL]
  );
  const progressPercentValClass = useMemo(
    () =>
      classNames(styles.progress_percent_value, {
        [styles[`progress_percent_value_${size}`]]: true,
      }),
    [size]
  );

  // Handle ref load
  const onRef = useCallback((ref: HTMLDivElement | null) => {
    progressTrackRef.current = ref;
    setLoaded(true);
  }, []);

  // Accessibility properties
  const ariaDefaultProps = useMemo(
    () => ({
      ...(label && { 'aria-label': label }),
      ...(statusText && { 'aria-valuetext': statusText }),
    }),
    [label, statusText]
  );
  const ariaProps = useMemo(
    () =>
      type === 'determinate'
        ? {
            'aria-valuemax': maxValue,
            'aria-valuemin': 0,
            'aria-valuenow': Math.round(progressPercent * maxValue),
          }
        : {},
    [maxValue, progressPercent, type]
  );

    return (
      <div
        className={wrapperClass}
        role="progressbar"
        style={wrapperStyle}
        {...ariaProps}
        {...ariaDefaultProps}
      >
        <div className={progressTrackClass} ref={onRef}>
          <span className={fillClass} style={fillStyle}>
            {canShowProgressValue && (
              <span className={progressPercentValClass}>
                {progressPercentValue}
              </span>
            )}
          </span>
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };
