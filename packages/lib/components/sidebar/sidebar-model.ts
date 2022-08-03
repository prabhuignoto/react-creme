import { ListOption } from '../list/list-model';

export interface SidebarProps {
  border?: boolean;
  enableSearch?: boolean;
  focusable?: boolean;
  groupIconColor?: string;
  groupTitleColor?: string;
  groups: SidebarGroupModel[];
  height?: number;
  icons?: React.ReactNode[];
  iconsColor?: string;
  listMaxHeight?: number;
  onSelect?: (group: SidebarGroupModel, item: SidebarItemModel) => void;
  searchPlaceholder?: string;
  sectionsCollapsible?: boolean;
}

export interface SidebarGroupModel {
  id?: string;
  items: ListOption[];
  title: string;
  visible?: boolean;
}

export interface SidebarItemModel {
  id?: string;
  name: string;
  selected?: boolean;
  value?: string;
  visible?: boolean;
}

export type SidebarGroupsModel = Pick<
  SidebarProps,
  | 'focusable'
  | 'listMaxHeight'
  | 'sectionsCollapsible'
  | 'groupIconColor'
  | 'groupTitleColor'
  | 'icons'
  | 'enableSearch'
> & {
  groups: SidebarGroupModel[];
  onSelection: (option: ListOption[], id?: string) => void;
  sideBarHeight?: number;
};
