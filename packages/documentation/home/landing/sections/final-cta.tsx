import { Button, isDark } from '@lib';
import cx from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, Book, GitHub } from 'react-feather';
import styles from '../styles/final-cta.module.scss';

const FinalCTA: FunctionComponent = () => {
  const nav = useNavigate();
  const isDarkMode = useMemo(() => isDark(), []);

  const handleGetStarted = () => {
    nav('/home');
  };

  const handleViewDocs = () => {
    nav('/home');
  };

  const handleGitHub = () => {
    window.open('https://github.com/prabhuignoto/react-creme', '_blank');
  };

  return (
    <section className={cx(styles.cta_section, isDarkMode ? styles.dark : '')}>
      <div className={styles.cta_container}>
        <div className={styles.cta_content}>
          <h2 className={styles.cta_title}>Ready to Build?</h2>
          <p className={styles.cta_subtitle}>
            Start building faster, lighter React apps with React Creme today.
            <br />
            Join developers who choose performance without compromises.
          </p>

          <div className={styles.cta_buttons}>
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
              label="View Documentation"
              onClick={handleViewDocs}
              size="lg"
            >
              <span style={{ marginRight: '8px' }}>
                <Book size={18} />
              </span>
            </Button>
            <button
              className={styles.github_link}
              onClick={handleGitHub}
              aria-label="Star on GitHub"
            >
              <GitHub size={20} />
              <span>Star on GitHub</span>
            </button>
          </div>

          <div className={styles.cta_features}>
            <div className={styles.feature}>
              <span className={styles.feature_value}>55kb</span>
              <span className={styles.feature_label}>Bundle Size</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.feature}>
              <span className={styles.feature_value}>45+</span>
              <span className={styles.feature_label}>Components</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.feature}>
              <span className={styles.feature_value}>React 19</span>
              <span className={styles.feature_label}>Modern Stack</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.feature}>
              <span className={styles.feature_value}>MIT</span>
              <span className={styles.feature_label}>License</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { FinalCTA };
