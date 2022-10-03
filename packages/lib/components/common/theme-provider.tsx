import deepEqual from 'fast-deep-equal';
import hexToRgb from 'hex-rgb';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import themeDefault, { darkColors } from './theme-default';
import {
  Colors,
  FontSizes,
  Sizes,
  Theme,
  ThemeColor,
  ThemeProviderProps,
  zIndexes,
} from './theme-provider-model';

const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = React.memo(
  ({ theme = themeDefault, children }) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(
      Object.assign(
        {},
        {
          ...themeDefault,
          ...theme,
        }
      )
    );

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

    const rootStyle = useRef('');

    /**
     * Setup colors
     */
    useEffect(() => {
      const result = [];
      const colors = { ...darkColors, ...currentTheme.colors };

      for (const key in colors) {
        const color = colors[key as keyof Colors];

        if (color) {
          result.push({
            color: key as ThemeColor,
            hex: colors[key as keyof Colors],
            rgb: hexToRgb(color, {
              format: 'array',
            }).slice(0, 3),
          });
        }
      }

      const colorsHexRgb = result.reduce(
        (a, { color, hex, rgb }) =>
          a +
          `--rc-${color}-color-rgb: ${rgb};--rc-${color}-color-hex: ${hex};`,
        ''
      );

      rootStyle.current += colorsHexRgb;

      setStylesApplied(prev => ({ ...prev, colors: true }));
    }, [currentTheme.colors?.primary]);

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

      rootStyle.current += fontSizes;

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

      rootStyle.current += sizes;
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

      rootStyle.current += iconSizes;

      setStylesApplied(prev => ({ ...prev, icons: true }));
    }, []);

    /**
     * Setup z-indexes
     */
    useEffect(() => {
      const result = [];
      console.log(currentTheme.zIndexes);

      for (const key in currentTheme.zIndexes) {
        result.push({
          size: currentTheme.zIndexes[key as keyof zIndexes],
          zIndex: key as keyof zIndexes,
        });
      }

      const iconSizes = result.reduce(
        (a, { zIndex, size }) => a + `--rc-zIndex-${zIndex}: ${size};`,
        ''
      );

      rootStyle.current += iconSizes;

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href =
        'data:text/css;charset=UTF-8,' +
        encodeURIComponent(`:root{${rootStyle.current}}`);
      document.head.appendChild(link);
    }, [currentTheme.zIndexes?.dialog, JSON.stringify(currentTheme.colors)]);

    useEffect(() => {
      if (!deepEqual(theme, currentTheme)) {
        setCurrentTheme(theme);
      }
    }, [theme, currentTheme]);

    useEffect(() => {
      if (theme.darkMode) {
        document.documentElement.style.cssText += ';--rc-dark-mode:true;';
      } else {
        document.documentElement.style.cssText += ';--rc-dark-mode:false;';
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
  }
);

ThemeProvider.displayName = 'ThemeProvider';

export { ThemeProvider };
