import { nanoid } from 'nanoid';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { SearchIcon } from '../../icons';
import { useFirstRender } from '../common/effects/useFirstRender';
import { OverlayModel } from '../common/overlay-model';
import { isValidString } from '../common/utils';
import { withOverlay } from '../common/withOverlay';
import { Option } from '../dropdown/dropdown-model';
import { Input } from '../input/input';
import '../input/input.scss';
import { List } from '../list/list';
import { ListOption } from '../list/list-model';
import { AutoCompleteProps } from './auto-complete.model';
import './auto-complete.scss';

interface SuggestionsOverlayModel extends OverlayModel {
  id?: string;
  onSelection: (option: ListOption[]) => void;
  suggestions: Option[];
  width?: number;
}

const SuggestionsMenu: React.FunctionComponent<SuggestionsOverlayModel> = ({
  suggestions,
  onSelection,
  id,
  width,
}) => {
  const style = useMemo(
    () =>
      width
        ? ({
            '--suggestions-width': `${width}px`,
          } as CSSProperties)
        : {},
    [width]
  );

  return (
    <div className="rc-auto-complete-suggestions-wrapper" style={style}>
      <List
        options={suggestions}
        onSelection={onSelection}
        showCheckIcon={false}
        itemHeight={35}
        id={id}
        border={false}
      />
    </div>
  );
};

const SuggestionsMenuOverlay = withOverlay<SuggestionsOverlayModel>(
  SuggestionsMenu,
  { disableBackdrop: true, placement: 'bottom' }
);

const AutoComplete: React.FunctionComponent<AutoCompleteProps> = ({
  onChange,
  onKeyUp,
  onSelection,
  placeholder = '',
  suggestions,
  suggestionsWidth,
  value,
  focusable = false,
  debounce = 500,
  showSpinner = false,
  accent = 'flat',
  noFiltering = false,
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
  const [selected, setSelected] = React.useState<Boolean>(false);

  const onChangeDebounced = useDebouncedCallback(() => {
    input && onChange?.(input);
  }, debounce);

  const regexTester = useMemo(
    () => (input && !noFiltering ? new RegExp(`^${input.trim()}`, 'i') : null),
    [input, noFiltering]
  );

  const matchFound = useMemo(() => {
    if (noFiltering && suggestionItems.length) {
      return true;
    } else if (!selected && regexTester) {
      return suggestionItems.some((item) => regexTester.test(item.name));
    }
  }, [regexTester, selected, isDirty, suggestionItems.length, noFiltering]);

  const listItems = useMemo<Option[]>(() => {
    return regexTester
      ? suggestionItems.filter((item) => regexTester.test(item.name))
      : suggestionItems;
  }, [matchFound, regexTester, isDirty, suggestionItems.length]);

  const handleChange = useCallback((value: string) => {
    setInput(value);
    setSelected(false);
    setIsDirty(true);
  }, []);

  const handleSelection = useCallback((selected: Option[]) => {
    if (Array.isArray(selected) && selected.length > 0) {
      const selectedItem = selected[0];
      if (selectedItem) {
        const { name, value } = selectedItem;
        setInput(name);
        setSelected(true);
        onSelection?.({ name, value: value || '' });
      }
      inputRef.current?.focus();
    }
  }, []);

  const isFirstRender = useFirstRender();

  useEffect(() => {
    if (!isFirstRender.current && input) {
      onChangeDebounced();
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
  }, [JSON.stringify(suggestions)]);

  return (
    <div
      className="rc-auto-complete"
      data-testid="rc-auto-complete"
      ref={rootRef}
    >
      <div className="rc-auto-complete-input-wrapper">
        <Input
          enableClear
          onChange={handleChange}
          value={input}
          controlled
          placeholder={placeholder}
          noUniqueId
          id={id.current}
          isAutoComplete
          onKeyUp={onKeyUp}
          focusable={focusable}
          showSpinner={showSpinner}
          accent={accent}
        >
          <SearchIcon />
        </Input>
      </div>
      {matchFound && (
        <SuggestionsMenuOverlay
          id={id.current}
          suggestions={listItems}
          onSelection={handleSelection}
          placementReference={rootRef}
          align="left"
          placement="bottom"
          width={suggestionsWidth}
        />
      )}
    </div>
  );
};

export { AutoComplete };
