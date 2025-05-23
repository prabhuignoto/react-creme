//
import { DocSearch } from '@docsearch/react';
import { ReactNode, useMemo } from 'react';

import { isDark } from '@lib';
import cx from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { AutoSuggestOption } from '../../../lib/components/auto-suggest/auto-suggest.model';
import { Badge } from '../../common/github-link';
import { AppSettings } from '../app-settings';
import { Logo } from '../logo';
import styles from './header.module.scss';

const AlgoliaHit = ({
  hit,
  children,
}: {
  children: ReactNode;
  hit: { url: string };
}) => {
  const route = `/${hit.url.split('/').pop()}`;

  return (
    <div className="rc-algolia-hit" style={{ width: '100%' }}>
      <Link to={route}>{children}</Link>
    </div>
  );
};

AlgoliaHit.displayName = 'AlgoliaHit';

const Header: React.FC<{
  isMobile?: boolean;
  onOpen?: () => void;
  onSearchSelection: (selected: AutoSuggestOption) => void;
}> = ({ isMobile, onOpen }) => {
  const location = useLocation();
  const isDarkMode = useMemo(() => isDark(), []);

  const isLanding = useMemo(
    () => location.pathname === '/landing' || location.pathname === '/',
    [location]
  );

  const navLinks = [
    { to: '/components', label: 'Components' },
    { to: '/documentation', label: 'Documentation' },
    { to: '/examples', label: 'Examples' },
  ];

  return (
    <header
      className={cx(
        styles.header,
        isLanding ? 'is-landing' : '',
        isDarkMode ? 'dark' : ''
      )}
    >
      {isMobile && (
        <button className={styles.mobile_menu_button} onClick={onOpen}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
      )}

      <div className={styles.logo_wrapper}>
        <Logo isMobile={isMobile} onMenuClick={onOpen} />
        <span className={styles.logo_text}>React Creme</span>
      </div>

      {!isMobile && (
        <nav className={styles.nav_links}>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={cx(styles.nav_link, {
                [styles.active]: location.pathname.startsWith(to),
              })}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}

      <div className={styles.header_right}>
        {!isMobile && (
          <div className={styles.algolia_container}>
            <DocSearch
              apiKey={import.meta.env.VITE_APP_ALGOLIA_API_KEY as string}
              appId={import.meta.env.VITE_APP_ALGOLIA_APP_ID as string}
              indexName={import.meta.env.VITE_APP_ALGOLIA_INDEX_NAME as string}
              hitComponent={AlgoliaHit}
              disableUserPersonalization
            />
          </div>
        )}

        <div className={styles.badge_container}>
          <Badge label="beta" />
        </div>

        <AppSettings />
      </div>
    </header>
  );
};

export { Header };
