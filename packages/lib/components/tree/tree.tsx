import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { TreeItem } from "./tree-item";
import { TreeModel } from "./tree-model";
import "./tree.scss";

const Tree: React.FunctionComponent<TreeModel> = React.memo(
  ({
    allowSelection,
    childrenSelected,
    height = 200,
    isChildTree,
    items = [],
    onChildToggle,
    width = 100,
    onChange,
    iconType = "chevron",
  }: TreeModel) => {
    const [_items, setItems] = useState(
      items.map((item) => ({
        id: nanoid(),
        ...item,
      }))
    );

    const rootRef = useRef();
    const [rootWidth, setRootWidth] = useState(0);

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
          // "--width": `${width}px`,
          "--height": `${height}px`,
          width: "100%",
        } as CSSProperties),
      []
    );

    const onRootRef = useCallback((node) => {
      if (node) {
        rootRef.current = node;
        setRootWidth(node.clientWidth);
      }
    }, []);

    return (
      <div
        className={classNames({ "rc-tree-wrapper": !isChildTree })}
        role="tree"
        style={treeStyle}
        ref={onRootRef}
      >
        {_items.map(({ id, name, expanded, child, disabled }) => (
          <TreeItem
            width={rootWidth}
            id={id}
            name={name}
            expanded={expanded}
            child={child}
            key={id}
            onToggle={toggleItem}
            onChildToggle={onChildToggle}
            allowSelection={allowSelection}
            selected={childrenSelected}
            onChange={onChange}
            disabled={disabled}
            iconType={iconType}
          />
        ))}
      </div>
    );
  }
);

Tree.displayName = "Tree";

export { Tree };
