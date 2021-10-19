import cls from "classnames";
import React, {
  CSSProperties,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronRightIcon } from "../../icons";
import "./tree-item.scss";
import { TreeItemModel } from "./tree-model";

const LazyTree = React.lazy(() =>
  import("./tree").then(({ Tree }) => ({ default: Tree }))
);

const TreeItem: React.FunctionComponent<TreeItemModel> = React.memo(
  ({ child, expanded, id, name, onToggle, onChildToggle }: TreeItemModel) => {
    const isFirstRender = useRef(true);
    const [totalItems, setTotalItems] = useState(
      Array.isArray(child) ? child.length + 1 : 0
    );

    const itemClass = useMemo(
      () =>
        cls("rc-tree-item", {
          "rc-tree-item-exp": expanded,
          "rc-tree-item-collapsed": !expanded,
        }),
      [expanded]
    );

    const iconClass = useMemo(
      () =>
        cls("rc-tree-item-icon", {
          "rc-tree-item-icon-exp": expanded,
          "rc-tree-item-icon-hide": !child,
        }),
      [expanded]
    );

    const canRenderChild = useMemo(
      () => child && child.length && expanded,
      [child, expanded]
    );

    const childContainerClass = useMemo(
      () =>
        cls("rc-tree-item-child-container", {
          "rc-tree-item-child-expanded": canRenderChild,
          "rc-tree-item-child-collapsed": !canRenderChild,
        }),
      [canRenderChild]
    );

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      }
    }, []);

    const itemStyle = useMemo(
      () =>
        ({
          "--max-height": `${totalItems * 30}px`,
        } as CSSProperties),
      [totalItems]
    );

    useEffect(() => {
      if (isFirstRender.current || typeof expanded === "undefined") {
        return;
      }

      if (onChildToggle && Array.isArray(child)) {
        onChildToggle(expanded, child.length);
      }
    }, [expanded]);

    const handler = useCallback(
      (expanded: boolean, count: number) => {
        if (typeof count === "undefined") {
          return;
        }

        if (expanded) {
          setTotalItems(totalItems + count);
        } else {
          setTotalItems(totalItems - count);
        }
      },
      [totalItems]
    );

    useEffect(() => {
      if (typeof expanded === "undefined") {
        return;
      }
      onChildToggle && onChildToggle(expanded, totalItems);
    }, [totalItems, expanded]);

    return (
      <div className={itemClass} style={itemStyle} role="treeitem">
        <span className={iconClass} onClick={() => onToggle && onToggle(id)}>
          <ChevronRightIcon />
        </span>
        <div className="rc-tree-item-wrapper">
          <span className="rc-tree-item-name">{name}</span>
          <div className={childContainerClass}>
            <Suspense fallback={<span></span>}>
              <LazyTree
                items={child || []}
                isChildTree
                onChildToggle={handler}
              />
            </Suspense>
          </div>
        </div>
      </div>
    );
  },
  (prev, cur) => prev.expanded === cur.expanded
);

TreeItem.displayName = "TreeItem";

export { TreeItem };
