import { Github } from 'lucide-react';
import classNames from 'classnames';
import { useMemo } from 'react';

import { isDark } from '@lib';
import { useAtomValue } from 'jotai';
import { themeState } from '../../atoms/home';
import styles from './github-link.module.scss';

const GithubLink = () => {
  const theme = useAtomValue(themeState);

  return (
    <div className={classNames(styles.link, theme.darkMode ? styles.dark : '')}>
      <a
        href="https://github.com/prabhuignoto/react-creme/"
        target="_blank"
        rel="noreferrer"
        aria-label="Github"
      >
        <Github size={32} />
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
