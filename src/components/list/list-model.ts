import { Option } from "../dropdown/dropdown-model";

export interface ListModel {
  options: Option[];
  allowMultipleSelection?: boolean;
  maxHeight?: number;
  onSelection?: (selected: Option[]) => void;
}
