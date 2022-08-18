import { ListOption } from '../../core/list/list-model';

export interface TransferProps {
  RTL?: boolean;
  enableSearch?: boolean;
  focusable?: boolean;
  list1: string[];
  list2: string[];
  onChange?: (list1: string[], list2: string[]) => void;
  size?: 'sm' | 'md' | 'lg';
  virtualize?: boolean;
}

export interface TransferListInternalModel {
  id?: string;
  name?: string;
  selected?: boolean;
  visible?: boolean;
}

export type TransferList = 'list1' | 'list2';
export interface TransferListItemModel {
  handleSelection: (l: TransferList, id: string) => void;
  id: string;
  list: TransferList;
  name: string;
  selected?: boolean;
}

export type TransferListProps = Pick<
  TransferProps,
  'focusable' | 'virtualize' | 'size' | 'RTL'
> & {
  enableSearch?: boolean;
  listId: TransferList;
  onSelection: (selected: ListOption[]) => void;
  options: ListOption[];
};
