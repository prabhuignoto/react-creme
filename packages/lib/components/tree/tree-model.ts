export type TreeNodeProps = {
  enableCheckbox?: boolean;
  expandedIds?: Set<string>;
  id?: string;
  isChecked?: boolean;
  isChild?: boolean;
  level?: number;
  name?: string;
  nodes?: TreeNodeProps[];
  onSelect?: (id?: string, open?: boolean) => void;
  onToggleExpand?: (id: string) => void;
  posInSet?: number;
  selected?: boolean;
  setSize?: number;
  size?: 'sm' | 'md' | 'lg';
};

export type TreeProps = {
  name?: string;
  nodes: TreeNodeProps[];
  onSelected?: (t: { id?: string; name?: string }) => void;
  selectable?: boolean;
  size?: 'sm' | 'md' | 'lg';
};
