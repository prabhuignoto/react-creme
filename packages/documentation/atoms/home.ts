import { atom } from 'jotai';
import {
  Colors,
  FontSizes,
  IconSizes,
  Sizes,
} from '../../lib/components/common/theme-provider-model';
import { Dark } from '../common/app-themes';

export type ThemeType = 'default' | 'blueberry' | 'dark' | 'sky' | 'gray';

type ThemeState = {
  colors?: Colors;
  darkMode?: boolean;
  fontSizes?: FontSizes;
  iconSizes?: IconSizes;
  selectedTheme?: ThemeType;
  sizes?: Sizes;
};

export type MediaState = {
  isBigScreen: boolean;
  isDesktop: boolean;
  isExtraLargeScreen: boolean;
  isMobile: boolean;
  isTablet: boolean;
};

export const asideState = atom({
  default: {
    isAnyOverlayOpen: false,
    isOpen: false,
  },
  key: 'asideState',
});

export const responsiveState = atom<MediaState>({
  default: {
    isBigScreen: false,
    isDesktop: false,
    isExtraLargeScreen: false,
    isMobile: false,
    isTablet: false,
  },
  key: 'responsiveState',
});

export const themeState = atom<ThemeState>({
  default: {
    colors: {
      primary: '#47597E',
      secondary: '#DBE6FD',
      tertiary: '#293B5F',
      text: '#000',
      textSelection: '#293B5F',
      ...Dark,
    },
    darkMode: true,
    fontSizes: {
      lg: 18,
      md: 16,
      sm: 14,
    },
    iconSizes: {
      lg: 32,
      md: 24,
      sm: 18,
      xs: 14,
    },
    selectedTheme: 'default',
    sizes: {
      lg: 24,
      md: 20,
      sm: 16,
    },
  },
  key: 'themeState',
});
