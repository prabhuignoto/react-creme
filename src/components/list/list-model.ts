import { Option } from "../dropdown/dropdown-model";

export interface ListModel {
  allowMultipleSelection?: boolean;
  maxHeight?: number;
  onSelection?: (selected: Option[]) => void;
  options: Option[];
}
