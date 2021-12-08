export interface TreeItemModel extends TreeCommonModel {
  child?: TreeItemModel[];
  disabled?: boolean;
  expanded?: boolean;
  id?: string;
  name?: string;
  onToggle?: (id?: string) => void;
  selected?: boolean;
}

export interface TreeModel extends TreeCommonModel {
  childrenSelected?: boolean;
  height?: number;
  isChildTree?: boolean;
  items: TreeItemModel[];
}

export interface TreeCommonModel {
  onChange?: (name?: string) => void;
  allowSelection?: boolean;
  onChildToggle?: (expanded: boolean, childrenCount: number) => void;
  width?: number;
  iconType?: "plus" | "chevron";
}
