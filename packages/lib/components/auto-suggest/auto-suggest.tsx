import classNames from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { SearchIcon } from '../../icons';
import { useFirstRender } from '../common/effects/useFirstRender';
import { isValidString } from '../common/utils';
import { Option } from '../dropdown/dropdown-model';
import { Input } from '../input/input';
import '../input/input.scss';
import { SuggestionsMenuOverlay } from './auto-suggest-menu';
import { AutoSuggestProps } from './auto-suggest.model';
import './auto-suggest.scss';

const AutoSuggest: React.FunctionComponent<AutoSuggestProps> = ({
  onChange,
  onKeyUp,
  onSelection,
  placeholder = '',
  suggestions,
  suggestionsWidth = 250,
  value,
  focusable = true,
  debounce = 50,
  showSpinner = false,
  accent = 'flat',
  apiBacked = false,
  icon,
  rtl,
}) => {
  const [suggestionItems, setSuggestionItems] = React.useState<Option[]>(
    suggestions.length
      ? suggestions.map(({ name, value }) => ({
          id: nanoid(),
          name,
          value,
        }))
      : []
  );
  const [isDirty, setIsDirty] = React.useState(false);

  const id = useRef(`rc-autocomplete-${nanoid()}`);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [input, setInput] = React.useState<string | undefined>('');
  const [selected, setSelected] = React.useState<boolean>(false);
  const [focusMenu, setFocusMenu] = React.useState<boolean>(false);

  const onChangeDebounced = useDebouncedCallback(
    useCallback(() => {
      input && onChange?.(input);
    }, [input]),
    debounce
  );

  const regexTester = useMemo(
    () => (input && !apiBacked ? new RegExp(`^${input.trim()}`, 'i') : null),
    [input, apiBacked]
  );

  const matchFound = useMemo(() => {
    if (apiBacked && suggestionItems.length) {
      return true;
    } else if (!selected && regexTester) {
      return suggestionItems.some(item => regexTester.test(item.name));
    }
  }, [regexTester, selected, isDirty, suggestionItems.length, apiBacked]);

  const listItems = useMemo<Option[]>(
    () =>
      regexTester
        ? suggestionItems.filter(item => regexTester.test(item.name))
        : [],
    [matchFound, regexTester, isDirty]
  );

  const autoSuggestClass = useMemo(
    () =>
      classNames('rc-auto-suggest', {
        'rc-auto-suggest-rtl': rtl,
      }),
    []
  );

  const handleChange = useCallback((value: string) => {
    setInput(value);
    setSelected(false);
    setIsDirty(true);
  }, []);

  const handleSelection = useCallback((selected: Option[]) => {
    if (Array.isArray(selected) && selected.length > 0) {
      const selectedItem = selected[0];
      setFocusMenu(false);
      setIsDirty(true);

      if (selectedItem) {
        const { name, value } = selectedItem;
        setInput(name);
        setSelected(true);
        onSelection?.({
          name,
          value: value || '',
        });
      }
      inputRef.current?.focus();
    }
  }, []);

  const isFirstRender = useFirstRender();

  useEffect(() => {
    if (!isFirstRender.current) {
      if (input) {
        onChangeDebounced();
      } else if (apiBacked) {
        setSuggestionItems([]);
      }
    }
  }, [input]);

  useEffect(() => {
    if (!isFirstRender.current && isValidString(value)) {
      setInput(value);
    }
  }, [value]);

  useEffect(() => {
    if (!isFirstRender.current && suggestions.length) {
      setSuggestionItems(
        suggestions.map(({ name, value }) => ({
          id: nanoid(),
          name,
          value,
        }))
      );
    }
  }, [suggestions.length]);

  const handleKeyUp = useCallback((ev: React.KeyboardEvent) => {
    if (ev.key === 'ArrowDown') {
      setFocusMenu(true);
    } else if (ev.key === 'Escape') {
      setIsDirty(true);
      setSelected(false);

      setTimeout(() => {
        setFocusMenu(false);
      }, 200);
    }
    onKeyUp?.(ev);
  }, []);

  const handleOnClose = () => {
    inputRef.current?.focus();
    setFocusMenu(false);
    setIsDirty(true);
  };

  const data = useMemo(() => {
    return apiBacked
      ? { focus: focusMenu, items: suggestionItems }
      : { focus: focusMenu, items: listItems };
  }, [focusMenu, listItems.length, suggestionItems.length]);

  return (
    <div
      className={autoSuggestClass}
      data-testid="rc-auto-suggest"
      ref={rootRef}
    >
      <div className="rc-auto-suggest-input-wrapper">
        <Input
          enableClear
          onChange={handleChange}
          value={input}
          controlled
          placeholder={placeholder}
          noUniqueId
          id={id.current}
          isAutoComplete
          onKeyUp={handleKeyUp}
          focusable={focusable}
          showSpinner={showSpinner}
          accent={accent}
          ref={inputRef}
        >
          {icon ? icon : <SearchIcon />}
        </Input>
      </div>
      {matchFound && (
        <SuggestionsMenuOverlay
          id={id.current}
          onSelection={handleSelection}
          placementReference={rootRef}
          align="left"
          placement="bottom"
          width={suggestionsWidth}
          data={data}
          onClose={handleOnClose}
          placementOffset={6}
        />
      )}
    </div>
  );
};

AutoSuggest.displayName = 'AutoSuggest';

export { AutoSuggest };
