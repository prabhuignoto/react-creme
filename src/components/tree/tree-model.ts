export interface TreeItemModel {
  allowSelection?: boolean;
  child?: TreeItemModel[];
  expanded?: boolean;
  id?: string;
  name?: string;
  onChange?: (name?: string) => void;
  onChildToggle?: (expanded: boolean, childrenCount: number) => void;
  onToggle?: (id?: string) => void;
  selected?: boolean;
  width?: number;
  disabled?: boolean;
}

export interface TreeModel {
  allowSelection?: boolean;
  childrenSelected?: boolean;
  height?: number;
  isChildTree?: boolean;
  items: TreeItemModel[];
  onChange?: (name?: string) => void;
  onChildToggle?: (expanded: boolean, childrenCount: number) => void;
  width?: number;
}
