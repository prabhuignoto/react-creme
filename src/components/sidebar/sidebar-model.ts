import { ListOption } from "../list/list-model";

export interface SidebarModel {
  border?: boolean;
  enableSearch?: boolean;
  groups: SidebarGroupModel[];
  listMaxHeight?: number;
  onSelect?: (group: SidebarGroupModel, item: SidebarItemModel) => void;
  searchPlaceholder?: string;
  minimizeSidebar?: boolean;
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
