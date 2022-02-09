import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckBox } from '..';
import { Accordion } from '../accordion/accordion';
import { TreeNodeProps, TreeProps } from './tree-model';
import { recursiveUpdate } from './tree-utils';

const AccordionMemo = React.memo(Accordion);

const TreeNode: React.FunctionComponent<TreeNodeProps> = React.memo(
  (props: TreeNodeProps) => {
    const {
      nodes = [],
      isChild,
      selected,
      onSelect,
      id,
      enableCheckbox,
    } = props;

    const style = useMemo(() => {
      if (isChild) {
        return {
          // margin: '1rem 0',
          paddingLeft: '1.5rem',
        };
      } else {
        return {
          // marginBottom: '1rem',
          // maxHeight: '900px',
          transition: 'max-height 0.5s ease-in',
        };
      }
    }, [isChild, selected]);

    const [expanded] = useState(false);

    const handleChange = useCallback((open?: boolean, id?: string) => {
      onSelect?.(id, open);
      // setExpanded(open);
    }, []);

    return (
      <div style={style} id={id} role="treeitem" aria-expanded={expanded}>
        {nodes.map((node, index) => (
          <div key={index} style={{ marginBottom: '0.25rem' }}>
            <AccordionMemo
              title={node.name}
              disableIcon={!node.nodes?.length}
              autoSetBodyHeight={false}
              onChange={open => {
                if (!enableCheckbox) {
                  handleChange(open, node.id);
                }
              }}
              selected={node.selected}
              customContent={
                enableCheckbox ? (
                  <CheckBox
                    label={node.name || ''}
                    noUniqueId
                    id={node.id}
                    focusable={false}
                    onChange={(_, selected) => handleChange(selected, node.id)}
                    isChecked={node.selected}
                    noHoverStyle
                  />
                ) : null
              }
            >
              {node.nodes?.length && (
                <div
                  style={{
                    margin: '0.5rem 0',
                  }}
                >
                  <TreeNode
                    key={node.id}
                    nodes={node.nodes || []}
                    name={node.name}
                    isChild
                    id={node.id}
                    onSelect={x => onSelect?.(node.id + '/' + x, node.selected)}
                    selected={node.selected}
                    enableCheckbox={enableCheckbox}
                  />
                </div>
              )}
            </AccordionMemo>
          </div>
        ))}
      </div>
    );
  }
);

TreeNode.displayName = 'TreeNode';

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

      const nodeCopyUpdated = recursiveUpdate(
        nodeToUpdate,
        idToFind,
        false,
        undefined,
        true,
        true
      );
      console.log(nodeCopyUpdated);

      setTreeNodes(prev => {
        const result = prev.map(x => {
          if (x.id === selectedId.lookupNodeId) {
            return { ...nodeCopyUpdated };
          }
          return x;
        });
        return result;
      });

      // const selectedNode = recursiveFind(nodeCopyUpdated, idToFind);

      // if (selectedNode) {
      //   onSelected?.(selectedNode);
      // }
    }
  }, [JSON.stringify(getLookupNode), JSON.stringify(selectedId)]);

  const handleSelection = useCallback((id?: string, open?: boolean) => {
    // console.log(id, open);
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
