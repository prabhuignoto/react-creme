import { atom } from "recoil";

const asideState = atom({
  key: "asideState",
  default: {
    isOpen: false,
  },
});

const responsiveState = atom({
  key: "responsiveState",
  default: {
    isMobile: false,
    isDesktop: false,
    isBigScreen: false,
    isExtraLargeScreen: false,
    isTablet: false,
  },
});

export { asideState, responsiveState };
