import deepEqual from 'fast-deep-equal';
import hexToRgb from 'hex-rgb';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import defaultTheme from './theme-default';
import {
  Colors,
  FontSizes,
  Sizes,
  Theme,
  ThemeColor,
  ThemeProviderProps,
  zIndexes,
} from './theme-provider-model';

export const ThemeContext = React.createContext<Theme | null>(null);

const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = React.memo(
  ({ theme, children }) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>({
      ...defaultTheme,
      ...theme,
    });

    const [stylesApplied, setStylesApplied] = useState<{
      colors: boolean;
      fonts: boolean;
      icons: boolean;
    }>({
      colors: false,
      fonts: false,
      icons: false,
    });

    const rootStyle = useRef<string>('');

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

      const colors = result.reduce(
        (a, { color, hex, rgb }) =>
          a + `--rc-${color}-color-hex:${hex};--rc-${color}-color-rgb:${rgb};`,
        ''
      );

      rootStyle.current += colors;

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

      rootStyle.current += ';' + fontSizes;

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

      rootStyle.current += ';' + sizes;
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

      rootStyle.current += ';' + iconSizes;

      setStylesApplied(prev => ({ ...prev, icons: true }));
    }, []);

    //setup z-indexes
    useEffect(() => {
      const result = [];

      for (const key in currentTheme.zIndexes) {
        result.push({
          index: currentTheme.zIndexes[key as keyof zIndexes],
          type: key as keyof Sizes,
        });
      }

      const zIndexes = result.reduce(
        (a, { type, index }) => a + `--rc-z-index-${type}: ${index};`,
        ''
      );

      rootStyle.current += ';' + zIndexes;
    }, [currentTheme.sizes?.sm]);

    useEffect(() => {
      if (currentTheme.zIndexes?.dialog) {
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.textContent = `:root{${rootStyle.current};--rc-dark-mode: ${
          theme?.darkMode ? 'true' : 'false'
        };}`;
      }
    }, [
      currentTheme.zIndexes?.dialog,
      document.styleSheets.length,
      theme?.darkMode,
    ]);

    useEffect(() => {
      if (theme && !deepEqual(theme, currentTheme)) {
        setCurrentTheme(theme);
      }
    }, [theme, currentTheme]);

    useEffect(() => {
      if (theme?.darkMode) {
        document.documentElement.style.cssText += ';--rc-dark-mode:true;';
      } else {
        document.documentElement.style.cssText += ';--rc-dark-mode:false;';
      }
    }, [theme?.darkMode]);

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
