export interface TreeItemModel {
  name?: string;
  expanded?: boolean;
  child?: TreeItemModel[];
  id?: string;
  onToggle?: (id?: string) => void;
  onChildToggle?: (expanded: boolean, childrenCount: number) => void;
}

export interface TreeModel {
  items: TreeItemModel[];
  isChildTree?: boolean;
  width?: number;
  height?: number;
  onChildToggle?: (expanded: boolean, childrenCount: number) => void;
}
