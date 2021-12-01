import cls from "classnames";
import React, { useCallback, useMemo, useRef } from "react";
import "../../design/focus.scss";
import { CheckBox } from "../checkbox/checkbox";
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
  }: ListItemModel) => {
    const handleSelection = useCallback(() => {
      onSelection && onSelection({ id, name, value, selected: !selected });
    }, []);

    const ref = useRef<HTMLDivElement>(null);

    useFocus(ref, {}, handleSelection);

    const listItemClass = useMemo(
      () =>
        cls([
          "rc-list-option",
          {
            "rc-list-option-disabled": disabled,
            "rc-list-option-selected": selected,
            "rc-list-option-multi-selection": allowMultiSelection,
          },
        ]),
      [selected, disabled]
    );

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      handleSelection();
    }, []);

    return (
      <li className={listItemClass} key={id} role="option" style={style}>
        <div
          className="rc-list-item-wrapper"
          ref={ref}
          tabIndex={0}
          style={{ width: "100%" }}
          onMouseDown={handleMouseDown}
        >
          {allowMultiSelection ? (
            <span className="rc-list-item-checkbox-wrapper">
              <CheckBox
                disabled={disabled}
                isChecked={selected}
                label={name}
                size="sm"
                border={false}
                focusable={false}
              />
            </span>
          ) : (
            <ListItemOption
              key={id}
              name={name}
              selected={selected}
              showCheck={showCheckIcon}
              tabIndex={!disabled ? 0 : -1}
              focusable={focusable}
            />
          )}
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
