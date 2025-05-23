import { Hero } from './hero';
import { NavBar } from './navbar';
import { MarketingSection } from './MarketingSection';
import { CapabilitiesSection } from './CapabilitiesSection';
import styles from './styles/landing.module.scss';
import { useMemo } from 'react';
import { isDark } from '@lib';
import cx from 'classnames';

const LandingPage = () => {
  const isDarkMode = useMemo(() => isDark(), []);

  return (
    <div className={styles.landing}>
      <NavBar />
      <Hero />

      <section className={styles.metrics_section}>
        <div className={styles.metric_card}>
          <div className={styles.number}>45+</div>
          <div className={styles.label}>UI Components</div>
        </div>
        <div className={styles.metric_card}>
          <div className={styles.number}>42kb</div>
          <div className={styles.label}>Minified Bundle Size</div>
        </div>
        <div className={styles.metric_card}>
          <div className={styles.number}>100%</div>
          <div className={styles.label}>TypeScript Coverage</div>
        </div>
      </section>

      <MarketingSection isDarkMode={isDarkMode} />
      <CapabilitiesSection isDarkMode={isDarkMode} />

      <section
        className={cx(styles.cta_section, isDarkMode ? styles.dark : '')}
      >
        <h2>Ready to Build Better?</h2>
        <p>
          Start creating beautiful, accessible, and high-performance React
          applications today with React Creme's comprehensive component library.
        </p>
        <div className={styles.cta_buttons}>
          <button className={styles.primary_button}>Get Started</button>
          <button className={styles.secondary_button}>
            View Documentation
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
