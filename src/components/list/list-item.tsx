import cls from "classnames";
import React, { useCallback, useMemo } from "react";
import "../../design/focus.scss";
import { CheckBox } from "../checkbox/checkbox";
import { ListItemOption } from "./list-item-option";
import "./list-item.scss";
import { ListItemModel } from "./list-model";

const ListItem: React.FunctionComponent<ListItemModel> = ({
  disabled,
  id,
  name,
  value,
  selected,
  allowMultiSelection,
  onSelection,
  onClick,
  style,
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
            label={name}
            isChecked={selected}
            disabled={disabled}
            onChange={handleSelection}
            size="sm"
          />
        </span>
      ) : (
        <ListItemOption
          name={name}
          selected={selected}
          tabIndex={!disabled ? 0 : -1}
          handleSelection={handleSelection}
          key={id}
        />
      )}
    </li>
  );
};

ListItem.displayName = "ListItem";

export { ListItem };
