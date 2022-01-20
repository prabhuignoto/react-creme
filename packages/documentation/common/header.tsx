import React from 'react';
import { AutoCompleteOption } from '../../lib/components/auto-suggest/auto-suggest.model';
import AlgoliaSearch from './algolia';
import { Badge, GithubLink } from './github-link';
import './header.scss';
import { Logo } from './logo';

const Header: React.FC<{
  isMobile?: boolean;
  onOpen?: () => void;
  onSearchSelection: (selected: AutoCompleteOption) => void;
}> = ({ isMobile, onOpen, onSearchSelection }) => {
  return (
    <header className="app-header">
      <Logo isMobile={isMobile} onMenuClick={onOpen} />
      <Badge />
      <div className="algolia-container" style={{ width: '250px' }}>
        <AlgoliaSearch onSelection={onSearchSelection} />
      </div>
      <GithubLink />
    </header>
  );
};

export { Header };
