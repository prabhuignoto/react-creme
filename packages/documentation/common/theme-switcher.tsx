import React, { useCallback, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { Dropdown } from '../../lib/components';
import { themeState } from '../atoms/home';
import {
  Blueberry,
  BlueRage,
  Coffee,
  Default,
  Glacier,
  Surf,
  Timeless,
} from './app-themes';

const ThemeSwitcher: React.FC = () => {
  const setTheme = useSetRecoilState(themeState);

  const options = useRef([
    {
      name: 'Default',
      value: 'default',
    },
    {
      name: 'Blue Rage',
      value: 'blue-rage',
    },
    {
      name: 'Surf',
      value: 'surf',
    },
    {
      name: 'Glacier',
      value: 'glacier',
    },
    {
      name: 'Timeless',
      value: 'timeless',
    },
    {
      name: 'Coffee',
      value: 'coffee',
    },
    {
      name: 'Blueberry',
      value: 'blueberry',
    },
  ]);

  const handleSelection = useCallback((selected: string | string[]) => {
    if (selected === 'default') {
      setTheme(Default);
    } else if (selected === 'blue-rage') {
      setTheme(BlueRage);
    } else if (selected === 'surf') {
      setTheme(Surf);
    } else if (selected === 'glacier') {
      setTheme(Glacier);
    } else if (selected === 'timeless') {
      setTheme(Timeless);
    } else if (selected === 'coffee') {
      setTheme(Coffee);
    } else if (selected === 'blueberry') {
      setTheme(Blueberry);
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
