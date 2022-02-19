import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Dialog, RadioGroup, Section } from '../../../lib/components';
import { RadioGroupItemProps } from '../../../lib/components/radio-group/radio-group-model';
import { responsiveState, themeState, ThemeType } from '../../atoms/home';
import {
  Blueberry,
  Dark,
  Default,
  Glacier,
  LightGray,
  NightGray,
} from '../../common/app-themes';
import { GithubLink } from '../../common/github-link';
import './app-settings.scss';

const themes: RadioGroupItemProps<ThemeType>[] = [
  {
    checked: true,
    label: 'Default',
    value: 'default',
  },
  {
    label: 'Blueberry',
    value: 'blueberry',
  },
  {
    label: 'Night Gray',
    value: 'night-gray',
  },
  {
    label: 'Light Gray',
    value: 'light-gray',
  },
];

const AppSettings: React.FunctionComponent = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [width, setWidth] = useState(0);
  const { isMobile } = useRecoilValue(responsiveState);
  const [appTheme, updateAppTheme] = useRecoilState(themeState);
  const [theme, setTheme] = useState<ThemeType>(appTheme.selectedTheme);

  useEffect(() => {
    if (isMobile) {
      setWidth(300);
    } else {
      setWidth(600);
    }
  }, [isMobile]);

  const handleOnSuccess = useCallback(() => {
    const themeToUpdate = themes.find(x => x.value === theme);

    let selectedTheme;

    if (themeToUpdate.value === 'default') {
      selectedTheme = { colors: { ...Default }, selectedTheme: 'default' };
    } else if (themeToUpdate.value === 'glacier') {
      selectedTheme = { colors: { ...Glacier }, selectedTheme: 'glacier' };
    } else if (themeToUpdate.value === 'blueberry') {
      selectedTheme = { colors: { ...Blueberry }, selectedTheme: 'blueberry' };
    } else if (themeToUpdate.value === 'night-gray') {
      selectedTheme = { colors: { ...NightGray }, selectedTheme: 'neon' };
    } else if (themeToUpdate.value === 'light-gray') {
      selectedTheme = { colors: { ...LightGray }, selectedTheme: 'light-gray' };
    } else if (themeToUpdate.value === 'dark') {
      selectedTheme = { colors: { ...Dark }, selectedTheme: 'dark' };
    }

    updateAppTheme(selectedTheme);
  }, [theme]);

  const handleThemeSelection = useCallback(selected => {
    setTheme(selected);
  }, []);

  return width > 0 ? (
    <div className="rc-doc-app-settings-wrapper">
      <span
        className="rc-doc-app-settings-icon"
        onClick={() => setShowSettings(prev => !prev)}
      >
        <FontAwesomeIcon icon={faCog} size="2x" />
      </span>
      <GithubLink />
      {showSettings && (
        <Dialog
          onSuccess={handleOnSuccess}
          animationDuration={200}
          onClose={() => setShowSettings(false)}
          width={width}
        >
          <div style={{ width: '90%' }}>
            <Section title="Theme">
              <RadioGroup
                items={themes.map(t => ({
                  ...t,
                  checked: t.value === theme,
                }))}
                onSelected={handleThemeSelection}
              />
            </Section>
          </div>
        </Dialog>
      )}
    </div>
  ) : null;
};

export { AppSettings };
