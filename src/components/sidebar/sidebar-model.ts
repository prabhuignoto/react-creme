import { ListOption } from "../list/list-model";

export interface SidebarModel {
  backGroundColor?: string;
  border?: boolean;
  enableSearch?: boolean;
  groupIconColor?: string;
  groupTitleColor?: string;
  groups: SidebarGroupModel[];
  height?: number;
  listMaxHeight?: number;
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
