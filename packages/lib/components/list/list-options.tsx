import React, { CSSProperties, useMemo } from 'react';
import { ListItem } from './list-item';
import { ListOptionsProps } from './list-model';
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
  selectedIndex,
}: ListOptionsProps) => {
  const listStyle = useMemo(() => {
    const style = {
      '--list-height': `${
        options.filter(v => v.visible).length * (itemHeight + rowGap) + rowGap
      }px`,
    } as CSSProperties;

    return style;
  }, [options.length, renderHash]);

  return (
    <ul
      className={'rc-list-options'}
      role="listbox"
      aria-label={`rc-list-label-${label}`}
      style={listStyle}
      id={id}
    >
      {options.map(
        ({ disabled, id, name, value = '', selected, top = 0 }, index) => {
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
              onSelection={handleSelection}
              selected={selected}
              showCheckIcon={showCheckIcon}
              highlightSelection={highlightSelection}
              textColor={textColor}
              textColorSelected={textColorSelected}
              value={value}
              RTL={RTL}
              focus={selectedIndex === index}
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
};

ListOptions.displayName = 'ListOptions';

export { ListOptions };
