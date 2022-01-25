import React from 'react';
import { AutoSuggestOption } from '../../lib/components/auto-suggest/auto-suggest.model';
import AlgoliaSearch from './algolia';
import { GithubLink } from './github-link';
import './header.scss';
import { Logo } from './logo';
import { ThemeSwitcher } from './theme-switcher';

const Header: React.FC<{
  isMobile?: boolean;
  onOpen?: () => void;
  onSearchSelection: (selected: AutoSuggestOption) => void;
}> = ({ isMobile, onOpen, onSearchSelection }) => {
  return (
    <header className="app-header">
      <Logo isMobile={isMobile} onMenuClick={onOpen} />
      {/* <Badge /> */}
      {/* <ThemeSwitcher /> */}
      {!isMobile && (
        <div className="algolia-container" style={{ width: '200px' }}>
          <AlgoliaSearch onSelection={onSearchSelection} />
        </div>
      )}
      <GithubLink />
    </header>
  );
};

export { Header };
