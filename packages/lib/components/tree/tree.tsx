import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TreeNodeProps, TreeProps } from './tree-model';
import { TreeNode } from './tree-node';
import {
  recursiveUpdateMultiSelection,
  recursiveUpdateSingleSelection,
} from './tree-utils';

const Tree: React.FunctionComponent<TreeProps> = ({
  nodes,
  // onSelected,
  selectable,
}: TreeProps) => {
  const parser = useCallback(_nodes => {
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
  }, []);

  const [selectedId, setSelectedId] = useState<{
    id: string;
    lookupNodeId: string;
    selected: boolean;
    stamp: number;
  }>();

  const [treeNodes, setTreeNodes] = useState<TreeNodeProps[]>(() => {
    return parser(nodes);
  });

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

      let nodeCopyUpdated: TreeNodeProps;
      let nodesCopyUpdated: TreeNodeProps[];

      if (selectable) {
        nodeCopyUpdated = recursiveUpdateMultiSelection(
          nodeToUpdate,
          idToFind,
          false,
          undefined
        );
        setTreeNodes(prev => {
          const result = prev.map(x => {
            if (x.id === selectedId.lookupNodeId) {
              return { ...nodeCopyUpdated };
            }
            return x;
          });
          return result;
        });
      } else {
        nodesCopyUpdated = recursiveUpdateSingleSelection(treeNodes, idToFind);
        setTreeNodes(nodesCopyUpdated);
      }

      // const selectedNode = recursiveFind(nodeCopyUpdated, idToFind);

      // if (selectedNode) {
      //   onSelected?.(selectedNode);
      // }
    }
  }, [JSON.stringify(getLookupNode), JSON.stringify(selectedId)]);

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
      />
    </div>
  );
};

export { Tree };
