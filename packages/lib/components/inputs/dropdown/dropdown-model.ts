import { ReactNode } from 'react';
import { OverlayModel } from '@common';

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

/** ✨Component props */
export type DropdownProps = {
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

  label?: string;

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

  size?: 'sm' | 'md' | 'lg';

  /**🔷 Virtualises the items displayed in the menu */
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
