import { nanoid } from 'nanoid';
import { isUndefined } from '../common/utils';
import { Option } from '../dropdown/dropdown-model';

/** ✨ Component props */
export type ListProps = {
  // 🔷 Right to Left
  RTL?: boolean;

  // 🔷 Allow multiple selection
  allowMultiSelection?: boolean;

  // 🔷 background color
  backGroundColor?: string;

  // 🔷 border color of the list
  border?: boolean;

  disableBgColor?: boolean;

  // 🔷 enables search
  enableSearch?: boolean;

  // 🔷 enables the Focus outlines
  focusable?: boolean;

  //  highlights the selection
  highlightSelection?: boolean;

  //  unique id of the list
  id?: string;

  // 🔷 The height of the list item
  itemHeight?: number;

  // 🔷 Label for the list
  label?: string;

  // 🔷 Maximum height of the list
  maxHeight?: number;

  // 🔷 Minimum height of the list
  minHeight?: number;

  //  prevents the generation of unique id
  noUniqueIds?: boolean;

  // 🔷 Callback executed on selection
  onSelection?: (selected: ListOption[]) => void;

  // 🔷 Options passed down to the list
  options: ListOption[];

  // 🔷 gap between each row
  rowGap?: number;

  selectedIndex?: number;

  // 🔷 Shows a check icon on selection
  showCheckIcon?: boolean;

  size?: 'sm' | 'md' | 'lg';

  // 🔷 color of the text
  textColor?: string;

  // 🔷 color of the text when selected
  textColorSelected?: string;

  // 🔷 enables virtualization
  virtualized?: boolean;
};

type SelectListItemProps<T> = {
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

export type ListItemProps = SelectListItemProps<ListProps> & {
  disabled?: boolean;
  focus?: boolean;
  name: string;
  onSelection?: (opt: ListOption) => void;
  selected?: boolean;
  style?: { height?: string | number; top?: string | number };
  value: string;
};

export type ListItemContentProps = Pick<
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

export type ListItemsProps = Omit<
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

export function ParseOptions(
  options: ListOption[],
  rowGap: number,
  itemHeight: number,
  noUniqueIds: boolean
): ListOption[] {
  return options
    .sort((a, b) => (b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 1))
    .filter(opt => (!isUndefined(opt.visible) ? opt.visible : true))
    .map((option, index) => ({
      id: !noUniqueIds ? nanoid() : option.id,
      ...option,
      selected: !isUndefined(option.selected) ? option.selected : false,
      top: index > 0 ? index * (itemHeight + rowGap) + rowGap : rowGap,
      value: option.value || option.name,
      visible: true,
    }));
}
