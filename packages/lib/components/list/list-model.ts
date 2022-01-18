import { Option } from '../dropdown/dropdown-model';

interface ListCommonProps {
  RTL?: boolean;
  allowMultiSelection?: boolean;
  focusable?: boolean;
  highlightSelection?: boolean;
  showCheckIcon?: boolean;
  textColor?: string;
  textColorSelected?: string;
}

export interface ListProps extends ListCommonProps {
  backGroundColor?: string;
  border?: boolean;
  enableSearch?: boolean;
  group?: boolean;
  id?: string;
  itemHeight?: number;
  label?: string;
  maxHeight?: number;
  minHeight?: number;
  noUniqueIds?: boolean;
  onSelection?: (selected: ListOption[]) => void;
  options: ListOption[];
  rowGap?: number;
  virtualized?: boolean;
}

export interface ListItemProps extends ListCommonProps {
  disabled?: boolean;
  focus?: boolean;
  id?: string;
  name: string;
  onSelection?: (opt: ListOption) => void;
  selected?: boolean;
  style?: any;
  value: string;
}

export interface ListOption extends Option {
  focus?: boolean;
  group?: string;
  top?: number;
  visible?: boolean;
}

export interface ListItemOptionProps extends ListCommonProps {
  focusable?: boolean;
  name: string;
  selected?: boolean;
  showCheck?: boolean;
  tabIndex: number;
}
