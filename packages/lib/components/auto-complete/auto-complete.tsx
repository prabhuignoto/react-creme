import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useFirstRender } from "../common/effects/useFirstRender";
import { OverlayModel } from "../common/overlay-model";
import { isValidString } from "../common/utils";
import { withOverlay } from "../common/withOverlay";
import { Option } from "../dropdown/dropdown-model";
import { Input } from "../input/input";
import { List } from "../list/list";
import { ListOption } from "../list/list-model";
import { AutoCompleteProps } from "./auto-complete.model";
import "./auto-complete.scss";
import "../input/input.scss";

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
            "--suggestions-width": `${width}px`,
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
  { disableBackdrop: true, placement: "bottom" }
);

const AutoComplete: React.FunctionComponent<AutoCompleteProps> = ({
  onChange,
  onKeyUp,
  onSelection,
  placeholder = "",
  suggestions,
  suggestionsWidth,
  value,
  focusable = false,
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
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
      inputRef.current?.focus();
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
          // ref={inputRef}
        />
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
