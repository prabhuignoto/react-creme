import { OverlayModel } from "../common/overlay-model";

export type MenuOption = Option & { visible: boolean };

export interface DropdownMenuProps extends OverlayModel {
  RTL?: boolean;
  allowMultiSelection?: boolean;
  enableSearch?: boolean;
  focusable?: boolean;
  handleSelection: (selected: Option[]) => void;
  open: boolean;
  options: MenuOption[];
  style: DropdownMenuStyleModel;
  virtualize?: boolean;
}

export interface DropdownMenuStyleModel {
  maxMenuHeight?: number;
  top?: number;
  width?: number;
}

export interface Option {
  disabled?: boolean;
  id?: string;
  name: string;
  selected?: boolean;
  value?: string;
}

export interface DropdownProps {
  RTL?: boolean;
  allowMultiSelection?: boolean;
  chevronIconColor?: string;
  disabled?: boolean;
  enableSearch?: boolean;
  focusable?: boolean;
  maxMenuHeight?: number;
  onSelected?: (value: string | string[]) => void;
  options: Option[];
  placeholder?: string;
  virtualize?: boolean;
}
