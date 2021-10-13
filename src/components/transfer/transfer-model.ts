export interface TransferModel {
  list1: string[];
  list2: string[];
  onChange?: (list1: string[], list2: string[]) => void;
}

export interface TransferListInternalModel {
  id: string;
  name: string;
  selected?: boolean;
  visible?: boolean;
}

export type TransferList = "list1" | "list2";
