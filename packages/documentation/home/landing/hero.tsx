import { isDark } from '@lib';
import cx from 'classnames';
import { useMemo } from 'react';
import { HeroContent } from './hero-content';
import styles from './styles/hero.module.scss';
import BackgroundPatterns from './BackgroundPatterns';
import GeometricBackground from './GeometricBackground';

const Hero = () => {
  const isDarkMode = useMemo(() => isDark(), []);

  return (
    <div className={cx(styles.hero, isDarkMode ? styles.dark : '')}>
      <GeometricBackground />
      <BackgroundPatterns />
      <div className={styles['geometric-circles']}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
      <HeroContent />
    </div>
  );
};

export { Hero };
