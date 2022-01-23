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

  // 🔷 Shows a check icon on selection
  showCheckIcon?: boolean;

  // 🔷 color of the text
  textColor?: string;

  // 🔷 color of the text when selected
  textColorSelected?: string;

  // 🔷 enables virtualization
  virtualized?: boolean;
};

type PickListItemProps<T> = {
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

export type ListItemProps = PickListItemProps<ListProps> & {
  disabled?: boolean;
  focus?: boolean;
  name: string;
  onSelection?: (opt: ListOption) => void;
  selected?: boolean;
  style?: React.CSSProperties;
  value: string;
};

export type ListItemOptionProps = Pick<
  ListItemProps,
  'focusable' | 'name' | 'textColor' | 'textColorSelected' | 'RTL' | 'selected'
> & {
  showCheck?: boolean;
  tabIndex: number;
};

export interface ListOption extends Option {
  focus?: boolean;
  group?: string;
  top?: number;
  visible?: boolean;
}
