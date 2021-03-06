import { ReactNode } from 'react';
import { OverlayModel } from '../common/overlay-model';

export type MenuOption = Option & {
  visible: boolean;
};

export interface DropdownMenuStyleModel {
  maxMenuHeight?: number;
  top?: number;
  width?: number;
}

/** Model representing the Dropdown Option */
export interface Option<T = string> {
  disabled?: boolean;
  id?: string;
  name: string;
  selected?: boolean;
  value?: T;
}

/** β¨Component props */
export type DropdownProps = {
  /**π· Right to Left */
  RTL?: boolean;

  /**π· Allow multiple selection */
  allowMultiSelection?: boolean;

  /**π· Color of the chevron color */
  chevronIconColor?: string;

  /**π· Disables the control */
  disabled?: boolean;

  /**π· Enable search */
  enableSearch?: boolean;

  /**π· enables the Focus outlines */
  focusable?: boolean;

  label?: string;

  /**π· The height of the dropdown menu */
  maxMenuHeight?: number;

  /**π· Callback executed on selection */
  onSelected?: (value: string | string[]) => void;

  /**π· Options passed down to the dropdown */
  options: Option[];

  /**π· Placeholder for the dropdown */
  placeholder?: string;

  /**π· Enables the clear button for clearing the selected option */
  showClearBtn?: boolean;

  size?: 'sm' | 'md' | 'lg';

  /**π· Virtualises the items displayed in the menu */
  virtualize?: boolean;
};

export type PickMenuProps<T> = {
  [P in keyof T as Exclude<
    P,
    | 'chevronIconColor'
    | 'disabled'
    | 'showClearBtn'
    | 'maxMenuHeight'
    | 'onSelected'
    | 'placeholder'
  >]: T[P];
};

export type PickValueProps<T> = {
  [P in keyof T as Exclude<
    P,
    'enableSearch' | 'virtualize' | 'onSelected' | 'maxMenuHeight' | 'options'
  >]: T[P];
};

export type DropdownMenuProps = PickMenuProps<DropdownProps> &
  OverlayModel<null> & {
    handleSelection: (selected: Option[]) => void;
    open: boolean;
    selectedIndex?: number;
    style: DropdownMenuStyleModel;
  };

export type DropdownValueProps = PickValueProps<DropdownProps> & {
  containerRef?: React.RefObject<HTMLDivElement>;
  focus?: boolean;
  menuClosing?: boolean;
  onClear?: (ev: React.MouseEvent) => void;
  onToggle?: () => void;
  selectedValue?: string | { name: string }[] | ReactNode;
  showMenu?: boolean;
};
