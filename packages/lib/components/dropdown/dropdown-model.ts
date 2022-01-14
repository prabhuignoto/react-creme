import { OverlayModel } from "../common/overlay-model";

export type MenuOption = Option & { visible: boolean };

export interface DropdownMenuProps extends OverlayModel {
  allowMultiSelection?: boolean;
  enableSearch?: boolean;
  handleSelection: (selected: Option[]) => void;
  open: boolean;
  options: MenuOption[];
  style: DropdownMenuStyleModel;
  virtualize?: boolean;
  RTL?: boolean;
  focusable?: boolean;
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
  allowMultiSelection?: boolean;
  disabled?: boolean;
  enableSearch?: boolean;
  maxMenuHeight?: number;
  onSelected?: (value: string | string[]) => void;
  options: Option[];
  placeholder?: string;
  virtualize?: boolean;
  focusable?: boolean;
  RTL?: boolean;
  chevronIconColor?: string;
}
