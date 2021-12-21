import { CSSProperties } from "react";
import { Option } from "../dropdown/dropdown-model";

interface ListCommonProps {
  allowMultiSelection?: boolean;
  focusable?: boolean;
  highlightSelection?: boolean;
  showCheckIcon?: boolean;
  textColor?: string;
  textColorSelected?: string;
}

export interface ListModel extends ListCommonProps {
  border?: boolean;
  enableSearch?: boolean;
  group?: boolean;
  itemHeight?: number;
  maxHeight?: number;
  minHeight?: number;
  noUniqueIds?: boolean;
  onSelection?: (selected: ListOption[]) => void;
  options: ListOption[];
  rowGap?: number;
  virtualized?: boolean;
  backGroundColor?: string;
  id?: string;
}

export interface ListItemModel extends ListCommonProps {
  disabled?: boolean;
  id?: string;
  name: string;
  onSelection?: (opt: ListOption) => void;
  selected?: boolean;
  style?: CSSProperties;
  value: string;
}

export interface ListOption extends Option {
  group?: string;
  top?: number;
  visible?: boolean;
}

export interface ListItemOptionProps extends ListCommonProps {
  name: string;
  selected?: boolean;
  tabIndex: number;
  showCheck?: boolean;
  focusable?: boolean;
}
