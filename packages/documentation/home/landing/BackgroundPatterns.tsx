import { isDark } from '@lib';
import { useMemo } from 'react';
import styles from './styles/background-patterns.module.scss';

const BackgroundPatterns = () => {
  const isDarkMode = useMemo(() => isDark(), []);

  return (
    <div className={styles.patterns}>
      {/* Grid pattern */}
      <svg
        className={styles.grid}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="smallGrid"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 8 0 L 0 0 0 8"
              fill="none"
              stroke={
                isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
              }
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <rect width="80" height="80" fill="url(#smallGrid)" />
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke={
                isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
              }
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated dots */}
      <div className={styles.dots}>
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={styles.dot}
              style={{
                animationDelay: `${i * 0.3}s`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default BackgroundPatterns;
