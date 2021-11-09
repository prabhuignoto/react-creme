import React from "react";
export interface MenuModel {
  children: React.ReactNode;
  focusable?: boolean;
  id?: string;
  items: MenuItemModel[];
  onClose?: (id?: string) => void;
  onOpen?: (id?: string) => void;
  onSelected?: (val: string) => void;
  position?: "left" | "center" | "right";
}

export interface MenuItemModel {
  disabled?: boolean;
  id?: string;
  isDivider?: boolean;
  name?: string;
}
