import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { CSSProperties, useCallback, useMemo, useState } from "react";
import { TreeItem } from "./tree-item";
import { TreeModel } from "./tree-model";
import "./tree.scss";

const Tree: React.FunctionComponent<TreeModel> = React.memo(
  ({
    items,
    isChildTree,
    width = 100,
    height = 200,
    onChildToggle,
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
          />
        ))}
      </div>
    );
  }
);

Tree.displayName = "Tree";

export { Tree };
