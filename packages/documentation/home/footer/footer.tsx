import { isDark } from '@lib';
import cx from 'classnames';
import { useMemo, memo } from 'react';
import { ArrowUp } from 'lucide-react';
import { ReactComponent as GithubSVG } from '../../images/github.svg';
import styles from './footer.module.scss';

function FooterComponent() {
  const isDarkMode = useMemo(() => isDark(), []);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: 0,
    });
  };

  return (
    <div className={styles.app_footer}>
      <footer className={cx(styles.footer, isDarkMode ? styles.dark : '')}>
        <div className={styles.footer_container}>
          {/* Column 1: About */}
          <div className={styles.footer_column}>
            <h3 className={styles.column_title}>React Creme</h3>
            <p className={styles.column_description}>
              A modern UI toolkit for React featuring 57 high-quality,
              accessible, and themeable components.
            </p>
            <div className={styles.social_links}>
              <a
                href="https://github.com/prabhuignoto/react-creme"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className={styles.social_link}
              >
                <GithubSVG />
              </a>
            </div>
          </div>

          {/* Column 2: Resources */}
          <div className={styles.footer_column}>
            <h3 className={styles.column_title}>Resources</h3>
            <ul className={styles.footer_links}>
              <li>
                <a
                  href="https://github.com/prabhuignoto/react-creme"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/prabhuignoto/react-creme/tree/master/packages/lib/components"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Components
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/prabhuignoto/react-creme/blob/master/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Getting Started
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/prabhuignoto/react-creme/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Community */}
          <div className={styles.footer_column}>
            <h3 className={styles.column_title}>Community</h3>
            <ul className={styles.footer_links}>
              <li>
                <a
                  href="https://github.com/prabhuignoto/react-creme/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Issues
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/prabhuignoto/react-creme/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discussions
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/prabhuignoto/react-creme/blob/master/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contributing
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/react-creme"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  npm Package
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className={styles.footer_bottom}>
          <div className={styles.footer_bottom_content}>
            <p className={styles.copyright}>
              &copy; {currentYear} PrabhuMurthy.com. All rights reserved.
            </p>
            <p className={styles.made_with}>
              Made with ❤️ by @prabhuignoto
            </p>
          </div>

          <button
            className={styles.back_to_top}
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp size={20} />
            <span>Top</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

const Footer = memo(FooterComponent);
FooterComponent.displayName = 'Footer';

export default Footer;
