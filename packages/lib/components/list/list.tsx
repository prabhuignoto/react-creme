import cls from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { SearchIcon } from '../../icons';
import { useFirstRender } from '../common/effects/useFirstRender';
import { isUndefined } from '../common/utils';
import { Input } from '../input/input';
import { ListOption, ListProps } from './list-model';
import { ListOptions } from './list-options';
import './list.scss';

const initOptions = (
  options: ListOption[],
  rowGap: number,
  itemHeight: number,
  noUniqueIds: boolean
): ListOption[] => {
  return options
    .sort((a, b) => (b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 1))
    .filter(opt => (!isUndefined(opt.visible) ? opt.visible : true))
    .map((option, index) => ({
      id: !noUniqueIds ? nanoid() : option.id,
      ...option,
      selected: !isUndefined(option.selected) ? option.selected : false,
      top: index > 0 ? index * (itemHeight + rowGap) + rowGap : rowGap,
      value: option.value || option.name,
      visible: true,
    }));
};

const List: React.FunctionComponent<ListProps> = ({
  RTL = false,
  allowMultiSelection = false,
  backGroundColor = '#fff',
  border = true,
  enableSearch = false,
  focusable = true,
  highlightSelection = false,
  id,
  itemHeight = 40,
  label,
  maxHeight = 600,
  minHeight = 100,
  noUniqueIds = false,
  onSelection,
  options = [],
  rowGap = 5,
  showCheckIcon = true,
  textColor = '#000',
  textColorSelected = '#fff',
  virtualized = false,
}: ListProps) => {
  const [_listOptions, setListOptions] = useState<ListOption[]>(
    initOptions(options, rowGap, itemHeight, noUniqueIds)
  );

  const listRef = useRef<HTMLUListElement | null>(null);
  const [selected, setSelected] = useState<ListOption[]>();
  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 0]);

  const rcListClass = useMemo(
    () =>
      cls('rc-list', {
        'rc-list-border': border,
        'rc-list-search': enableSearch,
      }),
    []
  );

  const handleSearch = useCallback((val: string) => {
    const _val = val.trim().toLowerCase();

    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }

    setListOptions(prev => {
      let updated = [];

      if (_val.length) {
        updated = prev
          .map(opt => ({
            ...opt,
            visible: opt.name.toLowerCase().includes(_val),
          }))
          .sort((a, b) => (a.visible === b.visible ? 0 : a.visible ? -1 : 1));
      } else {
        updated = prev
          .map(opt => ({
            ...opt,
            visible: true,
          }))
          .sort((a, b) =>
            b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 1
          );
      }

      return updated.map((option, index) => ({
        ...option,
        top: index > 0 ? index * (itemHeight + rowGap) + rowGap : rowGap,
      }));
    });
  }, []);

  const handleSelection = (opt: ListOption) => {
    if (allowMultiSelection) {
      setListOptions(prev => {
        const updated = prev.map(option => ({
          ...option,
          selected: option.id === opt.id ? !option.selected : option.selected,
        }));
        setSelected(updated.filter(opt => opt.selected));
        return updated;
      });
    } else {
      setListOptions(prev => {
        const updated = prev.map(option => ({
          ...option,
          selected: option.id === opt.id,
        }));
        setSelected(updated.filter(opt => opt.selected));
        return updated;
      });
    }
  };

  useEffect(() => {
    if (selected && onSelection) {
      onSelection(
        selected.map(({ name, value, id }) => ({
          id,
          name,
          value,
        }))
      );
    }
  }, [selected]);

  useEffect(() => {
    if (!isFirstRender.current) {
      setListOptions(initOptions(options, rowGap, itemHeight, noUniqueIds));
    }
  }, [JSON.stringify(options.map(({ name, value }) => `${name}-${value}`))]);

  const isFirstRender = useFirstRender();

  const setRange = useCallback(() => {
    if (listRef.current) {
      const list = listRef.current;
      const scrollTop = Math.round(list.scrollTop);
      const height = Math.round(list.clientHeight);

      setVisibleRange([scrollTop, scrollTop + height]);
    }
  }, []);

  const handleScroll = useDebouncedCallback(setRange);

  const onListRef = useCallback(el => {
    if (el) {
      listRef.current = el;

      if (virtualized) {
        setRange();
      }
    }
  }, []);

  return (
    <div
      className={rcListClass}
      style={
        {
          '--list-bg-color': backGroundColor,
          '--max-height': `${maxHeight}px`,
          '--min-height': `${minHeight}px`,
        } as CSSProperties
      }
    >
      {enableSearch && (
        <div className="rc-list-search-input">
          <Input
            onChange={handleSearch}
            enableClear
            controlled
            RTL={RTL}
            focusable={focusable}
          >
            <SearchIcon />
          </Input>
        </div>
      )}
      <div
        className="rc-list-options-wrapper"
        ref={onListRef}
        onScroll={handleScroll}
      >
        <ListOptions
          RTL={RTL}
          allowMultiSelection={allowMultiSelection}
          focusable={focusable}
          handleSelection={handleSelection}
          highlightSelection={highlightSelection}
          id={id}
          rowGap={rowGap}
          showCheckIcon={showCheckIcon}
          textColor={textColor}
          textColorSelected={textColorSelected}
          visibleRange={visibleRange}
          options={_listOptions}
          itemHeight={itemHeight}
          label={label}
          // renderHash={renderTrigger}
          virtualized={virtualized}
        />
      </div>
    </div>
  );
};

List.displayName = 'List';

export { List };
