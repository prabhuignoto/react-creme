import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SearchIcon } from "../../icons";
import { CheckBox } from "../checkbox/checkbox";
import { useFirstRender } from "../common/effects/useFirstRender";
import { Option } from "../dropdown/dropdown-model";
import { Input } from "../input/input";
import { ListModel } from "./list-model";
import "./list.scss";

const List: React.FunctionComponent<ListModel> = ({
  options,
  allowMultipleSelection,
  maxHeight = 250,
  onSelection,
}) => {
  const [listOptions, setListOptions] = useState(
    options.map((option) => ({
      id: nanoid(),
      ...option,
      selected: false,
      visible: true,
    }))
  );

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFirstRender.current && onSelection) {
      onSelection(listOptions.filter((opt) => opt.selected));
    }
  }, [JSON.stringify(listOptions)]);

  const isFirstRender = useFirstRender();

  const handleSearch = useCallback((val) => {
    setListOptions((prev) =>
      prev.map((item) => ({
        ...item,
        visible: val ? item.name.includes(val) : !val,
      }))
    );
  }, []);

  const handleSelection = useCallback(({ id }: Option) => {
    setListOptions((options) =>
      options.map((opt) => {
        if (opt.id === id) {
          return {
            ...opt,
            selected: !opt.selected,
          };
        } else {
          return opt;
        }
      })
    );
  }, []);

  const listStyle = useMemo(
    () =>
      ({
        "--max-height": `${maxHeight}px`,
      } as CSSProperties),
    []
  );

  return (
    <div className={"rc-list"} tabIndex={0} ref={listRef}>
      <div className="rc-list-search-input">
        <Input onChange={handleSearch} enableClear>
          <SearchIcon />
        </Input>
      </div>
      <ul className={"rc-list-options"} role="listbox" style={listStyle}>
        {listOptions
          .filter((item) => item.visible)
          .map(({ disabled, id, name, value }) => (
            <li
              className={classNames([
                "rc-list-option",
                disabled ? "disabled" : "",
              ])}
              key={id}
              role="option"
              tabIndex={!disabled ? 0 : -1}
            >
              {allowMultipleSelection ? (
                <CheckBox
                  label={name}
                  onChange={(selected) =>
                    handleSelection({ id, name, value, selected })
                  }
                />
              ) : (
                <span
                  className="rc-list-option-value"
                  onClick={() =>
                    handleSelection({ id, value, name, selected: true })
                  }
                >
                  {name}
                </span>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export { List };
