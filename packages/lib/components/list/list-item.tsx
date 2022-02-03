import cls from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { ListItemContent } from './list-item-content';
import './list-item.scss';
import { ListItemProps } from './list-model';

const ListItem: React.FunctionComponent<ListItemProps> = React.memo(
  ({
    disabled,
    id,
    name,
    value,
    selected,
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
      onSelection &&
        onSelection({
          id,
          name,
          selected: !selected,
          value,
        });
    }, []);

    const ref = useRef<HTMLLIElement>(null);

    const listItemClass = useMemo(
      () =>
        cls([
          'rc-list-option',
          {
            'rc-list-option-disabled': disabled,
            'rc-list-option-focus': focusable && focus,
          },
        ]),
      [selected, disabled, focus]
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
        onKeyUp: (ev: React.KeyboardEvent) => {
          if (ev.key === 'Enter') {
            handleSelection();
          }
        },
        tabIndex: 0,
      };
    }, []);

    const ariaProps = useMemo(
      () => ({
        'aria-checked': selected,
        'aria-disabled': disabled,
      }),
      [selected, disabled]
    );

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
        {...ariaProps}
      >
        <div className="rc-list-item-wrapper" style={{ width: '100%' }}>
          <ListItemContent
            key={id}
            name={name}
            selected={selected}
            showCheck={showCheckIcon}
            focusable={focusable}
            textColor={textColor}
            RTL={RTL}
            highlightSelection={highlightSelection}
          />
        </div>
      </li>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.disabled === nextProps.disabled &&
      prevProps.selected === nextProps.selected &&
      prevProps.style?.top === nextProps.style?.top &&
      prevProps.focus === nextProps.focus
    );
  }
);

ListItem.displayName = 'ListItem';

export { ListItem };
