import cls from 'classnames';
import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { isDark } from '../common/utils';
import { LoadingIndicatorProps } from './loading-indicator.model';
import styles from './loading-indicator.module.scss';

const speeds = {
  fast: 250,
  normal: 500,
  slow: 750,
};

const LoadingIndicator: FunctionComponent<LoadingIndicatorProps> = ({
  ariaLabel = 'Loading',
  count = 3,
  shape = 'square',
  rtl = false,
  speed = 'slow',
  size = 'sm',
  customSize = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const timerRef = useRef<number>(0);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setActiveIndex(prev => {
        if (prev >= 0 && prev < count - 1) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    }, speeds[speed]);

    return () => clearInterval(timerRef.current);
  }, [count, speed]);

  const isDarkMode = isDark();

  const wrapperClass = useMemo(() => {
    return cls(styles.wrapper, { [styles.rtl]: rtl });
  }, [rtl]);

  const transition = useMemo(() => {
    return {
      transition: `background ${speeds[speed]}ms ease-in-out`,
    };
  }, [speed]);

  const itemStyle = useMemo(() => {
    if (customSize) {
      return {
        ...transition,
        height: `${customSize}px`,
        width: `${customSize}px`,
      };
    } else {
      return transition;
    }
  }, [customSize, transition]);

  return (
    <div
      className={wrapperClass}
      role="progressbar"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy="true"
    >
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <span
            key={index}
            style={itemStyle}
            className={cls(
              { [styles[shape]]: true },
              styles.indicator,
              styles.flash,
              styles[size],
              customSize ? styles.custom_size : '',
              isDarkMode ? styles.dark : '',
              activeIndex === index ? styles.animate : styles.default
            )}
          ></span>
        ))}
    </div>
  );
};

LoadingIndicator.displayName = 'LoadingIndicator';

export { LoadingIndicator };
