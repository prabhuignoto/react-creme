import cls from "classnames";
import React, { useCallback, useMemo } from "react";
import "../../design/focus.scss";
import { CheckBox } from "../checkbox/checkbox";
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
    onClick,
    style,
    showCheckIcon,
  }: ListItemModel) => {
    const handleSelection = useCallback(() => {
      onSelection && onSelection({ id, name, value, selected });
    }, []);

    const listItemClass = useMemo(
      () =>
        cls([
          "rc-list-option",
          {
            "rc-list-option-disabled": disabled,
            "rc-list-option-selected": selected,
          },
        ]),
      [selected]
    );

    return (
      <li
        className={listItemClass}
        key={id}
        role="option"
        onClick={onClick}
        style={style}
      >
        {allowMultiSelection ? (
          <span className="rc-list-item-checkbox-wrapper">
            <CheckBox
              disabled={disabled}
              isChecked={selected}
              label={name}
              onChange={handleSelection}
              size="sm"
            />
          </span>
        ) : (
          <ListItemOption
            handleSelection={handleSelection}
            key={id}
            name={name}
            selected={selected}
            showCheck={showCheckIcon}
            tabIndex={!disabled ? 0 : -1}
          />
        )}
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
