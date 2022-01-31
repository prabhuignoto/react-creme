import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Menu } from '../../../lib/components';
import { Theme } from '../../../lib/components/common/theme-provider';
import { Blueberry, Default, Glacier } from '../app-themes';
import './theme-ui.scss';

interface ThemeSwitcherProps {
  onSelection: (selected: Theme) => void;
}

const ThemeSwitcherUI: React.FunctionComponent<ThemeSwitcherProps> = ({
  onSelection,
}) => {
  return (
    <div className="rc-document-theme-ui">
      <Menu
        position="right"
        onSelected={selected => {
          if (selected === 'Default') {
            onSelection(Default);
          } else if (selected === 'Glacier') {
            onSelection(Glacier);
          } else if (selected === 'Blueberry') {
            onSelection(Blueberry);
          }
        }}
        items={[
          {
            name: 'Default',
          },
          {
            name: 'Glacier',
          },
          {
            name: 'Blueberry',
          },
        ]}
      >
        <FontAwesomeIcon icon={faPalette} size="2x" />
      </Menu>
    </div>
  );
};

export { ThemeSwitcherUI };
