import { nanoid } from 'nanoid';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TreeNodeProps, TreeProps } from './tree-model';
import { TreeNode } from './tree-node';
import {
  flattenTree,
  getFirstIndex,
  getLastIndex,
  getNextIndex,
  getParentItem,
  getPreviousIndex,
} from './tree-navigation';
import {
  recursiveFind,
  recursiveUpdateMultiSelection,
  recursiveUpdateSingleSelection,
} from './tree-utils';

const Tree: React.FunctionComponent<TreeProps> = ({
  nodes,
  onSelected,
  selectable,
  size = 'sm',
}: TreeProps) => {
  // Maintain stable IDs for tree nodes across renders using a ref
  const idMapRef = useRef<Map<string, string>>(new Map());

  // Get or create a stable ID for a given node name
  const getStableId = useCallback((nodeName: string, parentPath = '') => {
    const key = `${parentPath}/${nodeName}`;
    if (!idMapRef.current.has(key)) {
      idMapRef.current.set(key, nanoid());
    }
    return idMapRef.current.get(key)!;
  }, []);

  // Parse nodes with stable IDs
  const parser: (n: TreeNodeProps[], parentPath?: string) => TreeNodeProps[] =
    useCallback(
      (_nodes, parentPath = '') => {
        return _nodes.map((n: TreeNodeProps) => {
          const nodeName = n.name || '';
          const stableId = getStableId(nodeName, parentPath);

          if (n.nodes?.length) {
            return {
              ...n,
              id: stableId,
              nodes: parser(n.nodes, `${parentPath}/${nodeName}`),
              selected: false,
            };
          }
          return { ...n, id: stableId };
        });
      },
      [getStableId]
    );

  const [selectedId, setSelectedId] = useState<{
    id: string;
    lookupNodeId: string;
    selected: boolean;
    stamp: number;
  }>();

  // Parse nodes into tree structure with stable IDs (derived from props, not state)
  const parsedNodes = useMemo(() => parser(nodes), [nodes, parser]);

  const [treeNodes, setTreeNodes] = useState<TreeNodeProps[]>(parsedNodes);

  // Update treeNodes when parsedNodes change
  useEffect(() => {
    setTreeNodes(parsedNodes);
  }, [parsedNodes]);

  // Track expanded nodes for keyboard navigation
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Track focused item for keyboard navigation
  const [focusedId, setFocusedId] = useState<string>('');

  // Reference to the tree container for keyboard events
  const treeRef = useRef<HTMLDivElement>(null);

  // Build flat tree for keyboard navigation
  const flatTree = useMemo(
    () => flattenTree(treeNodes, expandedIds),
    [treeNodes, expandedIds]
  );

  // Store onSelected callback in ref to avoid re-render loop
  const onSelectedRef = useRef(onSelected);
  useEffect(() => {
    onSelectedRef.current = onSelected;
  }, [onSelected]);

  // Track last processed selection to avoid redundant updates
  const lastProcessedStamp = useRef<number>(0);

  useEffect(() => {
    if (!selectedId || selectedId.stamp === lastProcessedStamp.current) {
      return;
    }

    // Mark this selection as processed first to prevent re-entry
    lastProcessedStamp.current = selectedId.stamp;

    const idToFind = selectedId.id;
    const lookupNodeId = selectedId.lookupNodeId;

    // Store reference to selected node info before setState
    let selectedNodeInfo: { id?: string; name?: string } | null = null;

    // Use functional setState to avoid circular dependency on treeNodes
    setTreeNodes(prev => {
      // Find the lookup node from current state
      const lookupNode = prev.find(node => node.id === lookupNodeId);

      if (!lookupNode) {
        return prev;
      }

      // Find and store selected node info before mutations
      const selectedNode = recursiveFind(lookupNode, idToFind);
      if (selectedNode) {
        selectedNodeInfo = { id: selectedNode.id, name: selectedNode.name };
      }

      const nodeToUpdate = JSON.parse(JSON.stringify(lookupNode));

      if (selectable) {
        const nodeUpdated = recursiveUpdateMultiSelection(
          nodeToUpdate,
          idToFind
        );
        return prev.map(x => {
          if (x.id === lookupNodeId) {
            return { ...nodeUpdated };
          }
          return x;
        });
      } else {
        return recursiveUpdateSingleSelection(prev, idToFind);
      }
    });

    // Notify parent after state update (outside of setState)
    if (selectedNodeInfo) {
      onSelectedRef.current?.(selectedNodeInfo);
    }
  }, [
    selectedId?.id,
    selectedId?.lookupNodeId,
    selectedId?.selected,
    selectedId?.stamp,
    selectable,
  ]);

  const handleSelection = useCallback((id?: string, open?: boolean) => {
    if (!id) {
      return;
    }
    const ids = id.split('/');
    const idToFind = ids[ids.length - 1] || '';
    const lookupNodeId = ids[0] || '';

    setSelectedId({
      id: idToFind,
      lookupNodeId,
      selected: open || false,
      stamp: new Date().getTime(),
    });
  }, []);

  // Toggle expansion state
  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Keyboard navigation for tree
  useEffect(() => {
    const treeContainer = treeRef.current;
    if (!treeContainer || flatTree.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Find the currently focused item
      const currentIndex = flatTree.findIndex(item => item.id === focusedId);
      if (currentIndex === -1) {
        // If nothing focused, focus first item on any arrow key
        if (
          [
            'ArrowDown',
            'ArrowUp',
            'ArrowLeft',
            'ArrowRight',
            'Home',
            'End',
          ].includes(e.key)
        ) {
          e.preventDefault();
          setFocusedId(flatTree[0]?.id || '');
        }
        return;
      }

      const currentItem = flatTree[currentIndex];
      if (!currentItem) return;

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          const nextIndex = getNextIndex(currentIndex, flatTree);
          if (nextIndex !== currentIndex) {
            setFocusedId(flatTree[nextIndex]?.id || '');
          }
          break;
        }

        case 'ArrowUp': {
          e.preventDefault();
          const prevIndex = getPreviousIndex(currentIndex);
          if (prevIndex !== currentIndex) {
            setFocusedId(flatTree[prevIndex]?.id || '');
          }
          break;
        }

        case 'ArrowRight':
          e.preventDefault();
          if (currentItem.hasChildren) {
            if (!currentItem.isExpanded) {
              // Expand the node
              toggleExpanded(currentItem.id);
            } else {
              // Move to first child
              const nextIdx = getNextIndex(currentIndex, flatTree);
              if (nextIdx !== currentIndex) {
                setFocusedId(flatTree[nextIdx]?.id || '');
              }
            }
          }
          break;

        case 'ArrowLeft':
          e.preventDefault();
          if (currentItem.isExpanded && currentItem.hasChildren) {
            // Collapse the node
            toggleExpanded(currentItem.id);
          } else {
            // Move to parent
            const parent = getParentItem(currentItem, flatTree);
            if (parent) {
              setFocusedId(parent.id);
            }
          }
          break;

        case 'Home': {
          e.preventDefault();
          const firstIdx = getFirstIndex();
          setFocusedId(flatTree[firstIdx]?.id || '');
          break;
        }

        case 'End': {
          e.preventDefault();
          const lastIdx = getLastIndex(flatTree);
          setFocusedId(flatTree[lastIdx]?.id || '');
          break;
        }

        case 'Enter':
          e.preventDefault();
          if (selectable) {
            // In selectable mode, Enter toggles selection
            handleSelection(currentItem.id);
          } else if (currentItem.hasChildren) {
            // In non-selectable mode, Enter toggles expansion
            toggleExpanded(currentItem.id);
          } else {
            // Non-selectable, no children: select the item
            handleSelection(currentItem.id);
          }
          break;

        case ' ':
          e.preventDefault();
          if (selectable) {
            // In selectable mode, Space toggles selection
            handleSelection(currentItem.id);
          } else if (currentItem.hasChildren) {
            // In non-selectable mode, Space toggles expansion
            toggleExpanded(currentItem.id);
          }
          break;

        case '*': {
          // Expand all siblings at current level
          e.preventDefault();
          const siblingsToExpand = flatTree
            .filter(
              item => item.level === currentItem.level && item.hasChildren
            )
            .map(item => item.id);
          setExpandedIds(prev => {
            const next = new Set(prev);
            siblingsToExpand.forEach(id => next.add(id));
            return next;
          });
          break;
        }
      }
    };

    treeContainer.addEventListener('keydown', handleKeyDown);

    return () => {
      treeContainer.removeEventListener('keydown', handleKeyDown);
    };
  }, [flatTree, focusedId, selectable, handleSelection, toggleExpanded]);

  // Focus management - focus the button when focusedId changes
  useEffect(() => {
    if (focusedId && treeRef.current) {
      const button = treeRef.current.querySelector<HTMLButtonElement>(
        `button[id="${focusedId}"]`
      );
      if (button) {
        button.focus();
      }
    }
  }, [focusedId]);

  return (
    <div role="tree" ref={treeRef} aria-label="Tree navigation">
      <TreeNode
        nodes={treeNodes}
        isChild={false}
        onSelect={handleSelection}
        enableCheckbox={selectable}
        size={size}
        expandedIds={expandedIds}
        onToggleExpand={toggleExpanded}
      />
    </div>
  );
};

export { Tree };
