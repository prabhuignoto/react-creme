import { atom } from "recoil";

const asideState = atom({
  default: {
    isOpen: false,
  },
  key: "asideState",
});

const responsiveState = atom({
  default: {
    isBigScreen: false,
    isDesktop: false,
    isExtraLargeScreen: false,
    isMobile: false,
    isTablet: false,
  },
  key: "responsiveState",
});

export { asideState, responsiveState };
