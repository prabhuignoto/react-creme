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
import { useFirstRender } from "../common/effects/useFirstRender";
import { Option } from "../dropdown/dropdown-model";
import { Input } from "../input/input";
import { ListItem } from "./list-item";
import { ListModel } from "./list-model";
import "./list.scss";

export interface ListOption extends Option {
  visible?: boolean;
  group?: string;
}

const List: React.FunctionComponent<ListModel> = ({
  allowMultiSelection,
  borderLess = false,
  enableSearch = false,
  itemHeight = 45,
  minHeight = 100,
  maxHeight = 600,
  noUniqueIds = false,
  onSelection,
  options,
  rowGap = 10,
  showCheckIcon = true,
}) => {
  const [_listOptions, setListOptions] = useState<ListOption[]>(
    options.map((option) => ({
      id: !noUniqueIds ? nanoid() : option.id,
      ...option,
      visible: true,
      selected: option.selected || false,
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

  const handleSelection = (opt: Option) => {
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
  };

  const visibleOptions = useMemo(
    () => _listOptions.filter((opt) => opt.visible).length,
    [_listOptions.length]
  );

  const listStyle = useMemo(
    () =>
      ({
        "--height": `${visibleOptions * (itemHeight + rowGap) + rowGap}px`,
      } as CSSProperties),
    [visibleOptions]
  );

  useEffect(() => {
    if (selected && onSelection) {
      onSelection(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (!isFirstRender.current) {
      setListOptions(
        options.map((option) => ({
          id: !noUniqueIds ? nanoid() : option.id,
          ...option,
          visible: true,
          selected: option.selected || false,
        }))
      );
    }
  }, [JSON.stringify(options)]);

  const isFirstRender = useFirstRender();

  return (
    <div
      className={rcListClass}
      ref={listRef}
      style={{ minHeight: `${minHeight}px`, maxHeight: `${maxHeight}px` }}
    >
      {enableSearch && (
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
              showCheckIcon={showCheckIcon}
              key={id}
              onSelection={handleSelection}
              allowMultiSelection={allowMultiSelection}
              style={{
                top: `${
                  index > 0 ? index * (itemHeight + rowGap) + rowGap : rowGap
                }px`,
                height: `${itemHeight}px`,
              }}
            />
          ))}
      </ul>
    </div>
  );
};

export { List };
