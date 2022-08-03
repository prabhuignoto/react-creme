import { faCog, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Dialog, RadioGroup, Section } from '../../../lib/components';
import { RadioGroupItemProps } from '../../../lib/components/radio-group/radio-group-model';
import { responsiveState, themeState, ThemeType } from '../../atoms/home';
import {
  Blueberry,
  Dark,
  Glacier,
  Magnolia,
  NightGray,
} from '../../common/app-themes';
import { GithubLink } from '../../common/github-link';
import styles from './app-settings.module.scss';

const themes: RadioGroupItemProps<ThemeType>[] = [
  {
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
    label: 'Magnolia',
    value: 'magnolia',
  },
  {
    checked: true,
    label: 'Dark',
    value: 'dark',
  },
];

const AppSettings: React.FunctionComponent = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [width, setWidth] = useState(0);
  const { isMobile } = useRecoilValue(responsiveState);
  const [appTheme, updateAppTheme] = useRecoilState(themeState);
  const [theme, setTheme] = useState<ThemeType>(
    appTheme.selectedTheme || ({} as ThemeType)
  );

  const [darkMode, setDarkMode] = useState(appTheme.darkMode);

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

    if (themeToUpdate?.value === 'default') {
      selectedTheme = { colors: { ...Blueberry }, selectedTheme: 'default' };
    } else if (themeToUpdate?.value === 'glacier') {
      selectedTheme = { colors: { ...Glacier }, selectedTheme: 'glacier' };
    } else if (themeToUpdate?.value === 'blueberry') {
      selectedTheme = { colors: { ...Blueberry }, selectedTheme: 'blueberry' };
    } else if (themeToUpdate?.value === 'night-gray') {
      selectedTheme = { colors: { ...NightGray }, selectedTheme: 'neon' };
    } else if (themeToUpdate?.value === 'magnolia') {
      selectedTheme = { colors: { ...Magnolia }, selectedTheme: 'magnolia' };
    } else if (themeToUpdate?.value === 'dark') {
      selectedTheme = {
        colors: { ...Dark },
        darkMode: true,
        selectedTheme: 'dark',
      };
    }

    if (selectedTheme) {
      updateAppTheme(selectedTheme);
    }
  }, [theme]);

  const handleThemeSelection = useCallback((selected: ThemeType) => {
    setTheme(selected);
  }, []);

  const handleDarkModeSwitch = useCallback(() => {
    setDarkMode(!darkMode);
    updateAppTheme(() => ({
      colors: darkMode ? { ...Blueberry } : { ...Dark },
      darkMode: !darkMode,
      selectedTheme: 'default',
    }));
  }, [darkMode]);

  return width > 0 ? (
    <div className={classNames(styles.wrapper)}>
      <span
        className={classNames(styles.icon, {
          [styles.dark]: appTheme.darkMode,
        })}
        role="button"
        onClick={handleDarkModeSwitch}
      >
        {darkMode ? (
          <FontAwesomeIcon icon={faSun} size="2x" />
        ) : (
          <FontAwesomeIcon icon={faMoon} size="2x" />
        )}
      </span>
      <span
        className={classNames(styles.icon, {
          [styles.dark]: appTheme.darkMode,
        })}
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
