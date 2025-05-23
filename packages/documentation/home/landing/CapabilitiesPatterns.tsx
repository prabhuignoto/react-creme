import { isDark } from '@lib';
import { useMemo } from 'react';
import styles from './styles/capabilities-patterns.module.scss';

const CapabilitiesPatterns = () => {
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
            id="capabilitiesCircles"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <circle
              cx="25"
              cy="25"
              r="1.5"
              fill={
                isDarkMode ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.07)'
              }
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#capabilitiesCircles)" />
      </svg>

      {/* Blurred gradient spots */}
      <div className={styles.gradient_spot1}></div>
      <div className={styles.gradient_spot2}></div>
      <div className={styles.gradient_spot3}></div>

      {/* Animated wave pattern */}
      <svg
        className={styles.wave}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill={
            isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'
          }
          fillOpacity="1"
          d="M0,224L48,213.3C96,203,192,181,288,165.3C384,149,480,139,576,165.3C672,192,768,256,864,261.3C960,267,1056,213,1152,181.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default CapabilitiesPatterns;
