import { SearchIcon } from '@icons';
import cls from 'classnames';
import React from 'react';
import {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFirstRender } from '../common/effects/useFirstRender';
import { useVirtualization } from '../common/effects/useVirtualization';
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
      disableBgColor = false,
    }: ListProps,
    ref
  ) => {
    const listRef = useRef<HTMLDivElement | null>(null);
    const [resetState, setResetState] = useState(0);

    // Separate selection state from options data
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // Store latest onSelection callback in a ref to prevent infinite loops
    // from unstable callback references passed by parent components
    const onSelectionRef = useRef(onSelection);
    useLayoutEffect(() => {
      onSelectionRef.current = onSelection;
    });

    // Track previous selection to prevent calling callback when selection hasn't changed
    const prevSelectedIdsRef = useRef<Set<string>>(new Set());

    // Derive options from props and merge with selection state
    const _listOptions = useMemo(() => {
      const parsed = ParseOptions(options, rowGap, itemHeight, noUniqueIds);
      return parsed.map(opt => ({
        ...opt,
        selected: selectedIds.has(opt.id),
      }));
    }, [options, rowGap, itemHeight, noUniqueIds, selectedIds]);

    const isDarkMode = isDark();

    const rcListClass = useMemo(
      () =>
        cls(styles.list, {
          [styles.list_border]: border,
          [styles.list_search]: enableSearch,
          [styles.dark]: isDarkMode,
          [styles.disable_bg_color]: disableBgColor,
        }),
      [border, enableSearch, isDarkMode, disableBgColor]
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
    }, [searchTerm, _listOptions, itemHeight, rowGap]);

    const handleSelection = useCallback((opt: ListOption) => {
      setSelectedIds(prev => {
        const newSet = new Set(prev);
        if (allowMultiSelection) {
          if (newSet.has(opt.id)) {
            newSet.delete(opt.id);
          } else {
            newSet.add(opt.id);
          }
        } else {
          newSet.clear();
          newSet.add(opt.id);
        }
        return newSet;
      });
    }, [allowMultiSelection]);

    // Derive selected items from selectedIds
    const selected = useMemo(
      () => _listOptions.filter(opt => selectedIds.has(opt.id)),
      [_listOptions, selectedIds]
    );

    // Sync selection from props on mount only
    // NOTE: Only runs once on mount to prevent infinite loops caused by ParseOptions
    // generating new IDs (nanoid) on every render
    useEffect(() => {
      const initialSelected = options
        .filter(opt => opt.selected)
        .map(opt => opt.id)
        .filter((id): id is string => id !== undefined);

      if (initialSelected.length > 0) {
        setSelectedIds(new Set(initialSelected));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Notify parent of selection changes
    useEffect(() => {
      // Check if selection actually changed by comparing Set contents
      const currentIds = selectedIds;
      const prevIds = prevSelectedIdsRef.current;

      const hasChanged =
        currentIds.size !== prevIds.size ||
        Array.from(currentIds).some(id => !prevIds.has(id));

      if (hasChanged && selected.length > 0 && onSelectionRef.current) {
        onSelectionRef.current(
          selected.map(({ name, value, id }) => ({
            id: id ?? '',
            name,
            value: value ?? '',
          }))
        );
        prevSelectedIdsRef.current = new Set(currentIds);
      }
    }, [selected, selectedIds]);

    const isFirstRender = useFirstRender();

    // Use the new virtualization hook
    const virtualization = useVirtualization({
      itemCount: visibleOptions.length,
      itemHeight,
      containerRef: listRef as React.RefObject<HTMLElement>,
      enabled: virtualized,
      itemGap: rowGap,
      overscan: 3,
      scrollDebounce: 50,
    });

    // visibleRange from useVirtualization is already in index format [startIndex, endIndex]
    const visibleIndexRange = useMemo(() => {
      if (!virtualized) {
        return [0, visibleOptions.length];
      }
      // Use the indices directly - no conversion needed
      return virtualization.visibleRange;
    }, [virtualized, virtualization.visibleRange, visibleOptions.length]);

    const onListRef = useCallback((el: HTMLDivElement | null) => {
      listRef.current = el;
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
              aria-label="Search list items"
              onFocus={() => {
                setResetState(new Date().getTime());
              }}
            >
              <SearchIcon />
            </Input>
          </div>
        )}
        <div className={styles.wrapper} ref={onListRef}>
          <ListItems
            RTL={RTL}
            allowMultiSelection={allowMultiSelection}
            focusable={focusable}
            handleSelection={handleSelection}
            highlightSelection={highlightSelection}
            id={id ?? ''}
            rowGap={rowGap}
            showCheckIcon={showCheckIcon}
            textColor={textColor}
            textColorSelected={textColorSelected}
            visibleRange={visibleIndexRange}
            options={visibleOptions}
            itemHeight={itemHeight}
            label={label ?? ''}
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
