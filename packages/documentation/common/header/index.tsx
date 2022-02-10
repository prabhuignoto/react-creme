import React from 'react';
import { AutoSuggestOption } from '../../../lib/components/auto-suggest/auto-suggest.model';
import { AppSettings } from '../app-settings';
import { Badge, GithubLink } from '../github-link';
import { Logo } from '../logo';
import './header.scss';

const Header: React.FC<{
  isMobile?: boolean;
  onOpen?: () => void;
  onSearchSelection: (selected: AutoSuggestOption) => void;
}> = ({ isMobile, onOpen }) => {
  return (
    <header className="app-header">
      <Logo isMobile={isMobile} onMenuClick={onOpen} />
      <Badge label="alpha" />
      {/* <ThemeSwitcher /> */}
      {/* {!isMobile && (
        <div className="algolia-container" style={{ width: '200px' }}>
          <AlgoliaSearch onSelection={onSearchSelection} />
        </div>
      )} */}
      <AppSettings />
      <GithubLink />
    </header>
  );
};

export { Header };
