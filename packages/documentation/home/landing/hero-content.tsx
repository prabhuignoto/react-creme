import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, isDark } from '@lib';
import cx from 'classnames';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Badges } from '../badges';
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

  const openGithubLinkOnNewTab = () => {
    window.open('https://github.com/prabhuignoto/react-creme', '_blank');
  };

  return (
    <div className={styles.content}>
      <div className={styles.left_column}>
        <h1 className={styles.header}>React Creme</h1>
        <p className={subTextClass}>
          Start building React applications with a clean and modern design
          system.
        </p>
        <div className={styles.buttons}>
          <Button
            label="Get Started"
            onClick={handleGetStarted}
            size="lg"
            type="primary"
          ></Button>
          <Button
            label="Github"
            size="lg"
            style={{ width: '100px' }}
            onClick={openGithubLinkOnNewTab}
          >
            <FontAwesomeIcon icon={faGithub} size="1x" />
          </Button>
        </div>
        <Badges />
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
