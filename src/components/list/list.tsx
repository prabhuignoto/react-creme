import cls from "classnames";
import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "../../design/focus.scss";
import { SearchIcon } from "../../icons";
import { Option } from "../dropdown/dropdown-model";
import { Input } from "../input/input";
import { ListItem } from "./list-item";
import { ListModel } from "./list-model";
import "./list.scss";

export interface ListOption extends Option {
  visible?: boolean;
}

const List: React.FunctionComponent<ListModel> = ({
  allowMultiSelection,
  borderLess = false,
  disableSearch,
  maxHeight = 450,
  onSelection,
  options,
  itemHeight = 45,
}) => {
  const [_listOptions, setListOptions] = useState<ListOption[]>(
    options.map((option) => ({
      id: nanoid(),
      ...option,
      visible: true,
    }))
  );

  const listRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<ListOption[]>();

  const rcListClass = useMemo(
    () => cls("rc-list", { "rc-list-border-less": borderLess }),
    []
  );

  const handleSearch = useCallback((val) => {
    setListOptions((prev) =>
      prev.map((item) => ({
        ...item,
        visible: val ? item.name.includes(val) : !val,
      }))
    );
  }, []);

  const handleSelection = useCallback((opt) => {
    if (allowMultiSelection) {
      setListOptions((prev) => {
        const updated = prev.map((option) => ({
          ...option,
          selected: option.id === opt.id ? !option.selected : option.selected,
        }));
        setSelected(updated.filter((opt) => opt.selected));
        return updated;
      });
    } else {
      setListOptions((prev) => {
        const updated = prev.map((option) => ({
          ...option,
          selected: option.id === opt.id,
        }));
        setSelected(updated.filter((opt) => opt.selected));
        return updated;
      });
    }
  }, []);

  const visibleOptions = useMemo(
    () => _listOptions.filter((opt) => opt.visible).length,
    []
  );

  const listStyle = useMemo(
    () =>
      ({
        "--height": `${visibleOptions * (itemHeight + 10)}px`,
      } as CSSProperties),
    [visibleOptions]
  );

  useEffect(() => {
    if (selected && onSelection) {
      onSelection(selected);
    }
  }, [selected]);

  return (
    <div
      className={rcListClass}
      ref={listRef}
      style={{ height: `${maxHeight}px` }}
    >
      {!disableSearch && (
        <div className="rc-list-search-input">
          <Input onChange={handleSearch} enableClear>
            <SearchIcon />
          </Input>
        </div>
      )}
      <ul className={"rc-list-options"} role="listbox" style={listStyle}>
        {_listOptions
          .filter((item) => item.visible)
          .map(({ disabled, id, name, value, selected }, index) => (
            <ListItem
              name={name}
              id={id}
              value={value}
              selected={selected}
              disabled={disabled}
              key={id}
              onSelection={handleSelection}
              allowMultiSelection={allowMultiSelection}
              style={{
                top: `${index * (itemHeight + 10)}px`,
                height: `${itemHeight}px`,
              }}
            />
          ))}
      </ul>
    </div>
  );
};

export { List };
