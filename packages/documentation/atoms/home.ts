import { atom } from 'recoil';
import {
  Colors,
  FontSizes,
  IconSizes,
  Sizes,
} from '../../lib/components/common/theme-provider-model';
import { Dark } from '../common/app-themes';

export type ThemeType =
  | 'default'
  | 'glacier'
  | 'blueberry'
  | 'night-gray'
  | 'dark'
  | 'light-gray';

type ThemeState = {
  colors: Colors;
  darkMode?: boolean;
  fontSizes?: FontSizes;
  iconSizes?: IconSizes;
  selectedTheme: ThemeType;
  sizes?: Sizes;
};

export type MediaState = {
  isBigScreen: boolean;
  isDesktop: boolean;
  isExtraLargeScreen: boolean;
  isMobile: boolean;
  isTablet: boolean;
};

const asideState = atom({
  default: {
    isAnyOverlayOpen: false,
    isOpen: false,
  },
  key: 'asideState',
});

const responsiveState = atom<MediaState>({
  default: {
    isBigScreen: false,
    isDesktop: false,
    isExtraLargeScreen: false,
    isMobile: false,
    isTablet: false,
  },
  key: 'responsiveState',
});

const themeState = atom<ThemeState>({
  default: {
    colors: {
      // primary: '#0074B7',
      // secondary: '#BFD7ED',
      // tertiary: '#003B73',
      // text: '#003B73',
      // textSelection: '#fff',
      ...Dark,
    },
    darkMode: true,
    fontSizes: {
      lg: 18,
      md: 16,
      sm: 14,
    },
    iconSizes: {
      lg: 24,
      md: 20,
      sm: 16,
      xs: 12,
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

export { asideState, responsiveState, themeState };
