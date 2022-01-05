import { atom } from "recoil";

const asideState = atom({
  key: "asideState",
  default: {
    isOpen: false,
  },
});

export { asideState };
