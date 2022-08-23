import { Button, isDark } from '@lib';
import cx from 'classnames';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Sink1, Sink2, Sink3 } from './kitchen-sink';
import styles from './styles/hero-content.module.scss';

const HeroContent = () => {
  const nav = useNavigate();
  const isDarkMode = useMemo(() => isDark(), []);

  const handleGetStarted = () => {
    nav('/home');
  };

  const subTextClass = useMemo(
    () => cx(styles.sub_text, isDarkMode ? styles.dark : ''),
    [isDarkMode]
  );

  return (
    <div className={styles.content}>
      <div className={styles.left_column}>
        <h1 className={styles.header}>React Creme</h1>
        <p className={subTextClass}>
          Start building your React applications with a clean and modern design
          system.
        </p>
        <Button
          label="Get Started"
          onClick={handleGetStarted}
          size="lg"
          style={{ width: '100px' }}
        />
        {/* <button className={styles.get_started_btn} onClick={handleGetStarted}>
          Get Started
        </button> */}
      </div>
      <div className={styles.right_column}>
        <Sink1 isDark={isDarkMode} />
        <Sink2 isDark={isDarkMode} />
        <Sink3 isDark={isDarkMode} />
      </div>
    </div>
  );
};

export { HeroContent };
