import React from "react";
export interface MenuModel {
  children: React.ReactNode;
  items: MenuItemModel[];
  closeManual?: boolean;
  onOpen?: (id?: string) => void;
  onClose?: (id?: string) => void;
  onSelected?: (val: string) => void;
  id?: string;
  openOnHover?: boolean;
}

export interface MenuItemModel {
  name: string;
  id?: string;
  disabled?: boolean;
}
