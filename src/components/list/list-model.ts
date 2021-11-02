import { CSSProperties } from "react";
import { ListOption } from "./list";

export interface ListModel {
  allowMultiSelection?: boolean;
  borderLess?: boolean;
  disableSearch?: boolean;
  maxHeight?: number;
  onSelection?: (selected: ListOption[]) => void;
  options: ListOption[];
  itemHeight?: number;
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
}
