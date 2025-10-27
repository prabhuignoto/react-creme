import { TreeNodeProps } from './tree-model';

export function recursiveUpdateMultiSelection(
  node: TreeNodeProps,
  id: string,
  forceSelect?: boolean,
  forceSelectVal?: undefined | boolean
) {
  if (node.id === id || forceSelect) {
    node.selected =
      typeof forceSelectVal !== 'undefined' ? forceSelectVal : !node.selected;

    if (node.nodes?.length) {
      node.nodes.forEach(n =>
        recursiveUpdateMultiSelection(n, id, true, node.selected)
      );
    }

    return node;
  } else if (node.nodes?.length) {
    node.nodes = node.nodes.map(x => {
      return recursiveUpdateMultiSelection(x, id, undefined, undefined);
    });

    return node;
  } else {
    return node;
  }
}

export function recursiveUpdateSingleSelection(
  nodes: TreeNodeProps[],
  idToFind: string
) {
  return nodes.map(node => {
    if (node.id === idToFind) {
      node.selected = true;
      if (node.nodes?.length) {
        node.nodes = recursiveUpdateSingleSelection(node.nodes, idToFind);
      }
    } else {
      if (node.nodes?.length) {
        node.nodes = recursiveUpdateSingleSelection(node.nodes, idToFind);
      }
      node.selected = false;
    }
    return node;
  });
}

export function recursiveFind(
  node: TreeNodeProps,
  id: string
): TreeNodeProps | null | undefined {
  if (node.id === id) {
    return node;
  } else if (node.nodes?.length) {
    let result;
    for (let i = 0; i < node.nodes.length; i++) {
      const childNode = node.nodes[i];
      if (childNode) {
        result = recursiveFind(childNode, id);
        if (result) {
          return result;
        }
      }
    }

    return result;
  } else {
    return null;
  }
}
