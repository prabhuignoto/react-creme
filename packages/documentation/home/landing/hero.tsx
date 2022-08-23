import { isDark } from '@lib';
import cx from 'classnames';
import { useMemo } from 'react';
import { HeroContent } from './hero-content';
import styles from './styles/hero.module.scss';

const Hero = () => {
  const isDarkMode = useMemo(() => isDark(), []);

  return (
    <div className={cx(styles.hero, isDarkMode ? styles.dark : '')}>
      <HeroContent />
    </div>
  );
};

export { Hero };
