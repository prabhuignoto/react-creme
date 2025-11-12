import cls from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { isDark } from '../common/utils';
import { ListItemContent } from './list-item-content';
import styles from './list-item.module.scss';
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
    size,
  }: ListItemProps) => {
    const handleSelection = useCallback(() => {
      if (onSelection) {
        onSelection({
          id,
          name,
          selected: !selected,
          value,
        });
      }
    }, [onSelection, id, name, selected, value]);

    const ref = useRef<HTMLLIElement>(null);
    const isDarkMode = isDark();

    const listItemClass = useMemo(
      () =>
        cls([
          styles.list_option,
          {
            [styles.disabled]: disabled,
            [styles.focus]: focusable && focus,
            [styles.highlight_selection]: highlightSelection,
            [styles.dark]: isDarkMode,
          },
        ]),
      [disabled, focus, focusable, highlightSelection, isDarkMode]
    );

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        handleSelection();
      },
      [handleSelection]
    );

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
    }, [disabled, handleMouseDown, handleSelection]);

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
        <div
          className={styles.list_item_wrapper}
          style={{ height: '100%', width: '100%' }}
        >
          <ListItemContent
            key={id}
            name={name}
            selected={selected}
            showCheck={showCheckIcon}
            focusable={focusable}
            textColor={textColor}
            RTL={RTL}
            highlightSelection={highlightSelection}
            size={size}
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
      prevProps.focus === nextProps.focus &&
      prevProps.name === nextProps.name &&
      prevProps.textColor === nextProps.textColor &&
      prevProps.textColorSelected === nextProps.textColorSelected &&
      prevProps.highlightSelection === nextProps.highlightSelection &&
      prevProps.showCheckIcon === nextProps.showCheckIcon &&
      prevProps.size === nextProps.size &&
      prevProps.RTL === nextProps.RTL
    );
  }
);

ListItem.displayName = 'ListItem';

export { ListItem };
