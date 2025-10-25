import { Button, isDark } from '@lib';
import cx from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { GitHub, ArrowRight } from 'react-feather';
import styles from '../styles/hero-v2.module.scss';

const HeroV2: FunctionComponent = () => {
  const nav = useNavigate();
  const isDarkMode = useMemo(() => isDark(), []);

  const handleGetStarted = () => {
    nav('/home');
  };

  const handleViewComponents = () => {
    nav('/buttons');
  };

  const handleGitHub = () => {
    window.open('https://github.com/prabhuignoto/react-creme', '_blank');
  };

  return (
    <div className={cx(styles.hero, isDarkMode ? styles.dark : '')}>
      <div className={styles.hero_container}>
        {/* Left Column - Content */}
        <div className={styles.hero_content}>
          <div className={styles.tagline_badge}>
            <span className={styles.badge_dot}></span>
            <span className={styles.badge_text}>Now with React 19 Support</span>
          </div>

          <h1 className={styles.hero_title}>
            <span className={styles.title_main}>React Creme</span>
            <span className={styles.title_tagline}>
              Lightweight. Modern. <span className={styles.highlight}>Yours.</span>
            </span>
          </h1>

          <p className={styles.hero_subtitle}>
            45+ production-ready components at 55kb. Built for React 19 with CSS Modules.
            <span className={styles.subtitle_highlight}>
              {' '}No design language lock-in, no CSS-in-JS overhead.
            </span>
          </p>

          <div className={styles.hero_buttons}>
            <Button
              label="Get Started"
              onClick={handleGetStarted}
              size="lg"
              type="primary"
            >
              <span style={{ marginLeft: '8px' }}>
                <ArrowRight size={18} />
              </span>
            </Button>
            <Button
              label="View Components"
              onClick={handleViewComponents}
              size="lg"
            />
            <button
              className={styles.github_button}
              onClick={handleGitHub}
              aria-label="View on GitHub"
            >
              <GitHub size={20} />
              <span>GitHub</span>
            </button>
          </div>

          <div className={styles.hero_features}>
            <div className={styles.feature_item}>
              <svg className={styles.feature_icon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>TypeScript Strict Mode</span>
            </div>
            <div className={styles.feature_item}>
              <svg className={styles.feature_icon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Zero Runtime CSS</span>
            </div>
            <div className={styles.feature_item}>
              <svg className={styles.feature_icon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Tree-Shakeable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HeroV2 };
