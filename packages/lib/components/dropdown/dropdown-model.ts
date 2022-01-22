import { OverlayModel } from '../common/overlay-model';

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

/** Model representing the Dropdown Option */
export interface Option {
  disabled?: boolean;
  id?: string;
  name: string;
  selected?: boolean;
  value?: string;
}

/** ✨Component props */
export interface DropdownProps {
  /**🔷 Right to Left */
  RTL?: boolean;

  /**🔷 Allow multiple selection */
  allowMultiSelection?: boolean;

  /**🔷 Color of the chevron color */
  chevronIconColor?: string;

  /**🔷 Disables the control */
  disabled?: boolean;

  /**🔷 Enable search */
  enableSearch?: boolean;

  /**🔷 enables the Focus outlines */
  focusable?: boolean;

  /**🔷 The height of the dropdown menu */
  maxMenuHeight?: number;

  /**🔷 Callback executed on selection */
  onSelected?: (value: string | string[]) => void;

  /**🔷 Options passed down to the dropdown */
  options: Option[];

  /**🔷 Placeholder for the dropdown */
  placeholder?: string;

  /**🔷 Enables the clear button for clearing the selected option */
  showClearBtn?: boolean;

  /**🔷 Virtualizes the items displayed in the menu */
  virtualize?: boolean;
}
