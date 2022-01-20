import { nanoid } from 'nanoid';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import useDeepCompareEffect from 'use-deep-compare-effect';
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
import { AutoCompleteProps } from './auto-suggest.model';
import './auto-suggest.scss';

interface SuggestionsOverlayModel extends OverlayModel {
  id?: string;
  onSelection: (option: ListOption[]) => void;
  suggestions: Option[];
  width?: number;
}

const SuggestionsMenu: React.FunctionComponent<SuggestionsOverlayModel> = ({
  onSelection,
  id,
  width,
  data,
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
    <div className="rc-auto-suggest-suggestions-wrapper" style={style}>
      <List
        options={data as ListOption[]}
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
  suggestionsWidth = 250,
  value,
  focusable = false,
  debounce = 250,
  showSpinner = false,
  accent = 'flat',
  apiBacked = false,
  icon,
}) => {
  debugger;
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
    () => (input && !apiBacked ? new RegExp(`^${input.trim()}`, 'i') : null),
    [input, apiBacked]
  );

  const matchFound = useMemo(() => {
    if (apiBacked && suggestionItems.length) {
      return true;
    } else if (!selected && regexTester) {
      return suggestionItems.some((item) => regexTester.test(item.name));
    }
  }, [regexTester, selected, isDirty, suggestionItems.length, apiBacked]);

  const listItems = useMemo<Option[]>(
    () =>
      regexTester
        ? suggestionItems.filter((item) => regexTester.test(item.name))
        : [],
    [matchFound, regexTester, isDirty]
  );

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

  useDeepCompareEffect(() => {
    if (!isFirstRender.current && suggestions.length) {
      setSuggestionItems(
        suggestions.map(({ name, value }) => ({
          id: nanoid(),
          name,
          value,
        }))
      );
    }
  }, [suggestions]);

  return (
    <div
      className="rc-auto-suggest"
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
          onKeyUp={onKeyUp}
          focusable={focusable}
          showSpinner={showSpinner}
          accent={accent}
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
          data={apiBacked ? suggestionItems : listItems}
        />
      )}
    </div>
  );
};

export { AutoComplete };
