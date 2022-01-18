import cls from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { ListItemOption } from './list-item-option';
import './list-item.scss';
import { ListItemProps } from './list-model';

const ListItem: React.FunctionComponent<ListItemProps> = React.memo(
  ({
    disabled,
    id,
    name,
    value,
    selected,
    allowMultiSelection,
    onSelection,
    style,
    showCheckIcon,
    focusable,
    highlightSelection = false,
    textColor,
    RTL,
    focus,
  }: ListItemProps) => {
    const handleSelection = useCallback(() => {
      onSelection && onSelection({ id, name, selected: !selected, value });
    }, []);

    const ref = useRef<HTMLLIElement>(null);

    // useFocusNew(ref, handleSelection);

    const listItemClass = useMemo(
      () =>
        cls([
          'rc-list-option',
          {
            'rc-list-option-disabled': disabled,
            'rc-list-option-focus': focusable,
            'rc-list-option-highlight-selection': highlightSelection,
            'rc-list-option-multi-selection': allowMultiSelection,
            'rc-list-option-selected': selected,
          },
        ]),
      [selected, disabled, focusable]
    );

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      handleSelection();
    }, []);

    const clickableProps = useMemo(() => {
      if (disabled) {
        return {};
      }

      return {
        onClick: handleMouseDown,
        tabIndex: 0,
      };
    }, []);

    useEffect(() => {
      if (focus) {
        ref.current?.focus();
      }
    }, [focus]);

    return (
      <li
        className={listItemClass}
        key={id}
        role="option"
        style={style}
        ref={ref}
        {...clickableProps}
      >
        <div className="rc-list-item-wrapper" style={{ width: '100%' }}>
          <ListItemOption
            key={id}
            name={name}
            selected={selected}
            showCheck={showCheckIcon}
            tabIndex={!disabled ? 0 : -1}
            focusable={focusable}
            textColor={textColor}
            RTL={RTL}
          />
        </div>
      </li>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.disabled === nextProps.disabled &&
      prevProps.selected === nextProps.selected &&
      prevProps.style?.top === nextProps.style?.top
    );
  }
);

ListItem.displayName = 'ListItem';

export { ListItem };
