import { Option } from '../../inputs/dropdown/dropdown-model';
/** ✨ Component props */
export declare type ListProps = {
  RTL?: boolean;
  allowMultiSelection?: boolean;
  backGroundColor?: string;
  border?: boolean;
  enableSearch?: boolean;
  focusable?: boolean;
  highlightSelection?: boolean;
  id?: string;
  itemHeight?: number;
  label?: string;
  maxHeight?: number;
  minHeight?: number;
  noUniqueIds?: boolean;
  onSelection?: (selected: ListOption[]) => void;
  options: ListOption[];
  rowGap?: number;
  selectedIndex?: number;
  showCheckIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  textColor?: string;
  textColorSelected?: string;
  virtualized?: boolean;
};
declare type SelectListItemProps<T> = {
  [K in keyof T as Exclude<
    K,
    | 'virtualized'
    | 'rowGap'
    | 'options'
    | 'noUniqueIds'
    | 'minHeight'
    | 'maxHeight'
    | 'label'
    | 'itemHeight'
    | 'enableSearch'
    | 'border'
    | 'backGroundColor'
    | 'onSelection'
  >]: T[K];
};
export declare type ListItemProps = SelectListItemProps<ListProps> & {
  disabled?: boolean;
  focus?: boolean;
  name: string;
  onSelection?: (opt: ListOption) => void;
  selected?: boolean;
  style?: {
    height?: string | number;
    top?: string | number;
  };
  value: string;
};
export declare type ListItemContentProps = Pick<
  ListItemProps,
  | 'focusable'
  | 'name'
  | 'textColor'
  | 'textColorSelected'
  | 'RTL'
  | 'selected'
  | 'highlightSelection'
  | 'size'
> & {
  showCheck?: boolean;
};
export interface ListOption<T = string> extends Option<T> {
  focus?: boolean;
  group?: string;
  top?: number;
  visible?: boolean;
}
export declare type ListItemsProps = Omit<
  ListProps,
  | 'backGroundColor'
  | 'border'
  | 'enableSearch'
  | 'maxHeight'
  | 'minHeight'
  | 'noUniqueIds'
> & {
  handleSelection: (opt: ListOption) => void;
  id?: string;
  renderHash?: number;
  resetState?: number;
  selectedIndex?: number;
  visibleRange: [number, number];
};
export declare function ParseOptions(
  options: ListOption[],
  rowGap: number,
  itemHeight: number,
  noUniqueIds: boolean
): ListOption[];
export {};
