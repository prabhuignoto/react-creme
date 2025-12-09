import { FunctionComponent } from 'react';
import { Settings, Moon, Sun } from 'lucide-react';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { Dialog, RadioGroup, Section } from '../../../lib/components';
import { RadioGroupItemProps } from '../../../lib/components/radio-group/radio-group-model';
import { responsiveState, themeState, ThemeType } from '../../atoms/home';
import { Blueberry, Cream, Dark, Gray } from '../../common/app-themes';
import { GithubLink } from '../../common/github-link';
import styles from './app-settings.module.scss';

const themes: RadioGroupItemProps<ThemeType>[] = [
  {
    label: 'Sky',
    value: 'sky',
  },
  {
    label: 'Blueberry',
    value: 'blueberry',
  },
  {
    label: 'Gray',
    value: 'gray',
  },
  {
    checked: true,
    label: 'Dark',
    value: 'dark',
  },
];

const AppSettings: FunctionComponent = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [width, setWidth] = useState(0);
  const { isMobile } = useAtomValue(responsiveState);
  const [appTheme, updateAppTheme] = useAtom(themeState);
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

    if (themeToUpdate?.value === 'sky') {
      selectedTheme = { colors: { ...Cream }, selectedTheme: 'default' };
    } else if (themeToUpdate?.value === 'blueberry') {
      selectedTheme = { colors: { ...Blueberry }, selectedTheme: 'blueberry' };
    } else if (themeToUpdate?.value === 'gray') {
      selectedTheme = { colors: { ...Gray }, selectedTheme: 'Gray' };
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
      <button
        type="button"
        className={classNames(styles.icon, {
          [styles.dark]: appTheme.darkMode,
        })}
        onClick={handleDarkModeSwitch}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={32} /> : <Moon size={32} />}
      </button>
      <button
        type="button"
        className={classNames(styles.icon, {
          [styles.dark]: appTheme.darkMode,
        })}
        onClick={() => setShowSettings(prev => !prev)}
        aria-label="Open settings"
      >
        <Settings size={32} />
      </button>
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
