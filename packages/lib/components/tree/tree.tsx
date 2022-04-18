import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TreeNodeProps, TreeProps } from './tree-model';
import { TreeNode } from './tree-node';
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
  const parser: (n: TreeNodeProps[]) => TreeNodeProps[] = useCallback(
    _nodes => {
      return _nodes.map((n: TreeNodeProps) => {
        if (n.nodes?.length) {
          return {
            ...n,
            id: nanoid(),
            nodes: parser(n.nodes),
            selected: false,
          };
        }
        return { ...n, id: nanoid() };
      });
    },
    []
  );

  const [selectedId, setSelectedId] = useState<{
    id: string;
    lookupNodeId: string;
    selected: boolean;
    stamp: number;
  }>();

  const [treeNodes, setTreeNodes] = useState<TreeNodeProps[]>(parser(nodes));

  const getLookupNode = useMemo(() => {
    if (selectedId) {
      const lookupNode = treeNodes.find(
        node => node.id === selectedId.lookupNodeId
      );
      return lookupNode;
    }
  }, [JSON.stringify(selectedId)]);

  useEffect(() => {
    const node = getLookupNode;

    if (node && selectedId) {
      const nodeToUpdate = JSON.parse(JSON.stringify(node));

      const idToFind = selectedId.id;

      let nodeUpdated: TreeNodeProps;
      let nodesUpdated: TreeNodeProps[];

      if (selectable) {
        nodeUpdated = recursiveUpdateMultiSelection(nodeToUpdate, idToFind);
        setTreeNodes(prev => {
          const result = prev.map(x => {
            if (x.id === selectedId.lookupNodeId) {
              return { ...nodeUpdated };
            }
            return x;
          });
          return result;
        });
      } else {
        nodesUpdated = recursiveUpdateSingleSelection(treeNodes, idToFind);
        setTreeNodes(nodesUpdated);
      }

      const selectedNode = recursiveFind(node, selectedId.id);

      if (selectedNode) {
        const { id, name } = selectedNode;
        onSelected?.({ id, name });
      }
    }
  }, [JSON.stringify(selectedId)]);

  const handleSelection = useCallback((id?: string, open?: boolean) => {
    if (!id) {
      return;
    }
    const ids = id.split('/');
    const idToFind = ids[ids.length - 1];
    const lookupNodeId = ids[0];

    setSelectedId({
      id: idToFind,
      lookupNodeId,
      selected: open || false,
      stamp: new Date().getTime(),
    });
  }, []);

  return (
    <div role="tree">
      <TreeNode
        nodes={treeNodes}
        isChild={false}
        onSelect={handleSelection}
        enableCheckbox={selectable}
        size={size}
      />
    </div>
  );
};

export { Tree };
