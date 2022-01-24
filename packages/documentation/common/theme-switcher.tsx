import React, { useCallback, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { Dropdown } from '../../lib/components';
import { themeState } from '../atoms/home';
import { Coffee, Default, Glacier, Tangerine } from './app-themes';

const ThemeSwitcher: React.FC = () => {
  const setTheme = useSetRecoilState(themeState);

  const options = useRef([
    {
      name: 'Default',
      value: 'default',
    },
    {
      name: 'Glacier',
      value: 'glacier',
    },
    {
      name: 'Coffee',
      value: 'coffee',
    },
    {
      name: 'Tangeringe',
      value: 'tangerine',
    },
  ]);

  const handleSelection = useCallback((selected: string | string[]) => {
    if (selected === 'default') {
      setTheme(Default);
    } else if (selected === 'glacier') {
      setTheme(Glacier);
    } else if (selected === 'coffee') {
      setTheme(Coffee);
    } else if (selected === 'tangerine') {
      setTheme(Tangerine);
    }
  }, []);

  return (
    <div style={{ marginLeft: 'auto', marginRight: '1rem', width: '180px' }}>
      <Dropdown
        options={options.current}
        focusable
        placeholder="Switch theme ..."
        onSelected={handleSelection}
      />
    </div>
  );
};

export { ThemeSwitcher };
