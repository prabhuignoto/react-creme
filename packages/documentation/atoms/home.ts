import { atom } from 'recoil';
import {
  Colors,
  FontSizes,
  IconSizes,
  Sizes,
} from '../../lib/components/common/theme-provider-model';

export type ThemeType = 'default' | 'glacier' | 'blueberry' | 'bluerush';

type ThemeState = {
  colors: Colors;
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
      primary: '#0074B7',
      secondary: '#BFD7ED',
      tertiary: '#003B73',
      text: '#000',
      textSelection: '#003B73',
    },
    fontSizes: {
      lg: 18,
      md: 16,
      sm: 14,
    },
    iconSizes: {
      lg: 24,
      md: 20,
      sm: 16,
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
