import cls from "classnames";
import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import "../../design/focus.scss";
import { SearchIcon } from "../../icons";
import { useFirstRender } from "../common/effects/useFirstRender";
import { Option } from "../dropdown/dropdown-model";
import { Input } from "../input/input";
import { ListItem } from "./list-item";
import { ListModel, ListOption } from "./list-model";
import "./list.scss";

const List: React.FunctionComponent<ListModel> = ({
  allowMultiSelection = false,
  borderLess = false,
  enableSearch = false,
  itemHeight = 45,
  maxHeight = 600,
  minHeight = 100,
  noUniqueIds = false,
  onSelection,
  options = [],
  rowGap = 10,
  showCheckIcon = true,
  virtualized = false,
  focusable = false,
}: ListModel) => {
  const [_listOptions, setListOptions] = useState<ListOption[]>(
    options
      .sort((a, b) => (b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 1))
      .filter((opt) =>
        typeof opt.visible !== "undefined" ? opt.visible : true
      )
      .map((option, index) => ({
        id: !noUniqueIds ? nanoid() : option.id,
        ...option,
        visible: true,
        selected:
          typeof option.selected !== "undefined" ? option.selected : false,
        top: index > 0 ? index * (itemHeight + rowGap) + rowGap : rowGap,
      }))
  );

  const listRef = useRef<HTMLUListElement | null>(null);
  const [selected, setSelected] = useState<ListOption[]>();
  const [visibleRange, setVisibleRange] = useState<number[]>([0, 0]);
  const [timeStamp, setTimeStamp] = useState(0);

  const rcListClass = useMemo(
    () =>
      cls("rc-list", {
        "rc-list-border-less": borderLess,
        "rc-list-search": enableSearch,
      }),
    []
  );

  const listStyle = useMemo(() => {
    return {
      "--list-height": `${
        _listOptions.filter((v) => v.visible).length * (itemHeight + rowGap) +
        rowGap
      }px`,
    } as CSSProperties;
  }, [_listOptions.length, timeStamp]);

  const handleSearch = useCallback((val: string) => {
    const _val = val.trim().toLowerCase();

    startTransition(() => {
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

      setTimeStamp(Date.now());
    });
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

  useEffect(() => {
    if (selected && onSelection) {
      onSelection(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (!isFirstRender.current) {
      setListOptions(
        options.map((option, index) => ({
          id: !noUniqueIds ? nanoid() : option.id,
          ...option,
          visible:
            typeof option.visible !== "undefined" ? option.visible : true,
          selected:
            typeof option.selected !== "undefined" ? option.selected : false,
          top: index > 0 ? index * (itemHeight + rowGap) + rowGap : rowGap,
        }))
      );
    }
  }, [JSON.stringify(options)]);

  const isFirstRender = useFirstRender();

  const setRange = useCallback(() => {
    if (listRef.current) {
      const list = listRef.current;
      const scrollTop = Math.round(list.scrollTop);
      const height = Math.round(list.clientHeight);

      startTransition(() => {
        setVisibleRange([scrollTop, scrollTop + height]);
      });
    }
  }, []);

  const handleScroll = useDebouncedCallback(setRange, 50, {
    leading: false,
    trailing: true,
  });

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
          "--min-height": `${minHeight}px`,
          "--max-height": `${maxHeight}px`,
        } as CSSProperties
      }
    >
      {enableSearch && (
        <div className="rc-list-search-input">
          <Input onChange={handleSearch} enableClear>
            <SearchIcon />
          </Input>
        </div>
      )}
      <div
        className="rc-list-options-wrapper"
        ref={onListRef}
        onScroll={handleScroll}
      >
        <ul className={"rc-list-options"} role="listbox" style={listStyle}>
          {_listOptions
            .filter((item) => item.visible)
            .map(({ disabled, id, name, value, selected, top = 0 }) => {
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
                  value={value}
                  style={{
                    top: `${top}px`,
                    height: `${itemHeight}px`,
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
