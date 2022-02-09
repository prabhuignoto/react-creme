import { nanoid } from 'nanoid';
import { TreeNodeProps } from './tree-model';

export function Parse(nodes: TreeNodeProps[]): TreeNodeProps[] {
  console.log('rendering');
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

export function recursiveUpdate(
  node: TreeNodeProps,
  id: string,
  forceSelect?: boolean,
  forceSelectVal?: undefined | boolean,
  invertSelection?: boolean,
  allowMultiSelect?: boolean
) {
  // console.log(node);
  // debugger;
  if (node.id === id || forceSelect) {
    if (invertSelection) {
      node.selected =
        typeof forceSelectVal !== 'undefined' ? forceSelectVal : !node.selected;
    } else {
      node.selected = true;
    }

    if (node.nodes?.length) {
      node.nodes.forEach(n =>
        recursiveUpdate(
          n,
          id,
          true,
          node.selected,
          invertSelection,
          allowMultiSelect
        )
      );
    }

    // console.log(node.id, selected);

    return node;
  } else if (node.nodes?.length) {
    node.nodes = node.nodes.map(x => {
      return recursiveUpdate(
        x,
        id,
        undefined,
        undefined,
        invertSelection,
        allowMultiSelect
      );
    });

    return node;
    // return { ...node };
  } else {
    if (!allowMultiSelect) {
      node.selected = false;
    }
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
