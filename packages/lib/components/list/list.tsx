import { SearchIcon } from '@icons';
import cls from 'classnames';
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
import { useFirstRender } from '../common/effects/useFirstRender';
import { isDark } from '../common/utils';
import { Input } from '../input/input';
import { ListItems } from './list-items';
import { ListOption, ListProps, ParseOptions } from './list-model';
import styles from './list.module.scss';

const List = React.forwardRef<Partial<HTMLUListElement>, ListProps>(
  (
    {
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
      selectedIndex = -1,
      size = 'sm',
    }: ListProps,
    ref
  ) => {
    const [_listOptions, setListOptions] = useState<ListOption[]>(
      ParseOptions(options, rowGap, itemHeight, noUniqueIds)
    );

    const listRef = useRef<HTMLDivElement | null>(null);
    const [selected, setSelected] = useState<ListOption[]>();
    const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 0]);
    const [resetState, setResetState] = useState(0);

    const isDarkMode = useMemo(() => isDark(), []);

    const rcListClass = useMemo(
      () =>
        cls(styles.list, {
          [styles.list_border]: border,
          [styles.list_search]: enableSearch,
          [styles.dark]: isDarkMode,
        }),
      []
    );

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = useCallback((val: string) => {
      const _val = val.trim().toLowerCase();
      setSearchTerm(_val);
      if (listRef.current) {
        listRef.current.scrollTop = 0;
      }
    }, []);

    const visibleOptions = useMemo(() => {
      if (searchTerm) {
        return _listOptions
          .map(opt => ({
            ...opt,
            visible: opt.name.toLowerCase().includes(searchTerm),
          }))
          .sort((a, b) => (a.visible === b.visible ? 0 : a.visible ? -1 : 1))
          .map((opt, index) => ({
            ...opt,
            top: index > 0 ? index * (itemHeight + rowGap) + rowGap : rowGap,
          }));
      } else {
        return _listOptions;
      }
    }, [
      searchTerm,
      _listOptions.length,
      JSON.stringify(_listOptions.map((id, selected) => ({ id, selected }))),
    ]);

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
        setListOptions(ParseOptions(options, rowGap, itemHeight, noUniqueIds));
      }
    }, [
      JSON.stringify(options.map(op => ({ id: op.id, selected: op.selected }))),
    ]);

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

    const onListRef = useCallback((el: HTMLDivElement | null) => {
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
            '--rc-list-bg-color': backGroundColor,
            '--rc-list-max-height': `${maxHeight}px`,
            '--rc-list-min-height': `${minHeight}px`,
          } as CSSProperties
        }
      >
        {enableSearch && (
          <div className={styles.list_search_input}>
            <Input
              onChange={handleSearch}
              enableClear
              controlled
              RTL={RTL}
              size={size}
              focusable={focusable}
              placeholder="Search ..."
              onFocus={() => {
                setResetState(new Date().getTime());
              }}
            >
              <SearchIcon />
            </Input>
          </div>
        )}
        <div className={styles.wrapper} ref={onListRef} onScroll={handleScroll}>
          <ListItems
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
            options={visibleOptions}
            itemHeight={itemHeight}
            label={label}
            selectedIndex={selectedIndex}
            virtualized={virtualized}
            resetState={resetState}
            ref={ref}
            size={size}
          />
        </div>
      </div>
    );
  }
);

List.displayName = 'List';

export { List };
