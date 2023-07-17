import classNames from 'classnames';
import * as React from 'react';
import { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';
import { ProgressProps } from './progress-model';
import styles from './progress.module.scss';

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

  const progressPercent = useMemo(
    () => currentValue / maxValue,
    [currentValue]
  );

  const progressPercentValue = useMemo<string | number>(() => {
    const val = Math.round(progressPercent * 100);
    return val > 5 ? `${val}%` : 0;
  }, [progressPercent]);

  const canShowProgressValue = useMemo(
    () =>
      showProgressValue &&
      progressPercentValue !== 0 &&
      type !== 'indeterminate' &&
      size !== 'sm',
    [progressPercentValue]
  );

  const fillWidth = useMemo<number>(() => {
    const trackWidth = progressTrackRef.current?.clientWidth;
    if (trackWidth) {
      return Math.round(trackWidth * progressPercent);
    }
    return 0;
  }, [currentValue, progressPercent, loaded]);

  const fillStyle = useMemo(
    () =>
      ({
        '--width': type === 'determinate' ? `${fillWidth}px` : '50%',
      }) as CSSProperties,
    [fillWidth]
  );

  const progressComplete = useMemo(
    () => fillWidth === progressTrackRef.current?.clientWidth,
    [fillWidth]
  );

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
        {
          [styles[`progress_fill_${status}`]]: true,
        }
      ),
    [progressComplete, status]
  );

  const wrapperStyle = useMemo(
    () =>
      ({
        '--height':
          size === 'lg' ? `${40}px` : size === 'md' ? `${20}px` : `${10}px`,
        '--width': `${width}px`,
      }) as CSSProperties,
    []
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
    [status]
  );

  const progressPercentValClass = useMemo(
    () =>
      classNames(styles.progress_percent_value, {
        [styles[`progress_percent_value_${size}`]]: true,
      }),
    []
  );

  const onRef = useCallback((ref: HTMLDivElement | null) => {
    progressTrackRef.current = ref;
    setLoaded(true);
  }, []);

  const ariaDefaultProps = useMemo(() => {
    const props: { [k: string]: string } = {};

    if (label) {
      props['aria-label'] = label;
    }

    if (statusText) {
      props['aria-valuetext'] = statusText;
    }

    return props;
  }, [statusText]);

  const ariaProps = useMemo(
    () =>
      type === 'determinate' && {
        'aria-valuemax': maxValue,
        'aria-valuemin': 0,
        'aria-valuenow': Math.round(progressPercent * maxValue),
      },
    [maxValue, progressPercent, statusText]
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
            <span
              className={progressPercentValClass}
            >{`${progressPercentValue}`}</span>
          )}
        </span>
      </div>
    </div>
  );
};

Progress.displayName = 'Progress';

export { Progress };
