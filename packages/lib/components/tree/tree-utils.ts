import { nanoid } from 'nanoid';
import { TreeNodeProps } from './tree-model';

export function Parse(nodes: TreeNodeProps[]): TreeNodeProps[] {
  return nodes.map(node => {
    if (node.nodes?.length) {
      return {
        ...node,
        id: nanoid(),
        nodes: Parse(node.nodes),
      };
    }
    return { ...node, id: nanoid() };
  });
}

export function recursiveUpdate(node: TreeNodeProps, id: string) {
  if (node.id === id) {
    node.selected = true;
    return node;
  } else if (node.nodes?.length) {
    node.nodes = node.nodes.map(x => {
      return recursiveUpdate(x, id);
    });
    return node;
  } else {
    return node;
  }
}

export function recursiveFind(
  node: TreeNodeProps,
  id: string
): TreeNodeProps | null | undefined {
  if (node.id === id) {
    return node;
  } else if (node.nodes?.length) {
    let result;
    node.nodes.forEach(n => {
      result = recursiveFind(n, id);
    });

    return result;
  } else {
    return null;
  }
}
