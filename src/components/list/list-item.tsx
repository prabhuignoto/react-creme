import classNames from "classnames";
import React, { useMemo, useRef } from "react";
import "../../design/focus.scss";
import { CheckBox } from "../checkbox/checkbox";
import { useFocus } from "../common/effects/useFocus";

export interface ListItemModel {
  disabled?: boolean;
  id?: string;
  name: string;
  value: string;
  selected?: boolean;
  allowMultipleSelection?: boolean;
  onSelection?: (t: {
    id?: string;
    name: string;
    value: string;
    selected?: boolean;
  }) => void;
}

const ListItem: React.FunctionComponent<ListItemModel> = React.memo(
  ({
    disabled,
    id,
    name,
    value,
    selected,
    allowMultipleSelection,
    onSelection,
  }: ListItemModel) => {
    const ref = useRef(null);

    if (!allowMultipleSelection) {
      useFocus(ref, { bgHighlight: true });
    }

    const listItemClass = useMemo(
      () => classNames(["rc-list-option", disabled ? "disabled" : ""]),
      []
    );

    return (
      <li
        className={listItemClass}
        key={id}
        role="option"
        tabIndex={!disabled && !allowMultipleSelection ? 0 : -1}
        ref={ref}
      >
        {allowMultipleSelection ? (
          <CheckBox
            label={name}
            isChecked={selected}
            disabled={disabled}
            onChange={(selected) =>
              onSelection && onSelection({ id, name, value, selected })
            }
          />
        ) : (
          <span
            className="rc-list-option-value"
            onClick={() =>
              onSelection && onSelection({ id, value, name, selected: true })
            }
          >
            {name}
          </span>
        )}
      </li>
    );
  },
  (prev, cur) =>
    prev.selected === cur.selected &&
    prev.allowMultipleSelection === cur.allowMultipleSelection
);

ListItem.displayName = "ListItem";

export { ListItem };
