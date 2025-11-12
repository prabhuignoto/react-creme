import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { useKeyNavigation } from '../common/effects/useKeyNavigation';
import { ListItem } from './list-item';
import { ListItemsProps, ListOption } from './list-model';
import styles from './list.module.scss';

const ListItems = React.forwardRef<Partial<HTMLUListElement>, ListItemsProps>(
  (
    {
      RTL,
      allowMultiSelection,
      focusable,
      handleSelection,
      highlightSelection,
      id,
      itemHeight = 0,
      label,
      options,
      rowGap = 0,
      showCheckIcon,
      textColor,
      textColorSelected,
      virtualized,
      visibleRange,
      selectedIndex = -1,
      resetState,
      size,
    }: ListItemsProps,
    ref
  ) => {
    const listStyle = useMemo(() => {
      const style = {
        '--rc-list-height': `${
          options.filter(v => v.visible).length * (itemHeight + rowGap) + rowGap
        }px`,
      } as CSSProperties;

      return style;
    }, [options, itemHeight, rowGap, resetState]);

    const listRef = useRef<HTMLUListElement | null>(null);

    const { selection, setSelection } = useKeyNavigation(
      listRef as React.RefObject<HTMLElement>,
      selectedIndex,
      options.length,
      {
        onPageDown: () => {
          if (listRef.current) {
            listRef.current.scrollTop += (itemHeight + rowGap) * 10;
          }
        },
        // PageUp/PageDown support for large lists
        onPageUp: () => {
          if (listRef.current) {
            listRef.current.scrollTop -= (itemHeight + rowGap) * 10;
          }
        },
        orientation: 'vertical',
        scrollOffset: itemHeight + rowGap,
      },
      focusable
    );

    const onSelection = useCallback((opt: ListOption, index: number) => {
      setSelection(index);
      handleSelection(opt);
    }, [setSelection, handleSelection]);

    useEffect(() => {
      if (selectedIndex > -1) {
        setSelection(selectedIndex);
      }
    }, [selectedIndex]);

    useEffect(() => {
      if (resetState) {
        setSelection(-1);
      }
    }, [resetState]);

    useImperativeHandle(ref, () => {
      return {
        blur: () => {
          setSelection(-1);
        },
        focus: () => {
          if (listRef.current) {
            setSelection(0);
          }
        },
      };
    });

    return (
      <ul
        className={styles.list_options}
        role="listbox"
        aria-label={label || 'List of options'}
        style={listStyle}
        id={id}
        ref={listRef}
      >
        {options
          .filter(item => item.visible)
          .map(
            ({ disabled, id, name, value = '', selected, top = 0 }, index) => {
              const canShow =
                !virtualized ||
                (index >= visibleRange[0] && index <= visibleRange[1]);
              return canShow ? (
                <ListItem
                  allowMultiSelection={allowMultiSelection}
                  disabled={disabled}
                  focusable={focusable}
                  id={id}
                  key={id}
                  name={name}
                  onSelection={opt => onSelection(opt, index)}
                  selected={selected}
                  showCheckIcon={showCheckIcon}
                  highlightSelection={highlightSelection}
                  textColor={textColor}
                  textColorSelected={textColorSelected}
                  value={value}
                  RTL={RTL}
                  focus={selection === index}
                  size={size}
                  style={{
                    height: `${itemHeight}px`,
                    top: `${top}px`,
                  }}
                />
              ) : null;
            }
          )}
      </ul>
    );
  }
);

ListItems.displayName = 'ListItems';

export { ListItems };
