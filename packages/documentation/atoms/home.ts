import { atom } from 'recoil';
import { Theme } from '../../lib/components/common/theme-provider';

export type ThemeType = 'default' | 'glacier' | 'blueberry';

type ThemeState = { colors: Theme; selectedTheme: ThemeType };

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
      primary: '#0074B7',
      secondary: '#BFD7ED',
      tertiary: '#003B73',
      textSelection: '#003B73',
    },
    selectedTheme: 'default',
  },
  key: 'themeState',
});

export { asideState, responsiveState, themeState };
