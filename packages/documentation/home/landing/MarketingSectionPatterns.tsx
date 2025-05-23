import { isDark } from '@lib';
import { useMemo } from 'react';
import styles from './styles/marketing-patterns.module.scss';

const MarketingSectionPatterns = () => {
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
            id="marketingSmallGrid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke={
                isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'
              }
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="marketingGrid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="100" fill="url(#marketingSmallGrid)" />
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke={
                isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
              }
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#marketingGrid)" />
      </svg>

      {/* Floating shapes */}
      <div className={styles.shapes}>
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`${styles.shape} ${styles[`shape${i % 3}`]}`}
              style={{
                animationDelay: `${i * 0.7}s`,
                left: `${15 + ((i * 15) % 80)}%`,
                top: `${10 + ((i * 20) % 60)}%`,
              }}
            ></div>
          ))}
      </div>

      {/* Subtle gradient overlay */}
      <div className={styles.gradientOverlay}></div>
    </div>
  );
};

export default MarketingSectionPatterns;
