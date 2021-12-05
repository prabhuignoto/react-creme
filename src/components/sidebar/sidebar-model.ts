import { ListOption } from "../list/list-model";

export interface SidebarModel {
  groups: SidebarGroupModel[];
  onSelect?: (group: SidebarGroupModel, item: SidebarItemModel) => void;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  border?: boolean;
}

export interface SidebarGroupModel {
  title: string;
  items: ListOption[];
  id?: string;
  visible?: boolean;
}

export interface SidebarItemModel {
  id?: string;
  name: string;
  selected?: boolean;
  visible?: boolean;
}
