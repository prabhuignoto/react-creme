import { CSSProperties } from "react";
import { Option } from "../dropdown/dropdown-model";
export interface ListModel {
  allowMultiSelection?: boolean;
  borderLess?: boolean;
  enableSearch?: boolean;
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
}

export interface ListItemModel {
  disabled?: boolean;
  allowMultiSelection?: boolean;
  id?: string;
  name: string;
  onSelection?: (opt: ListOption) => void;
  onClick?: () => void;
  selected?: boolean;
  value: string;
  style?: CSSProperties;
  showCheckIcon?: boolean;
}

export interface ListOption extends Option {
  visible?: boolean;
  group?: string;
  top?: number;
}
