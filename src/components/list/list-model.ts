import { ListOption } from "./list";

export interface ListModel {
  allowMultipleSelection?: boolean;
  borderLess?: boolean;
  maxHeight?: number;
  onSelection?: (selected: ListOption[]) => void;
  options: ListOption[];
}
