import classNames from "classnames";
import React, { useCallback, useMemo, useRef } from "react";
import "../../design/focus.scss";
import { CheckBox } from "../checkbox/checkbox";
import { useFocus } from "../common/effects/useFocus";
import { useKey } from "../common/effects/useKey";
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
  }: ListItemModel) => {
    const ref = useRef(null);

    const handleSelection = useCallback(() => {
      onSelection && onSelection({ id, name, value, selected });
    }, []);

    useKey(ref, handleSelection);

    useFocus(ref, { bgHighlight: false });

    const listItemClass = useMemo(
      () =>
        classNames([
          "rc-list-option",
          {
            "rc-list-option-disabled": disabled,
            "rc-list-option-selected": selected,
          },
        ]),
      [selected]
    );

    return (
      <li className={listItemClass} key={id} role="option" onClick={onClick}>
        {allowMultiSelection ? (
          <span className="rc-list-item-checkbox-wrapper">
            <CheckBox
              label={name}
              isChecked={selected}
              disabled={disabled}
              onChange={handleSelection}
            />
          </span>
        ) : (
          <span
            className="rc-list-option-value"
            ref={ref}
            tabIndex={!disabled && !allowMultiSelection ? 0 : -1}
            onClick={handleSelection}
          >
            {name}
          </span>
        )}
      </li>
    );
  },
  (prev, cur) =>
    prev.selected === cur.selected &&
    prev.allowMultiSelection === cur.allowMultiSelection
);

ListItem.displayName = "ListItem";

export { ListItem };
