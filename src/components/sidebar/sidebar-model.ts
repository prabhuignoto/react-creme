export interface SidebarModel {
  groups: SidebarGroupModel[];
  onSelect?: (group: SidebarGroupModel, item: SidebarItemModel) => void;
}

export interface SidebarGroupModel {
  title: string;
  items: SidebarItemModel[];
  id?: string;
}

export interface SidebarItemModel {
  id?: string;
  name: string;
  selected?: boolean;
}
