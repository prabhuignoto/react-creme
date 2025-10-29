import { SearchIcon } from '@icons';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useTransition,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useFirstRender } from '../common/effects/useFirstRender';
import { isValidString } from '../common/utils';
import { Option } from '../dropdown/dropdown-model';
import { Input, RCInputElementProps } from '../input/input';
import { SuggestionsMenuOverlay } from './auto-suggest-menu';
import { AutoSuggestProps, AutoSuggestGroup } from './auto-suggest.model';
import { useAutoSuggestState } from './useAutoSuggestState';
import {
  flattenGroupedSuggestions,
  filterGroupedSuggestions,
} from './groupedSuggestionsUtils';
import styles from './auto-suggest.module.scss';

/**
 * Escapes special characters in a string for use in RegExp patterns
 * Prevents RegExp injection attacks
 */
const escapeRegExpChars = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const AutoSuggest = React.forwardRef<RCInputElementProps, AutoSuggestProps>(
  (
    {
      onChange,
      onKeyDown,
      onKeyUp,
      onSelection,
      onSelectionChange,
      placeholder = '',
      suggestions,
      suggestionsWidth = 250,
      value,
      focusable = true,
      debounce = 100,
      showSpinner = false,
      accent = 'flat',
      apiBacked = false,
      icon,
      rtl,
      size = 'sm',
      disableIcon = false,
      multiple = false,
      maxSelections,
      grouped = false,
      groups = [],
      virtualized: virtualizeProp = false,
      virtualizationThreshold = 50,
      itemHeight = 35,
      overscan = 3,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
    }: AutoSuggestProps,
    ref
  ) => {
    const [suggestionItems, setSuggestionItems] = React.useState<Option[]>(
      () =>
        suggestions.length
          ? suggestions.map(({ name, value }) => ({
              id: nanoid(),
              name,
              value,
            }))
          : []
    );

    const id = useRef(`rc-autocomplete-${nanoid()}`);
    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<RCInputElementProps | null>(null);

    // Use the custom reducer hook for centralized state management
    const {
      state,
      setInput,
      setFocusMenu,
      setActiveDescendantId,
      selectItem,
      addSelectedItem,
      closeMenuClearSelection,
    } = useAutoSuggestState();

    // Destructure state for cleaner access
    const { input, selected, focusMenu, activeDescendantId } = state;

    // React 19: useTransition for non-blocking filtering updates
    // Keeps UI responsive during expensive filtering operations
    const [, startTransition] = useTransition();

    const onChangeDebounced = useDebouncedCallback(() => {
      if (onChange) {
        onChange(inputRef.current?.getValue());
      }
    }, debounce);

    // Handle grouped suggestions filtering with React 19 useTransition
    const [filteredGroups, setFilteredGroups] = React.useState<AutoSuggestGroup[]>(groups);

    useEffect(() => {
      startTransition(() => {
        if (!grouped || !groups.length || !input || apiBacked) {
          setFilteredGroups(groups);
        } else {
          setFilteredGroups(filterGroupedSuggestions(groups, input.trim()));
        }
      });
    }, [grouped, groups, input, apiBacked, startTransition]);

    // Flatten grouped suggestions if needed
    const flattenedFromGroups = useMemo<Option[]>(() => {
      if (!grouped || apiBacked) return [];
      return flattenGroupedSuggestions(filteredGroups).map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
      }));
    }, [grouped, filteredGroups, apiBacked]);

    // Determine total item count for virtualization decision
    const totalItemCount = useMemo(() => {
      if (grouped) {
        return flattenedFromGroups.length;
      }
      return suggestionItems.length;
    }, [grouped, flattenedFromGroups, suggestionItems]);

    // Auto-enable virtualization based on item count threshold
    const shouldVirtualize = useMemo(() => {
      return (
        virtualizeProp ||
        (totalItemCount > virtualizationThreshold && totalItemCount > 0)
      );
    }, [virtualizeProp, totalItemCount, virtualizationThreshold]);

    const regexTester = useMemo(
      () =>
        input && !apiBacked && !grouped
          ? new RegExp(`^${escapeRegExpChars(input.trim())}`, 'i')
          : null,
      [input, apiBacked, grouped]
    );

    const matchFound = useMemo(() => {
      if (apiBacked && suggestionItems.length) {
        return true;
      } else if (grouped && filteredGroups.length) {
        return true;
      } else if (!selected && regexTester) {
        return suggestionItems.some(item => regexTester.test(item.name));
      }
      return false;
    }, [regexTester, selected, apiBacked, suggestionItems, grouped, filteredGroups]);

    // React 19: useTransition for non-blocking list filtering
    const [listItems, setListItems] = React.useState<Option[]>([]);

    useEffect(() => {
      startTransition(() => {
        if (regexTester && suggestionItems.length) {
          setListItems(
            suggestionItems.filter(item => regexTester.test(item.name))
          );
        } else {
          setListItems([]);
        }
      });
    }, [regexTester, suggestionItems, startTransition]);

    const autoSuggestClass = useMemo(
      () =>
        classNames(styles.auto_suggest, {
          [styles.rtl]: rtl,
        }),
      [rtl]
    );

    const handleChange = useCallback(
      (value: string) => {
        setInput(value);
      },
      [setInput]
    );

    const handleSelection = useCallback(
      (selectedOptions: Option[]) => {
        if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
          const selectedItem = selectedOptions[0];

          if (selectedItem && selectedItem.id) {
            const { id, name, value } = selectedItem;

            if (multiple) {
              // Multiple selection mode
              const canAdd =
                !maxSelections || state.selectedItems.length < maxSelections;
              if (canAdd && !state.selectedItems.some(item => item.id === id)) {
                addSelectedItem(id, name, value || '');
                // Call onSelectionChange callback for multiple selection
                const updated = [
                  ...state.selectedItems,
                  { id, name, value: value || '' },
                ];
                onSelectionChange?.(
                  updated.map(item => ({ name: item.name, value: item.value }))
                );
              }
            } else {
              // Single selection mode
              selectItem(id, name, value || '');
              onSelection?.({
                name,
                value: value || '',
              });
            }
          }

          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
      },
      [
        multiple,
        maxSelections,
        state.selectedItems,
        selectItem,
        addSelectedItem,
        onSelection,
        onSelectionChange,
      ]
    );

    const isFirstRender = useFirstRender();

    useEffect(() => {
      if (!isFirstRender.current) {
        if (input) {
          onChangeDebounced();
        } else if (apiBacked) {
          setSuggestionItems([]);
        }
      }
    }, [input, apiBacked, onChangeDebounced, isFirstRender]);

    useEffect(() => {
      if (!isFirstRender.current && isValidString(value)) {
        setInput(value);
      }
    }, [value, isFirstRender]);

    useEffect(() => {
      if (!isFirstRender.current && suggestions?.length) {
        setSuggestionItems(
          suggestions.map(({ name, value }) => ({
            id: nanoid(),
            name,
            value,
          }))
        );
      }
    }, [suggestions, isFirstRender]);

    const handleKeyUp = useCallback(
      (ev: React.KeyboardEvent) => {
        if (ev.key === 'ArrowDown') {
          setFocusMenu(true);
        } else if (ev.key === 'ArrowUp' && focusMenu) {
          // Return focus from menu to input
          setFocusMenu(false);
          inputRef.current?.focus();
        } else if (ev.key === 'Escape') {
          // Immediately close menu and clear selection for better accessibility
          closeMenuClearSelection();
        }
        onKeyUp?.(ev);
      },
      [focusMenu, setFocusMenu, closeMenuClearSelection, onKeyUp]
    );

    const handleOnClose = useCallback(() => {
      setFocusMenu(false);
      inputRef.current?.focus();
    }, []);

    const data = useMemo(() => {
      let items: Option[] = [];

      if (grouped && !apiBacked) {
        // Use flattened grouped suggestions
        items = flattenedFromGroups;
      } else if (apiBacked) {
        items = suggestionItems;
      } else {
        items = listItems;
      }

      return { focus: focusMenu, items };
    }, [focusMenu, listItems, suggestionItems, apiBacked, grouped, flattenedFromGroups]);

    const iconToRender = useMemo(() => {
      if (!disableIcon) {
        return icon || <SearchIcon />;
      }
      return null;
    }, [icon, disableIcon]);

    return (
      <div
        className={autoSuggestClass}
        data-testid="rc-auto-suggest"
        ref={rootRef}
      >
        <div className={styles.input_wrapper}>
          <Input
            enableClear
            onChange={handleChange}
            value={input}
            controlled
            placeholder={placeholder}
            noUniqueId
            id={id.current}
            isAutoComplete
            ariaExpanded={matchFound}
            aria-autocomplete="list"
            aria-activedescendant={focusMenu && activeDescendantId ? activeDescendantId : undefined}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            aria-controls={matchFound ? id.current : undefined}
            onKeyUp={handleKeyUp}
            onKeyDown={onKeyDown}
            focusable={focusable}
            showSpinner={showSpinner}
            accent={accent}
            size={size}
            ref={ref || inputRef}
          >
            {iconToRender}
          </Input>
        </div>
        {matchFound && (
          <SuggestionsMenuOverlay
            id={id.current}
            menuId={`${id.current}-menu`}
            onSelection={handleSelection}
            placementReference={rootRef as React.RefObject<HTMLElement>}
            align="left"
            placement="bottom"
            width={suggestionsWidth}
            data={data}
            onClose={handleOnClose}
            placementOffset={6}
            size={size}
            onActiveDescendantChange={setActiveDescendantId}
            virtualized={shouldVirtualize}
            itemHeight={itemHeight}
            overscan={overscan}
          />
        )}
      </div>
    );
  }
);

AutoSuggest.displayName = 'AutoSuggest';

export { AutoSuggest };
