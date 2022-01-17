export interface TreeItemProps extends TreeCommonProps {
  child?: TreeItemProps[];
  disabled?: boolean;
  expanded?: boolean;
  id?: string;
  name?: string;
  onToggle?: (id?: string) => void;
  selected?: boolean;
}

export interface TreeProps extends TreeCommonProps {
  childrenSelected?: boolean;
  height?: number;
  isChildTree?: boolean;
  items: TreeItemProps[];
}

export interface TreeCommonProps {
  allowSelection?: boolean;
  iconType?: "plus" | "chevron";
  onChange?: (name?: string) => void;
  onChildToggle?: (expanded: boolean, childrenCount: number) => void;
  width?: number;
}
