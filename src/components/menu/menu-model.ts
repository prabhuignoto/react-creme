export interface MenuModel {
  children: React.ReactNode;
  items: MenuItemModel[];
  closeManual?: boolean;
  onOpen?: (id?: string) => void;
  onClose?: (id?: string) => void;
  onSelected?: (val: string) => void;
  id?: string;
}

export interface MenuItemModel {
  name: string;
  id?: string;
  disabled?: boolean;
}
