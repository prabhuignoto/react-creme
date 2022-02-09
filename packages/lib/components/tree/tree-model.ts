export type TreeNodeProps = {
  enableCheckbox?: boolean;
  id?: string;
  isChecked?: boolean;
  isChild?: boolean;
  name?: string;
  nodes?: TreeNodeProps[];
  onSelect?: (id?: string, open?: boolean) => void;
  selected?: boolean;
};

export type TreeProps = {
  name?: string;
  nodes: TreeNodeProps[];
  onSelected?: (t: TreeNodeProps) => void;
  selectable?: boolean;
};
