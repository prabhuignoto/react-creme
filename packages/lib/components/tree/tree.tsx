import React, { useMemo, useState } from 'react';
import { Accordion } from '../accordion/accordion';
import { TreeNodeProps, TreeProps } from './tree-model';
import { Parse, recursiveFind, recursiveUpdate } from './tree-utils';

const AccordionMemo = React.memo(Accordion);

const TreeNode: React.FunctionComponent<TreeNodeProps> = React.memo(
  (props: TreeNodeProps) => {
    const { nodes = [], isChild, selected, onSelect, id } = props;

    const style = useMemo(() => {
      if (isChild) {
        return {
          paddingLeft: '1.5rem',
        };
      } else {
        return {
          maxHeight: '900px',
          transition: 'max-height 0.5s ease-in',
        };
      }
    }, [isChild, selected]);

    return (
      <div style={style} id={id}>
        {nodes.map((node, index) => (
          <AccordionMemo
            key={index}
            title={node.name}
            disableIcon={!node.nodes?.length}
            autoSetBodyHeight={false}
            onChange={() => {
              onSelect?.(node.id);
            }}
            selected={node.selected}
          >
            {node.nodes?.length && (
              <div
                style={{
                  margin: '0.5rem 0',
                }}
              >
                <TreeNode
                  key={index}
                  nodes={node.nodes || []}
                  name={node.name}
                  isChild
                  id={node.id}
                  onSelect={x => onSelect?.(node.id + '/' + x)}
                  selected={node.selected}
                />
              </div>
            )}
          </AccordionMemo>
        ))}
      </div>
    );
  }
);

TreeNode.displayName = 'TreeNode';

const Tree = ({ nodes, onSelected }: TreeProps) => {
  const [treeNodes, setTreeNodes] = useState(Parse(nodes));

  const handleSelection = (id?: string) => {
    if (!id) {
      return;
    }

    const ids = id.split('/');

    const idToFind = ids[ids.length - 1];

    const node = treeNodes.find(x => x.id === ids[0]);

    if (node) {
      const nodeCopy = JSON.parse(JSON.stringify(node));

      const nodeCopyUpdated = recursiveUpdate(nodeCopy, idToFind);

      setTreeNodes(
        treeNodes.map(x => {
          if (x.id === ids[0]) {
            return nodeCopyUpdated;
          }
          return x;
        })
      );

      const selectedNode = recursiveFind(nodeCopyUpdated, idToFind);

      if (selectedNode) {
        onSelected?.(selectedNode);
      }
    }
  };

  return (
    <TreeNode nodes={treeNodes} isChild={false} onSelect={handleSelection} />
  );
};

export { Tree };
