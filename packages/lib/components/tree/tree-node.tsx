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
      expandedIds = new Set<string>(),
      onToggleExpand,
      level = 1,
      parentPath = '',
    } = props;

    const containerClass = classNames({
      [styles.tree_root]: !isChild,
      [styles.tree_node]: isChild,
    });

    const checkboxEnabled = !!enableCheckbox;
    const controlSize = size ?? 'sm';

    const handleSelect = useCallback(
      (nodePath?: string, selected?: boolean) => {
        if (!nodePath) {
          return;
        }
        onSelect?.(nodePath, selected);
      },
      [onSelect]
    );

    return (
      <div className={containerClass}>
        {nodes.map((node, index) => {
          const nodeId = node.id || '';
          const nodePath = parentPath ? `${parentPath}/${nodeId}` : nodeId;
          const isExpanded = expandedIds?.has(nodeId) || false;
          const childProps = {
            key: node.id,
            nodes: node.nodes || [],
            isChild: true,
            id: nodeId,
            selected: Boolean(node.selected),
            enableCheckbox: checkboxEnabled,
            size: controlSize,
            expandedIds,
            ...(onToggleExpand ? { onToggleExpand } : {}),
            level: level + 1,
            parentPath: nodePath,
            ...(onSelect ? { onSelect } : {}),
          };

          return (
            <div key={nodeId || index} className={styles.tree_item}>
              <Accordion
                id={nodeId}
                title={node.name || ''}
                disableIcon={!node.nodes?.length}
                autoSetBodyHeight={false}
                disableARIA={false}
                size={controlSize}
                expanded={isExpanded}
                onChange={open => {
                  onToggleExpand?.(nodeId);
                  if (!checkboxEnabled) {
                    handleSelect(nodePath, open);
                  }
                }}
                animate={false}
                customContent={
                  checkboxEnabled ? (
                    <CheckBox
                      label={node.name || ''}
                      noUniqueId
                      id={nodeId}
                      focusable={false}
                      onChange={(_, nodeSelected) =>
                        handleSelect(nodePath, nodeSelected)
                      }
                      isChecked={Boolean(node.selected)}
                      noHoverStyle
                      autoHeight
                      size={controlSize}
                      disabled={Boolean(node.disabled)}
                    />
                  ) : null
                }
              >
                {Boolean(node.nodes?.length) && (
                  <div className={styles.tree_children}>
                    <TreeNode {...childProps} />
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
