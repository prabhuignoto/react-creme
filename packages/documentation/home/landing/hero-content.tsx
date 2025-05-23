// import { faGithub } from '@fortawesome/free-brands-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, isDark } from '@lib';
import cx from 'classnames';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
// import { Badges } from '../badges';
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

  // const openGithubLinkOnNewTab = () => {
  //   window.open('https://github.com/prabhuignoto/react-creme', '_blank');
  // };

  return (
    <div className={styles.content}>
      <div className={styles.left_column}>
        <h1 className={styles.header}>React Creme</h1>
        <p className={subTextClass}>
          Elevate your React applications with React Creme, a modern UI design
          system for building beautiful, accessible, and high-performance user
          interfaces.
        </p>
        <div className={styles.buttons}>
          <Button
            label="Get Started"
            onClick={handleGetStarted}
            size="lg"
            type="primary"
          />
          <Button
            label="Explore Components"
            onClick={() => nav('/components')}
            size="lg"
            type="default"
          />
        </div>
        {/* <Badges /> */}
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
