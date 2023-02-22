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
  count = 3,
  shape = 'square',
  rtl = false,
  speed = 'slow',
  size = 'md',
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
  }, []);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const isDarkMode = useMemo(() => isDark(), []);

  const wrapperClass = useMemo(() => {
    return cls(styles.wrapper, rtl ? styles.rtl : '');
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
    <ul className={wrapperClass} role="progressbar">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <li
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
          ></li>
        ))}
    </ul>
  );
};

export { LoadingIndicator };
