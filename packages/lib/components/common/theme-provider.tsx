import deepEqual from 'fast-deep-equal';
import hexToRgb from 'hex-rgb';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Colors,
  FontSizes,
  Sizes,
  Theme,
  ThemeColor,
  ThemeProviderProps,
} from './theme-provider-model';

const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = ({
  theme = {
    colors: {
      primary: '#47597E',
      secondary: '#DBE6FD',
      tertiary: '#293B5F',
      text: '#000',
      textSelection: '#293B5F',
    },
    darkMode: false,
    fontSizes: {
      lg: 24,
      md: 20,
      sm: 16,
    },
    iconSizes: {
      lg: 24,
      md: 20,
      sm: 16,
      xs: 12,
    },
    sizes: {
      lg: 24,
      md: 20,
      sm: 16,
    },
  },
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme);

  const [stylesApplied, setStylesApplied] = useState<{
    colors: boolean;
    fonts: boolean;
    icons: boolean;
  }>({
    colors: false,
    fonts: false,
    icons: false,
  });

  const ThemeContext = React.createContext<Theme>(currentTheme);

  /**
   * Setup colors
   */
  useEffect(() => {
    const result = [];

    for (const key in currentTheme.colors) {
      result.push({
        color: key as ThemeColor,
        hex: currentTheme.colors[key as keyof Colors],
        rgb: hexToRgb(currentTheme.colors[key as keyof Colors], {
          format: 'array',
        }).slice(0, 3),
      });
    }

    result.forEach(({ color, rgb, hex }) => {
      (document.querySelector(':root') as HTMLElement)?.style.setProperty(
        `--rc-${color}-color-rgb`,
        rgb.join(',')
      );
      (document.querySelector(':root') as HTMLElement)?.style.setProperty(
        `--rc-${color}-color-hex`,
        hex
      );
    });

    setStylesApplied(prev => ({ ...prev, colors: true }));
  }, [currentTheme.colors.primary]);

  /**
   * Setup Font Sizes
   */
  useEffect(() => {
    const result = [];

    for (const key in currentTheme.fontSizes) {
      result.push({
        fontSize: key as keyof FontSizes,
        size: currentTheme.fontSizes[key as keyof FontSizes],
      });
    }

    const fontSizes = result.reduce(
      (a, { fontSize, size }) => a + `--rc-font-size-${fontSize}: ${size}px;`,
      ''
    );

    document.documentElement.style.cssText += ';' + fontSizes;

    setStylesApplied(prev => ({ ...prev, fonts: true }));
  }, []);

  /**
   * Setup Generic Sizes
   */
  useEffect(() => {
    const result = [];

    for (const key in currentTheme.sizes) {
      result.push({
        size: key as keyof Sizes,
        sizeValue: currentTheme.sizes[key as keyof Sizes],
      });
    }

    const sizes = result.reduce(
      (a, { size, sizeValue }) => a + `--rc-size-${size}: ${sizeValue}px;`,
      ''
    );

    document.documentElement.style.cssText += ';' + sizes;
  }, [currentTheme.sizes?.sm]);

  /**
   * Setup Icon sizes
   */
  useEffect(() => {
    const result = [];

    for (const key in currentTheme.iconSizes) {
      result.push({
        iconSize: key as keyof Sizes,
        size: currentTheme.iconSizes[key as keyof Sizes],
      });
    }

    const iconSizes = result.reduce(
      (a, { iconSize, size }) => a + `--rc-icon-size-${iconSize}: ${size}px;`,
      ''
    );

    document.documentElement.style.cssText += ';' + iconSizes;

    setStylesApplied(prev => ({ ...prev, icons: true }));
  }, []);

  useEffect(() => {
    if (!deepEqual(theme, currentTheme)) {
      setCurrentTheme(theme);
    }
  }, [theme, currentTheme]);

  useEffect(() => {
    if (theme.darkMode) {
      document.documentElement.style.cssText +=
        ';--rc-dark-mode:true;--rc-normal-mode:false;';
    } else {
      document.documentElement.style.cssText +=
        ';--rc-dark-mode:false;--rc-normal-mode:true;';
    }
  }, [theme.darkMode]);

  const canRender = useMemo(
    () => stylesApplied.colors && stylesApplied.fonts && stylesApplied.icons,
    [JSON.stringify(stylesApplied)]
  );

  return (
    <ThemeContext.Provider value={currentTheme}>
      {canRender && children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };
