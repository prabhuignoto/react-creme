import classNames from 'classnames';
import React from 'react';
import { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';
import { ProgressProps } from './progress-model';
import styles from './progress.module.scss';

/**
 * Progress
 * @property {number} currentValue - The current value of the progress.
 * @property {string} indeterminateStyle - Style for indeterminate progress.
 * @property {number} maxValue - The maximum value for progress.
 * @property {boolean} showProgressValue - Whether to show progress percentage.
 * @property {string} size - The size of the progress bar.
 * @property {string} status - The status of the progress bar.
 * @property {string} type - Type of progress bar ('determinate' or 'indeterminate').
 * @property {number} width - The width of the progress bar.
 * @property {boolean} RTL - Right-to-left layout.
 * @property {string} statusText - Status text for accessibility.
 * @property {string} label - Label text for accessibility.
 * @returns {JSX.Element} The Progress component.
 */

const Progress: React.FunctionComponent<ProgressProps> = ({
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
    [currentValue]
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
    [progressPercentValue, type, size]
  );

  // Determine fill width
  const fillWidth = useMemo<number>(() => {
    const trackWidth = progressTrackRef.current?.clientWidth;
    return trackWidth ? Math.round(trackWidth * progressPercent) : 0;
  }, [currentValue, progressPercent, loaded]);

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
};

Progress.displayName = 'Progress';

export { Progress };
