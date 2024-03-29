import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useMemo } from 'react';

import { isDark } from '@lib';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../atoms/home';
import styles from './github-link.module.scss';

const GithubLink = () => {
  const theme = useRecoilValue(themeState);

  return (
    <div className={classNames(styles.link, theme.darkMode ? styles.dark : '')}>
      <a
        href="https://github.com/prabhuignoto/react-creme/"
        target="_blank"
        rel="noreferrer"
        aria-label="Github"
      >
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
    </div>
  );
};

const Badge = ({ label }: { label: string }) => {
  const isDarkMode = useMemo(() => isDark(), []);

  return (
    <div
      className={classNames(styles.badge, isDarkMode ? styles.dark : '')}
      aria-label="beta"
    >
      {label}
    </div>
  );
};

export { GithubLink, Badge };
