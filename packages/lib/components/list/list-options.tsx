import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useKeyNavigation } from '../common/effects/useKeyNavigation';
import { ListItem } from './list-item';
import { ListOption, ListOptionsProps } from './list-model';
import './list.scss';

const ListOptions: React.FunctionComponent<ListOptionsProps> = ({
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
  renderHash,
  selectedIndex = -1,
}: ListOptionsProps) => {
  const listStyle = useMemo(() => {
    const style = {
      '--list-height': `${
        options.filter(v => v.visible).length * (itemHeight + rowGap) + rowGap
      }px`,
    } as CSSProperties;

    return style;
  }, [options.length, renderHash]);

  const listRef = useRef<HTMLUListElement | null>(null);

  const { selection, setSelection } = useKeyNavigation(
    listRef,
    selectedIndex,
    options.length
  );

  const onSelection = useCallback((opt: ListOption, index) => {
    setSelection(index);
    handleSelection(opt);
  }, []);

  useEffect(() => {
    if (selectedIndex > -1) {
      setSelection(selectedIndex);
    }
  }, [selectedIndex]);

  return (
    <ul
      className={'rc-list-options'}
      role="listbox"
      aria-label={`rc-list-label-${label}`}
      style={listStyle}
      id={id}
      ref={listRef}
    >
      {options
        .filter(item => item.visible)
        .map(({ disabled, id, name, value = '', selected, top = 0 }, index) => {
          const canShow =
            !virtualized ||
            (top + itemHeight >= visibleRange[0] && top <= visibleRange[1]);
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
              style={{
                height: `${itemHeight}px`,
                top: `${top}px`,
              }}
            />
          ) : null;
        })}
    </ul>
  );
};

ListOptions.displayName = 'ListOptions';

export { ListOptions };
