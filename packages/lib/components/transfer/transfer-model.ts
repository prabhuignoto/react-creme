import { ListOption } from '../list/list-model';

export interface TransferProps extends TransferCommonProps {
  enableSearch?: boolean;
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

export type TransferList = 'list1' | 'list2';
export interface TransferListItemModel extends TransferCommonProps {
  handleSelection: (l: TransferList, id: string) => void;
  id: string;
  list: TransferList;
  name: string;
  selected?: boolean;
}

export interface TransferCommonProps {
  focusable?: boolean;
  virtualize?: boolean;
}

export interface TransferListProps extends TransferCommonProps {
  enableSearch?: boolean;
  listId: TransferList;
  onSelection: (selected: ListOption[]) => void;
  options: ListOption[];
}
