import React from 'react';
import { AutoSuggestOption } from '../../lib/components/auto-suggest/auto-suggest.model';
import { Theme } from '../../lib/components/common/theme-provider';
import { GithubLink } from './github-link';
import './header.scss';
import { Logo } from './logo';
import { ThemeSwitcherUI } from './theme-ui';

const Header: React.FC<{
  isMobile?: boolean;
  onOpen?: () => void;
  onSearchSelection: (selected: AutoSuggestOption) => void;
  onThemeSelection: (selected: Theme) => void;
}> = ({ isMobile, onOpen, onThemeSelection }) => {
  return (
    <header className="app-header">
      <Logo isMobile={isMobile} onMenuClick={onOpen} />
      {/* <Badge /> */}
      {/* <ThemeSwitcher /> */}
      {/* {!isMobile && (
        <div className="algolia-container" style={{ width: '200px' }}>
          <AlgoliaSearch onSelection={onSearchSelection} />
        </div>
      )} */}
      <ThemeSwitcherUI onSelection={onThemeSelection} />
      <GithubLink />
    </header>
  );
};

export { Header };
