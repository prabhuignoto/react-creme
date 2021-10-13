import { MenuItemModel } from "../menu/menu-model";

export interface MenuBarModel {
  items: MenuBarItemModel[];
  onSelected?: (value: string) => void;
  width?: number;
  align?: "left" | "right";
}

export interface MenuBarItemModel extends MenuItemModel {
  menu?: MenuBarItemModel[];
  isMenuOpen?: boolean;
}
