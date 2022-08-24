import { isDark } from '@lib';
import cx from 'classnames';
import { useMemo } from 'react';
import { ReactComponent as GithubSVG } from '../../images/github.svg';
import styles from './footer.module.scss';

function Footer() {
  const isDarkMode = useMemo(() => isDark(), []);
  return (
    <div className={styles.app_footer}>
      {/* <a
        href="javascript:void(0);"
        style={{
          marginBottom: '1rem',
          marginLeft: 'auto',
          marginRight: '1rem',
          marginTop: 'auto',
        }}
        onClick={ev => {
          ev.preventDefault();
          window.scrollTo({
            behavior: 'smooth',
            left: 0,
            top: 0,
          });
        }}
      >
        Back to Top
      </a> */}
      <div className={cx(styles.footer, isDarkMode ? styles.dark : '')}>
        <div className={styles.footer_content}>
          <a
            href="https://www.twitter.com/prabhumurthy2"
            target="_blank"
            rel="noreferrer"
          >
            Made with ❤️ by @prabhuignoto
          </a>
        </div>
        <div className={styles.credit}>
          <a
            href="https://github.com/prabhuignoto/react-creme/"
            target="_blank"
            rel="noreferrer"
          >
            💪 Proudly built with @react-creme
          </a>
        </div>
        <div className="author">
          <a
            href="https://www.prabhumurthy.com"
            target="_blank"
            rel="noreferrer"
          >
            &copy; {new Date().getFullYear()} PrabhuMurthy.com
          </a>
        </div>
        <div className={styles.github_link}>
          <a
            href="https://github.com/prabhuignoto"
            target="__blank"
            rel="noreferrer"
          >
            <GithubSVG />
            Github
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
