import { TreeNodeProps } from './tree-model';

export interface FlatTreeItem {
  id: string;
  name: string;
  node: TreeNodeProps;
  level: number;
  hasChildren: boolean;
  isExpanded: boolean;
  parentId?: string;
  posInSet: number;
  setSize: number;
}

/**
 * Flatten a tree structure into a navigable list, respecting expanded states
 * @param nodes - Tree nodes to flatten
 * @param expandedIds - Set of expanded node IDs
 * @param level - Current nesting level (for aria-level)
 * @param parentId - Parent node ID
 * @returns Flat array of tree items for keyboard navigation
 */
export function flattenTree(
  nodes: TreeNodeProps[],
  expandedIds: Set<string>,
  level = 1,
  parentId?: string
): FlatTreeItem[] {
  const result: FlatTreeItem[] = [];

  nodes.forEach((node, index) => {
    const id = node.id || '';
    const hasChildren = Boolean(node.nodes?.length);
    const isExpanded = expandedIds.has(id);

    result.push({
      hasChildren,
      id,
      isExpanded,
      level,
      name: node.name || '',
      node,
      parentId,
      posInSet: index + 1,
      setSize: nodes.length,
    });

    // Recursively add children if this node is expanded
    if (hasChildren && isExpanded && node.nodes) {
      result.push(...flattenTree(node.nodes, expandedIds, level + 1, id));
    }
  });

  return result;
}

/**
 * Get the index of the next focusable item
 */
export function getNextIndex(
  currentIndex: number,
  flatItems: FlatTreeItem[]
): number {
  if (currentIndex >= flatItems.length - 1) {
    return currentIndex; // Already at the end
  }
  return currentIndex + 1;
}

/**
 * Get the index of the previous focusable item
 */
export function getPreviousIndex(
  currentIndex: number
  // _flatItems: FlatTreeItem[] // eslint-disable-line @typescript-eslint/no-unused-vars
): number {
  if (currentIndex <= 0) {
    return currentIndex; // Already at the start
  }
  return currentIndex - 1;
}

/**
 * Get the index of the first item
 */
export function getFirstIndex(): number {
  return 0;
}

/**
 * Get the index of the last item
 */
export function getLastIndex(flatItems: FlatTreeItem[]): number {
  return Math.max(0, flatItems.length - 1);
}

/**
 * Get the parent item of the current item
 */
export function getParentItem(
  currentItem: FlatTreeItem,
  flatItems: FlatTreeItem[]
): FlatTreeItem | null {
  if (!currentItem.parentId) {
    return null;
  }
  return flatItems.find(item => item.id === currentItem.parentId) || null;
}
