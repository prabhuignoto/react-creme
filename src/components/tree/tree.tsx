import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { CSSProperties, useCallback, useMemo, useState } from "react";
import { TreeItem } from "./tree-item";
import { TreeModel } from "./tree-model";
import "./tree.scss";

const Tree: React.FunctionComponent<TreeModel> = React.memo(
  ({
    allowSelection,
    childrenSelected,
    height = 200,
    isChildTree,
    items,
    onChildToggle,
    width = 100,
  }: TreeModel) => {
    const [_items, setItems] = useState(
      items.map((item) => ({
        id: nanoid(),
        ...item,
      }))
    );

    const toggleItem = useCallback(
      (id?: string) => {
        setItems((prev) =>
          prev.map((item) => ({
            ...item,
            expanded: id === item.id ? !item.expanded : item.expanded,
          }))
        );
      },
      [_items.length]
    );

    const treeStyle = useMemo(
      () =>
        ({
          "--width": `${width}px`,
          "--height": `${height}px`,
        } as CSSProperties),
      []
    );

    return (
      <div
        className={classNames({ "rc-tree-wrapper": !isChildTree })}
        role="tree"
        style={treeStyle}
      >
        {_items.map(({ id, name, expanded, child }) => (
          <TreeItem
            id={id}
            name={name}
            expanded={expanded}
            child={child}
            key={id}
            onToggle={toggleItem}
            onChildToggle={onChildToggle}
            allowSelection={allowSelection}
            selected={childrenSelected}
          />
        ))}
      </div>
    );
  }
);

Tree.displayName = "Tree";

export { Tree };
