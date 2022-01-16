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
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon } from "../../icons";
import { useFirstRender } from "../common/effects/useFirstRender";
import { isUndefined } from "../common/utils";
import { Option } from "../dropdown/dropdown-model";
import { Input } from "../input/input";
import { ListItem } from "./list-item";
import { ListModel, ListOption } from "./list-model";
import "./list.scss";

const initOptions = (
  options: ListOption[],
  rowGap: number,
  itemHeight: number,
  noUniqueIds: boolean
): ListOption[] => {
  return options
    .sort((a, b) => (b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 1))
    .filter((opt) => (!isUndefined(opt.visible) ? opt.visible : true))
    .map((option, index) => ({
      id: !noUniqueIds ? nanoid() : option.id,
      ...option,
      selected: !isUndefined(option.selected) ? option.selected : false,
      top: index > 0 ? index * (itemHeight + rowGap) + rowGap : rowGap,
      value: option.value || option.name,
      visible: true,
    }));
};

const List: React.FunctionComponent<ListModel> = ({
  allowMultiSelection = false,
  border = true,
  enableSearch = false,
  itemHeight = 40,
  maxHeight = 600,
  minHeight = 100,
  noUniqueIds = false,
  onSelection,
  options = [],
  rowGap = 5,
  showCheckIcon = true,
  virtualized = false,
  focusable = false,
  highlightSelection = false,
  textColor = "#000",
  textColorSelected = "#000",
  backGroundColor = "#fff",
  RTL = false,
  id,
  label,
}: ListModel) => {
  const [_listOptions, setListOptions] = useState<ListOption[]>(
    initOptions(options, rowGap, itemHeight, noUniqueIds)
  );

  const listRef = useRef<HTMLUListElement | null>(null);
  const [selected, setSelected] = useState<ListOption[]>();
  const [visibleRange, setVisibleRange] = useState<number[]>([0, 0]);
  const [renderTrigger, setRenderTrigger] = useState(0);

  const rcListClass = useMemo(
    () =>
      cls("rc-list", {
        "rc-list-border": border,
        "rc-list-search": enableSearch,
      }),
    []
  );

  const listStyle = useMemo(() => {
    const style = {
      "--list-height": `${
        _listOptions.filter((v) => v.visible).length * (itemHeight + rowGap) +
        rowGap
      }px`,
    } as CSSProperties;

    return style;
  }, [_listOptions.length, renderTrigger]);

  const handleSearch = useCallback((val: string) => {
    const _val = val.trim().toLowerCase();

    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }

    setListOptions((prev) => {
      let updated = [];

      if (_val.length) {
        updated = prev
          .map((opt) => ({
            ...opt,
            visible: opt.name.toLowerCase().includes(_val),
          }))
          .sort((a, b) => (a.visible === b.visible ? 0 : a.visible ? -1 : 1));
      } else {
        updated = prev
          .map((opt) => ({
            ...opt,
            visible: true,
          }))
          .sort((a, b) =>
            b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 1
          );
      }

      return updated.map((option, index) => ({
        ...option,
        top: index > 0 ? index * (itemHeight + rowGap) + rowGap : rowGap,
      }));
    });
    setRenderTrigger(Date.now());
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

    setRenderTrigger(Date.now());
  };

  useEffect(() => {
    if (selected && onSelection) {
      onSelection(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (!isFirstRender.current) {
      setListOptions(initOptions(options, rowGap, itemHeight, noUniqueIds));
    }
  }, [JSON.stringify(options)]);

  const isFirstRender = useFirstRender();

  const setRange = useCallback(() => {
    if (listRef.current) {
      const list = listRef.current;
      const scrollTop = Math.round(list.scrollTop);
      const height = Math.round(list.clientHeight);

      setVisibleRange([scrollTop, scrollTop + height]);
    }
  }, []);

  const handleScroll = useDebouncedCallback(setRange);

  const onListRef = useCallback((el) => {
    if (el) {
      listRef.current = el;

      if (virtualized) {
        setRange();
      }
    }
  }, []);

  return (
    <div
      className={rcListClass}
      style={
        {
          "--list-bg-color": backGroundColor,
          "--max-height": `${maxHeight}px`,
          "--min-height": `${minHeight}px`,
        } as CSSProperties
      }
    >
      {enableSearch && (
        <div className="rc-list-search-input">
          <Input
            onChange={handleSearch}
            enableClear
            controlled
            RTL={RTL}
            focusable={focusable}
          >
            <SearchIcon />
          </Input>
        </div>
      )}
      <div
        className="rc-list-options-wrapper"
        ref={onListRef}
        onScroll={handleScroll}
      >
        <ul
          className={"rc-list-options"}
          role="listbox"
          aria-label={`rc-list-label-${label}`}
          style={listStyle}
          id={id}
        >
          {_listOptions
            .filter((item) => item.visible)
            .map(({ disabled, id, name, value = "", selected, top = 0 }) => {
              const canShow =
                !virtualized ||
                (top + itemHeight >= visibleRange[0] && top <= visibleRange[1]);
              return canShow ? (
                <ListItem
                  allowMultiSelection={allowMultiSelection}
                  disabled={disabled}
                  focusable={focusable}
                  id={id}
                  key={id}
                  name={name}
                  onSelection={handleSelection}
                  selected={selected}
                  showCheckIcon={showCheckIcon}
                  highlightSelection={highlightSelection}
                  textColor={textColor}
                  textColorSelected={textColorSelected}
                  value={value}
                  RTL={RTL}
                  style={{
                    height: `${itemHeight}px`,
                    top: `${top}px`,
                  }}
                />
              ) : null;
            })}
        </ul>
      </div>
    </div>
  );
};

List.displayName = "List";

export { List };
