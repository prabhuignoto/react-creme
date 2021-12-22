import { ListOption } from "../list/list-model";

export interface SidebarModel extends SidebarCommonProps {
  backGroundColor?: string;
  border?: boolean;
  enableSearch?: boolean;
  groups: SidebarGroupModel[];
  height?: number;
  minimizeSidebar?: boolean;
  onSelect?: (group: SidebarGroupModel, item: SidebarItemModel) => void;
  searchPlaceholder?: string;
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
  visible?: boolean;
}

export interface SidebarGroupsModel extends SidebarCommonProps {
  groups: SidebarGroupModel[];
  onSelection: (option: ListOption[], id?: string) => void;
  sideBarHeight?: number;
}

export interface SidebarCommonProps {
  groupIconColor?: string;
  focusable?: boolean;
  groupTitleColor?: string;
  listMaxHeight?: number;
}
