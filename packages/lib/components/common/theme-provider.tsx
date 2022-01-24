import deepEqual from 'fast-deep-equal';
import hexToRgb from 'hex-rgb';
import React, { useEffect, useState } from 'react';

export type Theme = {
  primary: string;
  secondary: string;
  tertiary: string;
};

interface ThemeProviderProps {
  name: string;
  theme: Theme;
}

type ThemeColor = keyof Theme;

const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme);

  const ThemeContext = React.createContext<Theme>(currentTheme);

  useEffect(() => {
    const result = [];

    for (const key in currentTheme) {
      result.push({
        color: key as ThemeColor,
        hex: currentTheme[key as keyof Theme],
        rgb: hexToRgb(currentTheme[key as keyof Theme], {
          format: 'array',
        }).slice(0, 3),
      });
    }

    const rgbColors = result.reduce(
      (a, { color, rgb }) => a + `--rc-${color}-color-rgb: ${rgb.join(',')};`,
      ''
    );

    const hexColors = result.reduce(
      (a, { color, hex }) => a + `--rc-${color}-color-hex: ${hex};`,
      ''
    );

    document.documentElement.style.cssText = hexColors.concat(rgbColors);
  }, [currentTheme.primary]);

  useEffect(() => {
    if (!deepEqual(theme, currentTheme)) {
      setCurrentTheme(theme);
    }
  }, [theme, currentTheme]);

  return (
    <div>
      <ThemeContext.Provider value={currentTheme}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
};

export { ThemeProvider };