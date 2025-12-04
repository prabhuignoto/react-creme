import { Button, isDark } from '@lib';
import cx from 'classnames';
import { FunctionComponent, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { GitHub, ArrowRight, Package } from 'react-feather';
import styles from '../styles/hero-v2.module.scss';

const HeroV2: FunctionComponent = () => {
  const nav = useNavigate();
  const isDarkMode = useMemo(() => isDark(), []);
  const [currentCodeExample, setCurrentCodeExample] = useState(0);

  const codeExamples = [
    {
      code: `import { Button, Card } from 'react-creme';
import 'react-creme/css';

<Card>
  <Button type="primary">
    Get Started
  </Button>
</Card>`,
      title: 'Import & Use',
    },
    {
      code: `import { ThemeProvider } from 'react-creme';

<ThemeProvider
  theme={{
    primaryColor: '#007bff',
    darkMode: true
  }}
>
  <App />
</ThemeProvider>`,
      title: 'With Theme',
    },
    {
      code: `// Only imports what you use
import { DataGrid } from 'react-creme';

// Final bundle: ~8kb
// Not 350kb like Material-UI!`,
      title: 'Tree-Shakeable',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCodeExample(prev => (prev + 1) % codeExamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const socialProof = [
    // Temporarily disabled - stats need verification
    // { icon: <Star size={16} />, label: 'GitHub Stars', value: '2.5k+' },
    // { icon: <Download size={16} />, label: 'Weekly Downloads', value: '10k+' },
    { icon: <Package size={16} />, label: 'Version', value: 'v0.26.0' },
  ];

  const handleGetStarted = () => {
    nav('/home');
  };

  const handleViewComponents = () => {
    nav('/accordion');
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
              Lightweight. Modern.{' '}
              <span className={styles.highlight}>Yours.</span>
            </span>
          </h1>

          <p className={styles.hero_subtitle}>
            55+ production-ready components at 118kb. Built for React 19 with
            CSS Modules.
            <span className={styles.subtitle_highlight}>
              {' '}
              No design language lock-in, no CSS-in-JS overhead.
            </span>
          </p>

          {/* Social Proof Badges */}
          <div className={styles.social_proof}>
            {socialProof.map((item, index) => (
              <div key={index} className={styles.proof_badge}>
                <div className={styles.proof_icon}>{item.icon}</div>
                <div className={styles.proof_content}>
                  <div className={styles.proof_value}>{item.value}</div>
                  <div className={styles.proof_label}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>

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
              <svg
                className={styles.feature_icon}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>TypeScript Strict Mode</span>
            </div>
            <div className={styles.feature_item}>
              <svg
                className={styles.feature_icon}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Zero Runtime CSS</span>
            </div>
            <div className={styles.feature_item}>
              <svg
                className={styles.feature_icon}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Tree-Shakeable</span>
            </div>
          </div>
        </div>

        {/* Right Column - Animated Code Example */}
        <div className={styles.hero_visual}>
          <div className={styles.code_showcase}>
            <div className={styles.code_header}>
              <div className={styles.window_controls}>
                <span className={styles.control_dot}></span>
                <span className={styles.control_dot}></span>
                <span className={styles.control_dot}></span>
              </div>
              <span className={styles.code_title}>
                {codeExamples[currentCodeExample].title}
              </span>
              <div className={styles.code_indicators}>
                {codeExamples.map((_, index) => (
                  <button
                    key={index}
                    className={cx(
                      styles.indicator_dot,
                      currentCodeExample === index && styles.active
                    )}
                    onClick={() => setCurrentCodeExample(index)}
                    aria-label={`View example ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className={styles.code_content}>
              <pre className={styles.code_block}>
                <code>{codeExamples[currentCodeExample].code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HeroV2 };
