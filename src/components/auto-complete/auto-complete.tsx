import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input, List } from "..";
import { useFirstRender } from "../common/effects/useFirstRender";
import { Option } from "../dropdown/dropdown-model";
import { AutoCompleteProps } from "./auto-complete.model";
import "./auto-complete.scss";

const AutoComplete: React.FunctionComponent<AutoCompleteProps> = ({
  onChange,
  suggestions,
  suggestionsWidth = 200,
  placeholder = "",
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

  const [input, setInput] = React.useState("");
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
    startTransition(() => setSelected(false));
  }, []);

  const debouncedChange = useDebouncedCallback(handleChange, 10);

  const handleSelection = useCallback((selected: Option[]) => {
    if (Array.isArray(selected) && selected.length > 0) {
      setInput(selected[0].name);
      startTransition(() => setSelected(true));
    }
  }, []);

  const isFirstRender = useFirstRender();

  useEffect(() => {
    if (!isFirstRender.current) {
      onChange?.(input);
    }
  }, [input]);

  const style = useMemo(
    () =>
      ({
        "--rc-autocomplete-suggestions-width": `${suggestionsWidth}px`,
      } as CSSProperties),
    [suggestionsWidth]
  );

  return (
    <div className="rc-auto-complete" data-testid="rc-auto-complete">
      <div className="rc-auto-complete-input-wrapper">
        <Input
          enableClear
          onChange={debouncedChange}
          value={input}
          controlled
          placeholder={placeholder}
          noUniqueId
          id={id.current}
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
          />
        </div>
      )}
    </div>
  );
};

export { AutoComplete };
