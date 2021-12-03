import { ListOption } from "../list/list-model";

export interface TransferModel extends TransferCommonModel {
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
export interface TransferListItemModel extends TransferCommonModel {
  selected?: boolean;
  id: string;
  name: string;
  handleSelection: (l: TransferList, id: string) => void;
  list: TransferList;
}

export interface TransferCommonModel {
  virtualize?: boolean;
}

export interface TransferListProps extends TransferCommonModel {
  listId: TransferList;
  options: ListOption[];
  onSelection: (selected: ListOption[]) => void;
  enableSearch?: boolean;
}
