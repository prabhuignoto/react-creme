import { Colors, Theme } from './theme-provider-model';

export const darkColors: Partial<Colors> = {
  darkActiveSelection: '#ff0',
  darkControlBg: '#2b2b2b',
  darkControlBorder: '#4a4a4a',
  darkHover: '#343434',
  darkInputBg: '#171717',
  darkInputColor: '#fff',
};

export default {
  colors: {
    ...darkColors,
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
  zIndexes: {
    dialog: 9999999,
    drawer: 99999,
    globalNotification: 999999,
    imageOverlay: 99999,
    menu: 999,
    notification: 9999,
  },
} as Theme;
