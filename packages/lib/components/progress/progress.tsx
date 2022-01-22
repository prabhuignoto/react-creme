import classNames from 'classnames';
import * as React from 'react';
import { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';
import { ProgressProps } from './progress-model';
import './progress.scss';

const Progress: React.FunctionComponent<ProgressProps> = ({
  currentValue = 0,
  infiniteStyle = 'disappear',
  maxValue = 100,
  showProgressValue = false,
  size = 'md',
  status = 'default',
  type = 'progressive',
  width = 250,
  RTL = false,
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
      type !== 'infinite' &&
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
        '--width': type === 'progressive' ? `${fillWidth}px` : '50%',
      } as CSSProperties),
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
          'rc-progress-fill',
          type,
          infiniteStyle,
          progressComplete ? 'complete' : '',
        ],
        {
          [`rc-progress-fill-${status}`]: true,
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
      } as CSSProperties),
    []
  );

  const wrapperClass = useMemo(
    () =>
      classNames('rc-progress-wrapper', {
        [`rc-progress-${status}`]: true,
      }),
    [status]
  );

  const progressTrackClass = useMemo(
    () =>
      classNames('rc-progress-track', {
        [`rc-progress-track-${status}`]: true,
        'rc-progress-track-rtl': RTL,
      }),
    [status]
  );

  const progressPercentValClass = useMemo(
    () =>
      classNames(
        'rc-progress-percent-value',
        `rc-progress-percent-value-${size}`
      ),
    []
  );

  const onRef = useCallback((ref: HTMLDivElement) => {
    progressTrackRef.current = ref;
    setLoaded(true);
  }, []);

  return (
    <div
      aria-valuemin={0}
      aria-valuemax={maxValue}
      aria-valuenow={Math.round(progressPercent * maxValue)}
      className={wrapperClass}
      role="progressbar"
      style={wrapperStyle}
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
