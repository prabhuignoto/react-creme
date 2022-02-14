import React, { useCallback, useMemo, useState } from 'react';
import { Accordion, CheckBox } from '..';
import { TreeNodeProps } from './tree-model';

const TreeNode: React.FunctionComponent<TreeNodeProps> = React.memo(
  (props: TreeNodeProps) => {
    const {
      nodes = [],
      isChild,
      selected,
      onSelect,
      id,
      enableCheckbox,
      size,
    } = props;

    const style = useMemo(() => {
      if (isChild) {
        return {
          paddingLeft: '1.5rem',
        };
      } else {
        return {
          transition: 'max-height 0.5s ease-in',
        };
      }
    }, [isChild, selected]);

    const [expanded, setExpanded] = useState(false);

    const handleChange = useCallback((open?: boolean, id?: string) => {
      onSelect?.(id, open);

      if (open) {
        setExpanded(open);
      }
    }, []);

    return (
      <div
        style={style}
        id={id}
        role="treeitem"
        aria-expanded={expanded}
        aria-checked={enableCheckbox && selected}
      >
        {nodes.map((node, index) => (
          <div key={index} style={{ marginBottom: '0.25rem' }}>
            <Accordion
              title={node.name}
              disableIcon={!node.nodes?.length}
              autoSetBodyHeight={false}
              disableARIA
              size={size}
              onChange={open => {
                if (!enableCheckbox) {
                  handleChange(open, node.id);
                }
              }}
              selected={!enableCheckbox && node.selected}
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
                    autoHeight
                    size={size}
                  />
                ) : null
              }
            >
              {node.nodes?.length && (
                <div
                  style={{
                    margin: '0.5rem 0',
                  }}
                  role="tree"
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
                    size={size}
                  />
                </div>
              )}
            </Accordion>
          </div>
        ))}
      </div>
    );
  }
);

TreeNode.displayName = 'TreeNode';

export { TreeNode };
