export type TreeNodeProps = {
  enableCheckbox?: boolean;
  id?: string;
  isChecked?: boolean;
  isChild?: boolean;
  name?: string;
  nodes?: TreeNodeProps[];
  onSelect?: (id?: string, open?: boolean) => void;
  selected?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export type TreeProps = {
  name?: string;
  nodes: TreeNodeProps[];
  onSelected?: (t: { id?: string; name?: string }) => void;
  selectable?: boolean;
  size?: 'sm' | 'md' | 'lg';
};
