export type MenuOption = Option & { visible: boolean };

export interface DropdownMenuModel {
  style: DropdownMenuStyleModel;
  handleSelection: (selected: Option[]) => void;
  open: boolean;
  options: MenuOption[];
  allowMultipleSelection?: boolean;
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
  selected?: boolean;
}

export interface DropdownModel {
  allowMultipleSelection?: boolean;
  maxMenuHeight?: number;
  onSelected?: (value: string | string[]) => void;
  options: Option[];
  placeholder?: string;
}
