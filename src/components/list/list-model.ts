import { ListOption } from "./list";

export interface ListModel {
  allowMultipleSelection?: boolean;
  maxHeight?: number;
  onSelection?: (selected: ListOption[]) => void;
  options: ListOption[];
}
