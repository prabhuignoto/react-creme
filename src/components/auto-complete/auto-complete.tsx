import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useFirstRender } from "../common/effects/useFirstRender";
import { isValidString } from "../common/utils";
import { Option } from "../dropdown/dropdown-model";
import { Input } from "../input/input";
import { List } from "../list/list";
import { AutoCompleteProps } from "./auto-complete.model";
import "./auto-complete.scss";

const AutoComplete: React.FunctionComponent<AutoCompleteProps> = ({
  onChange,
  onKeyUp,
  onSelection,
  placeholder = "",
  suggestions,
  suggestionsWidth,
  value,
}) => {
  const suggestionItems = React.useRef<Option[]>(
    suggestions
      ? suggestions.map((suggestion) => ({
          id: nanoid(),
          name: suggestion,
        }))
      : []
  );

  const id = useRef(`rc-autocomplete-${nanoid()}`);

  const [input, setInput] = React.useState<string | undefined>("");
  const [selected, setSelected] = React.useState<Boolean>(false);

  const regexTester = useMemo(
    () => input && new RegExp(`^${input.trim()}`, "i"),
    [input]
  );

  const matchFound = useMemo(
    () =>
      !selected &&
      regexTester &&
      suggestionItems.current.some((item) => regexTester.test(item.name)),
    [regexTester, selected]
  );

  const listItems = useMemo<Option[]>(
    () =>
      regexTester
        ? suggestionItems.current.filter((item) => regexTester.test(item.name))
        : [],
    [matchFound, regexTester]
  );

  const handleChange = useCallback((value: string) => {
    setInput(value);
    setSelected(false);
  }, []);

  const handleSelection = useCallback((selected: Option[]) => {
    if (Array.isArray(selected) && selected.length > 0) {
      setInput(selected[0].name);
      setSelected(true);
      onSelection?.(selected[0].name);
    }
  }, []);

  const isFirstRender = useFirstRender();

  useEffect(() => {
    if (!isFirstRender.current && input) {
      onChange?.(input);
    }
  }, [input]);

  useEffect(() => {
    if (!isFirstRender.current && isValidString(value)) {
      setInput(value);
    }
  }, [value]);

  const style = useMemo(
    () =>
      suggestionsWidth
        ? ({
            "--rc-autocomplete-suggestions-width": `${suggestionsWidth}px`,
          } as CSSProperties)
        : {},
    [suggestionsWidth]
  );

  return (
    <div className="rc-auto-complete" data-testid="rc-auto-complete">
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
        />
      </div>
      {matchFound && (
        <div className="rc-auto-complete-suggestions-wrapper" style={style}>
          <List
            options={listItems}
            onSelection={handleSelection}
            showCheckIcon={false}
            itemHeight={35}
            id={id.current}
            border={false}
          />
        </div>
      )}
    </div>
  );
};

export { AutoComplete };
