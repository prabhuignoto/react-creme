//
import { DocSearch } from '@docsearch/react';
import { ReactNode, useMemo, memo } from 'react';

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

const HeaderComponent: React.FC<{
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

  return (
    <header
      className={cx(
        'app-header',
        isLanding ? 'is-landing' : '',
        isDarkMode ? 'dark' : ''
      )}
    >
      <div className={styles.logo_wrapper}>
        <Logo isMobile={isMobile} onMenuClick={onOpen} />
      </div>
      <Badge label="beta" />
      <div
        className={styles.algolia_container}
        style={{ marginLeft: 'auto' }}
      >
        <DocSearch
          apiKey={import.meta.env.VITE_APP_ALGOLIA_API_KEY as string}
          appId={import.meta.env.VITE_APP_ALGOLIA_APP_ID as string}
          indexName={import.meta.env.VITE_APP_ALGOLIA_INDEX_NAME as string}
          hitComponent={AlgoliaHit}
          disableUserPersonalization
          placeholder="Search components..."
        />
      </div>
      <AppSettings />
    </header>
  );
};

const Header = memo(HeaderComponent);
HeaderComponent.displayName = 'Header';

export { Header };
