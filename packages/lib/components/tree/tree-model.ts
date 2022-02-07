export type TreeNodeProps = {
  id?: string;
  isChild?: boolean;
  name?: string;
  nodes?: TreeNodeProps[];
  onSelect?: (id?: string) => void;
  selected?: boolean;
};

export type TreeProps = {
  name?: string;
  nodes: TreeNodeProps[];
  onSelected?: (t: TreeNodeProps) => void;
};
