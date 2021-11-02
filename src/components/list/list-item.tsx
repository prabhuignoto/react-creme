import cls from "classnames";
import React, { useCallback, useMemo, useRef } from "react";
import "../../design/focus.scss";
import { CheckIcon } from "../../icons";
import { CheckBox } from "../checkbox/checkbox";
import { useFocus } from "../common/effects/useFocus";
import { useKey } from "../common/effects/useKey";
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
  const ref = useRef(null);

  const handleSelection = useCallback(() => {
    onSelection && onSelection({ id, name, value, selected });
  }, []);

  useKey(ref, handleSelection);

  useFocus(ref, { bgHighlight: false });

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
        <div
          className="rc-list-option-value-wrapper"
          ref={ref}
          tabIndex={!disabled && !allowMultiSelection ? 0 : -1}
          onClick={handleSelection}
        >
          <span
            className={cls("rc-list-option-icon", {
              "rc-list-option-selected": selected,
            })}
          >
            <CheckIcon />
          </span>
          <span className={"rc-list-option-value"}>{name}</span>
        </div>
      )}
    </li>
  );
};

ListItem.displayName = "ListItem";

export { ListItem };
