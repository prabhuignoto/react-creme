import { CSSProperties } from "react";
import { Option } from "../dropdown/dropdown-model";

export interface ListModel {
  allowMultiSelection?: boolean;
  borderLess?: boolean;
  enableSearch?: boolean;
  focusable?: boolean;
  group?: boolean;
  itemHeight?: number;
  maxHeight?: number;
  minHeight?: number;
  noUniqueIds?: boolean;
  onSelection?: (selected: ListOption[]) => void;
  options: ListOption[];
  rowGap?: number;
  showCheckIcon?: boolean;
  virtualized?: boolean;
  highlightSelection?: boolean;
}

export interface ListItemModel {
  allowMultiSelection?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  id?: string;
  name: string;
  // onClick?: () => void;
  onSelection?: (opt: ListOption) => void;
  selected?: boolean;
  showCheckIcon?: boolean;
  style?: CSSProperties;
  value: string;
  highlightSelection?: boolean;
}

export interface ListOption extends Option {
  group?: string;
  top?: number;
  visible?: boolean;
}
