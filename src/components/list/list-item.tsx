import cls from "classnames";
import React, { useCallback, useMemo, useRef } from "react";
import { useFocus } from "../common/effects/useFocus";
import { ListItemOption } from "./list-item-option";
import "./list-item.scss";
import { ListItemModel } from "./list-model";

const ListItem: React.FunctionComponent<ListItemModel> = React.memo(
  ({
    disabled,
    id,
    name,
    value,
    selected,
    allowMultiSelection,
    onSelection,
    style,
    showCheckIcon,
    focusable,
    highlightSelection = false,
    textColor,
  }: ListItemModel) => {
    const handleSelection = useCallback(() => {
      onSelection && onSelection({ id, name, value, selected: !selected });
    }, []);

    const ref = useRef<HTMLLIElement>(null);

    useFocus(ref, handleSelection);

    const listItemClass = useMemo(
      () =>
        cls([
          "rc-list-option",
          {
            "rc-list-option-disabled": disabled,
            "rc-list-option-selected": selected,
            "rc-list-option-multi-selection": allowMultiSelection,
            "rc-list-option-highlight-selection": highlightSelection,
            "rc-list-option-focusable": focusable,
          },
        ]),
      [selected, disabled, focusable]
    );

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      handleSelection();
    }, []);

    return (
      <li
        className={listItemClass}
        key={id}
        role="option"
        style={style}
        ref={ref}
        tabIndex={0}
        onClick={handleMouseDown}
      >
        <div className="rc-list-item-wrapper" style={{ width: "100%" }}>
          <ListItemOption
            key={id}
            name={name}
            selected={selected}
            showCheck={showCheckIcon}
            tabIndex={!disabled ? 0 : -1}
            focusable={focusable}
            textColor={textColor}
          />
        </div>
      </li>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.disabled === nextProps.disabled &&
      prevProps.selected === nextProps.selected &&
      prevProps.style?.top === nextProps.style?.top
    );
  }
);

ListItem.displayName = "ListItem";

export { ListItem };
