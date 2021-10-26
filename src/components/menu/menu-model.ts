import React from "react";
export interface MenuModel {
  children: React.ReactNode;
  items: MenuItemModel[];
  onOpen?: (id?: string) => void;
  onClose?: (id?: string) => void;
  onSelected?: (val: string) => void;
  closeManual?: boolean;
  id?: string;
}

export interface MenuItemModel {
  name: string;
  id?: string;
  disabled?: boolean;
}
