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
export interface Option {
  disabled?: boolean;
  id?: string;
  name: string;
  selected?: boolean;
  value?: string;
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
  OverlayModel & {
    handleSelection: (selected: Option[]) => void;
    open: boolean;
    style: DropdownMenuStyleModel;
  };

export type DropdownValueProps = PickValueProps<DropdownProps> & {
  containerRef?: React.RefObject<HTMLDivElement>; //
  menuClosing?: boolean;
  onClear?: (ev: React.MouseEvent) => void;
  onToggle?: () => void;
  selectedValue?: string | { name: string }[];
  showMenu?: boolean;
};
