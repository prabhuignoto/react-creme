import {
  faGithub,
  faTwitter,
  faLinkedin,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons';
import {
  faBook,
  faFileAlt,
  faCode,
  faShieldAlt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, isDark } from '@lib';
import cx from 'classnames';
import { useMemo, useEffect, useState } from 'react';
import styles from './footer.module.scss';

const Footer = () => {
  const isDarkMode = useMemo(() => isDark(), []);
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cx(styles.footer, isDarkMode ? styles.dark : '')}>
      <div className={styles.footer_content}>
        <div className={styles.footer_section}>
          <h3 className={styles.footer_heading}>React Creme</h3>
          <p className={styles.footer_text}>
            A modern UI design system for building beautiful, accessible, and
            high-performance React applications with a focus on developer
            experience.
          </p>
          <div className={styles.social_links}>
            <Link
              href="https://github.com/prabhuignoto/react-creme"
              target="_blank"
              className={styles.social_link}
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </Link>
            <Link
              href="https://twitter.com/prabhumurthy2"
              target="_blank"
              className={styles.social_link}
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/prabhumurthy/"
              target="_blank"
              className={styles.social_link}
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>
            <Link
              href="https://discord.gg/react-creme"
              target="_blank"
              className={styles.social_link}
              aria-label="Discord"
            >
              <FontAwesomeIcon icon={faDiscord} />
            </Link>
          </div>
        </div>

        <div className={styles.footer_section}>
          <h3 className={styles.footer_heading}>Quick Links</h3>
          <ul className={styles.footer_links}>
            <li>
              <Link href="/home" className={styles.footer_link}>
                <FontAwesomeIcon icon={faBook} /> Documentation
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/prabhuignoto/react-creme"
                target="_blank"
                className={styles.footer_link}
              >
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/prabhuignoto/react-creme/releases"
                target="_blank"
                className={styles.footer_link}
              >
                <FontAwesomeIcon icon={faFileAlt} /> Release Notes
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/prabhuignoto/react-creme/blob/master/CONTRIBUTING.md"
                target="_blank"
                className={styles.footer_link}
              >
                <FontAwesomeIcon icon={faCode} /> Contributing
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footer_section}>
          <h3 className={styles.footer_heading}>Resources</h3>
          <ul className={styles.footer_links}>
            <li>
              <Link href="/components" className={styles.footer_link}>
                <FontAwesomeIcon icon={faUsers} /> Components
              </Link>
            </li>
            <li>
              <Link href="/security" className={styles.footer_link}>
                <FontAwesomeIcon icon={faShieldAlt} /> Security
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/prabhuignoto/react-creme#features"
                target="_blank"
                className={styles.footer_link}
              >
                <FontAwesomeIcon icon={faCode} /> Features
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.newsletter}>
        <h3>Stay Updated</h3>
        <p>
          Subscribe to our newsletter to get the latest updates on new
          components, features, and best practices.
        </p>
        <div className={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input}
          />
          <button className={styles.button}>Subscribe</button>
        </div>
      </div>

      <div className={styles.footer_bottom}>
        <p>&copy; {currentYear} React Creme. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export { Footer };
