import { ListOption } from "../list/list-model";

export interface TransferProps extends TransferCommonProps {
  list1: string[];
  list2: string[];
  onChange?: (list1: string[], list2: string[]) => void;
  enableSearch?: boolean;
}

export interface TransferListInternalModel {
  id: string;
  name: string;
  selected?: boolean;
  visible?: boolean;
}

export type TransferList = "list1" | "list2";
export interface TransferListItemModel extends TransferCommonProps {
  selected?: boolean;
  id: string;
  name: string;
  handleSelection: (l: TransferList, id: string) => void;
  list: TransferList;
}

export interface TransferCommonProps {
  virtualize?: boolean;
  focusable?: boolean;
}

export interface TransferListProps extends TransferCommonProps {
  listId: TransferList;
  options: ListOption[];
  onSelection: (selected: ListOption[]) => void;
  enableSearch?: boolean;
}
