import classNames from 'classnames';
import React, { useCallback } from 'react';
import { Accordion, CheckBox } from '..';
import { TreeNodeProps } from './tree-model';
import styles from './tree.module.scss';

const TreeNode: React.FunctionComponent<TreeNodeProps> = React.memo(
  (props: TreeNodeProps) => {
    const {
      nodes = [],
      isChild,
      onSelect,
      enableCheckbox,
      size,
      expandedIds,
      onToggleExpand,
      level = 1,
    } = props;

    const containerClass = classNames({
      [styles.tree_root]: !isChild,
      [styles.tree_node]: isChild,
    });

    const handleChange = useCallback(
      (open?: boolean, nodeId?: string) => {
        onSelect?.(nodeId, open);

        // Toggle expansion via parent's state
        if (nodeId && onToggleExpand) {
          onToggleExpand(nodeId);
        }
      },
      [onSelect, onToggleExpand]
    );

    return (
      <div className={containerClass}>
        {nodes.map((node, index) => {
          const nodeId = node.id || '';
          const isExpanded = expandedIds?.has(nodeId) || false;

          return (
            <div key={nodeId || index} className={styles.tree_item}>
              <Accordion
                id={nodeId}
                title={node.name}
                disableIcon={!node.nodes?.length}
                autoSetBodyHeight={false}
                disableARIA={false}
                size={size}
                expanded={isExpanded}
                onChange={open => {
                  if (!enableCheckbox) {
                    handleChange(open, node.id);
                  }
                }}
                animate={false}
                customContent={
                  enableCheckbox ? (
                    <CheckBox
                      label={node.name || ''}
                      noUniqueId
                      id={node.id}
                      focusable={false}
                      onChange={(_, nodeSelected) =>
                        handleChange(nodeSelected, node.id)
                      }
                      isChecked={node.selected}
                      noHoverStyle
                      autoHeight
                      size={size}
                    />
                  ) : null
                }
              >
                {Boolean(node.nodes?.length) && (
                  <div className={styles.tree_children}>
                    <TreeNode
                      key={node.id}
                      nodes={node.nodes || []}
                      name={node.name}
                      isChild
                      id={node.id}
                      onSelect={x =>
                        onSelect?.(node.id + '/' + x, node.selected)
                      }
                      selected={node.selected}
                      enableCheckbox={enableCheckbox}
                      size={size}
                      expandedIds={expandedIds}
                      onToggleExpand={onToggleExpand}
                      level={level + 1}
                    />
                  </div>
                )}
              </Accordion>
            </div>
          );
        })}
      </div>
    );
  }
);

TreeNode.displayName = 'TreeNode';

export { TreeNode };
