export interface TreeItemModel {
  allowSelection?: boolean;
  child?: TreeItemModel[];
  expanded?: boolean;
  id?: string;
  name?: string;
  onChildToggle?: (expanded: boolean, childrenCount: number) => void;
  onToggle?: (id?: string) => void;
  selected?: boolean;
}

export interface TreeModel {
  allowSelection?: boolean;
  height?: number;
  isChildTree?: boolean;
  items: TreeItemModel[];
  onChildToggle?: (expanded: boolean, childrenCount: number) => void;
  width?: number;
  childrenSelected?: boolean;
}
