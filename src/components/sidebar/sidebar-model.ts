export interface SidebarModel {
  groups: SidebarGroupModel[];
  onSelect?: (group: SidebarGroupModel, item: SidebarItemModel) => void;
  enableSearch?: boolean;
}

export interface SidebarGroupModel {
  title: string;
  items: SidebarItemModel[];
  id?: string;
  visible?: boolean;
}

export interface SidebarItemModel {
  id?: string;
  name: string;
  selected?: boolean;
  visible?: boolean;
}
