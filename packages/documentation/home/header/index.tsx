// import React from 'react';
import { DocSearch } from '@docsearch/react';
import React from 'react';
import { AutoSuggestOption } from '../../../lib/components/auto-suggest/auto-suggest.model';
import { Badge } from '../../common/github-link';
import { AppSettings } from '../app-settings';
import { Logo } from '../logo';
import './header.scss';

const Header: React.FC<{
  isMobile?: boolean;
  onOpen?: () => void;
  onSearchSelection: (selected: AutoSuggestOption) => void;
}> = ({ isMobile, onOpen }) => {
  return (
    <header className="app-header">
      <div className="logo_wrapper">
        <Logo isMobile={isMobile} onMenuClick={onOpen} />
      </div>
      <Badge label="alpha" />
      {/* <ThemeSwitcher /> */}
      {!isMobile && (
        <div className="algolia-container" style={{ marginLeft: 'auto' }}>
          <DocSearch
            apiKey={import.meta.env.VITE_APP_ALGOLIA_API_KEY as string}
            appId={import.meta.env.VITE_APP_ALGOLIA_APP_ID as string}
            indexName={import.meta.env.VITE_APP_ALGOLIA_INDEX_NAME as string}
          />
        </div>
      )}
      <AppSettings />
    </header>
  );
};

export { Header };
