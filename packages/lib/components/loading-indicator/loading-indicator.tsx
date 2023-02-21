import cls from 'classnames';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { LoadingIndicatorProps } from './loading-indicator.model';
import styles from './loading-indicator.module.scss';

const speeds = {
  fast: 250,
  normal: 500,
  slow: 1000,
};

const LoadingIndicator: FunctionComponent<LoadingIndicatorProps> = ({
  count = 3,
  shape = 'circle',
  rtl = false,
  speed = 'slow',
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (activeIndex >= 0 && activeIndex < count - 1) {
        setActiveIndex(prev => prev + 1);
      } else {
        setActiveIndex(0);
      }
    }, speeds[speed]);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const wrapperClass = useMemo(() => {
    return cls(styles.wrapper, rtl ? styles.rtl : '');
  }, [rtl]);

  const itemStyle = useMemo(() => {
    return {
      transition: `background ${speeds[speed]}ms ease-in-out`,
    };
  }, [speed]);

  return (
    <ul className={wrapperClass}>
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
              activeIndex === index ? styles.animate : styles.default
            )}
          ></li>
        ))}
    </ul>
  );
};

export { LoadingIndicator };
