import { ListOption } from "./list";

export interface ListModel {
  allowMultipleSelection?: boolean;
  borderLess?: boolean;
  maxHeight?: number;
  onSelection?: (selected: ListOption[]) => void;
  options: ListOption[];
}

export interface ListItemModel {
  disabled?: boolean;
  id?: string;
  name: string;
  value: string;
  selected?: boolean;
  allowMultipleSelection?: boolean;
  onSelection?: (t: {
    id?: string;
    name: string;
    value: string;
    selected?: boolean;
  }) => void;
}
