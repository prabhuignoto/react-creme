export type MenuOption = Option & { visible: boolean };

export interface DropdownMenuModel {
  style: DropdownMenuStyleModel;
  handleSelection: (val: string, id?: string) => void;
  open: boolean;
  options: MenuOption[];
}

export interface DropdownMenuStyleModel {
  top?: number;
  width?: number;
  maxMenuHeight?: number;
}

export interface Option {
  disabled?: boolean;
  id?: string;
  name: string;
  value: string;
}

export interface DropdownModel {
  maxMenuHeight?: number;
  onSelected?: (value: string) => void;
  options: Option[];
  placeholder?: string;
}
