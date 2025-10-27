import React, { ReactNode } from 'react';
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

/**
 * Props for the Dropdown component
 */
export type DropdownProps = {
  /** Enable right-to-left text direction */
  RTL?: boolean;

  /**
   * Allow selecting multiple options at once.
   * When true, selected values are returned as comma-separated string.
   * @default false
   */
  allowMultiSelection?: boolean;

  /** Custom color for the chevron icon */
  chevronIconColor?: string;

  /** Disable the dropdown (prevents opening and interaction) */
  disabled?: boolean;

  /**
   * Enable search/filter functionality within the dropdown menu.
   * @default false
   */
  enableSearch?: boolean;

  /** When false, dropdown cannot receive keyboard focus */
  focusable?: boolean;

  /** Accessible label for the dropdown */
  label?: string;

  /**
   * Maximum height of the dropdown menu in pixels.
   * Menu will scroll if content exceeds this height.
   * @default 200
   */
  maxMenuHeight?: number;

  /**
   * Callback fired when selection changes.
   * @param value - Selected value(s) as string or comma-separated string
   */
  onSelected?: (value: string | string[]) => void;

  /**
   * Array of options to display in the dropdown.
   * Each option should have at minimum a `name` and `value`.
   * Options can be pre-selected with `selected: true`.
   */
  options: Option[];

  /** Placeholder text shown when no option is selected */
  placeholder?: string;

  /**
   * Show clear button to reset selection.
   * @default true
   */
  showClearBtn?: boolean;

  /** Size variant for the dropdown */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Enable virtualization for large option lists.
   * Improves performance with 100+ options by only rendering visible items.
   * @default false
   */
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
