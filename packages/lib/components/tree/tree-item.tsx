import cls from 'classnames';
import React, {
  CSSProperties,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChevronRightIcon, MinusIcon, PlusIcon } from '../../icons';
import { CheckBox } from '../checkbox/checkbox';
import './tree-item.scss';
import { TreeItemProps } from './tree-model';

const LazyTree = React.lazy(() =>
  import('./tree').then(({ Tree }) => ({
    default: Tree,
  }))
);

const TreeItem: React.FunctionComponent<TreeItemProps> = React.memo(
  ({
    child,
    expanded,
    id,
    name,
    onToggle,
    onChildToggle,
    allowSelection,
    selected,
    width,
    onChange,
    disabled,
    iconType,
  }: TreeItemProps) => {
    const isFirstRender = useRef(true);
    const [totalItems, setTotalItems] = useState(
      Array.isArray(child) ? child.length + 1 : 0
    );

    const [checked, setChecked] = useState(selected);

    const [controlledExpanded, setControlledExpanded] = useState(expanded);

    const itemClass = useMemo(
      () =>
        cls('rc-tree-item', {
          'rc-tree-item-collapsed': !expanded,
          'rc-tree-item-disabled': disabled,
          'rc-tree-item-exp': expanded,
        }),
      [expanded, disabled]
    );

    const iconClass = useMemo(
      () =>
        cls('rc-tree-item-icon', {
          'rc-tree-item-icon-exp': expanded,
          'rc-tree-item-icon-hide': !child,
          [`rc-tree-item-icon-${iconType}`]: true,
        }),
      [expanded]
    );

    const canRenderChild = useMemo(
      () => child && child.length && expanded,
      [child, expanded]
    );

    const childContainerClass = useMemo(
      () =>
        cls('rc-tree-item-child-container', {
          'rc-tree-item-child-collapsed': !canRenderChild,
          'rc-tree-item-child-expanded': canRenderChild,
        }),
      [canRenderChild]
    );

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      }
    }, []);

    useEffect(() => {
      if (typeof selected !== 'undefined' && !disabled) {
        setChecked(selected);
      }
    }, [selected, disabled]);

    const itemStyle = useMemo(
      () =>
        ({
          '--max-height': `${totalItems * 30}px`,
          '--max-width': `${width}px`,
        } as CSSProperties),
      [totalItems, width]
    );

    useEffect(() => {
      if (isFirstRender.current || typeof expanded === 'undefined') {
        return;
      }

      if (onChildToggle && Array.isArray(child)) {
        onChildToggle(expanded, child.length);
      }
    }, [expanded]);

    const handler = useCallback(
      (expanded: boolean, count: number) => {
        if (typeof count === 'undefined') {
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

    const handleSelection = (_id?: string, val?: boolean) => {
      setChecked(val);
    };

    useEffect(() => {
      if (typeof expanded === 'undefined') {
        return;
      }
      onChildToggle && onChildToggle(expanded, totalItems);

      if (expanded) {
        setControlledExpanded(expanded);
      } else {
        setTimeout(() => {
          setControlledExpanded(expanded);
        }, 500);
      }
    }, [totalItems, expanded]);

    const handleToggle = useCallback((_ev: React.MouseEvent, id: string) => {
      onToggle?.(id);
    }, []);

    const onSelect = useCallback(() => {
      onChange?.(name);
    }, []);

    const handleOnChange = useCallback(_name => {
      onChange?.(`${name} > ${_name}`);
    }, []);

    return (
      <div className={itemClass} style={itemStyle} role="treeitem">
        <span
          className={iconClass}
          onClick={ev => id && handleToggle(ev, id)}
          role="img"
          tabIndex={0}
        >
          {iconType === 'chevron' && <ChevronRightIcon />}
          {iconType === 'plus' && !expanded && <PlusIcon />}
          {iconType === 'plus' && expanded && <MinusIcon />}
        </span>
        <div className="rc-tree-item-wrapper">
          {allowSelection ? (
            <span className="rc-tree-item-checkbox-wrapper">
              <CheckBox
                label={name || ''}
                onChange={handleSelection}
                isChecked={selected && !disabled}
                border={false}
                autoHeight
                noHoverStyle
                focusIcon
              />
            </span>
          ) : (
            <span className="rc-tree-item-name" onClick={onSelect} tabIndex={0}>
              {name}
            </span>
          )}
          <div className={childContainerClass}>
            {controlledExpanded && (
              <Suspense fallback={<span></span>}>
                <LazyTree
                  items={child || []}
                  isChildTree
                  onChildToggle={handler}
                  allowSelection={allowSelection}
                  childrenSelected={checked}
                  onChange={handleOnChange}
                  iconType={iconType}
                />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    );
  },
  (prev, cur) =>
    prev.expanded === cur.expanded &&
    prev.selected === cur.selected &&
    prev.width === cur.width
);

TreeItem.displayName = 'TreeItem';

export { TreeItem };
