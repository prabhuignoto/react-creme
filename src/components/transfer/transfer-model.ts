export interface TransferModel {
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
export interface TransferListItemModel {
  selected?: boolean;
  id: string;
  name: string;
  handleSelection: (l: TransferList, id: string) => void;
  list: TransferList;
}
