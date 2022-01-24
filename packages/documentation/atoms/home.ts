import { atom } from 'recoil';
import { Theme } from '../../lib/components/common/theme-provider';

const asideState = atom({
  default: {
    isOpen: false,
  },
  key: 'asideState',
});

const responsiveState = atom({
  default: {
    isBigScreen: false,
    isDesktop: false,
    isExtraLargeScreen: false,
    isMobile: false,
    isTablet: false,
  },
  key: 'responsiveState',
});

const themeState = atom<Theme>({
  default: {
    primary: '#0074B7',
    secondary: '#BFD7ED',
    tertiary: '#003B73',
  },
  key: 'themeState',
});

export { asideState, responsiveState, themeState };
