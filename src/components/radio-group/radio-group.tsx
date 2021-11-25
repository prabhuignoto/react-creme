import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFirstRender } from "../common/effects/useFirstRender";
import { Radio } from "../radio/radio";
import { RadioGroupItemModel, RadioGroupModel } from "./radio-group-model";
import "./radio-group.scss";

const RadioGroup: React.FunctionComponent<RadioGroupModel> = ({
  items,
  disabled,
  onSelected,
  style,
  layout = "column",
}) => {
  const [_items, setItems] = useState<RadioGroupItemModel[]>(
    Array.isArray(items)
      ? items.map((item) => ({
          id: nanoid(),
          ...item,
          disabled: typeof disabled !== "undefined" ? disabled : item.disabled,
        }))
      : []
  );
  const [changeTracker, setChangeTracker] = useState<number>();
  const active = useRef<string>();

  const handleChange = useCallback(
    ({ id }: { id?: string; checked?: boolean }) => {
      if (active.current !== id) {
        setItems((prev) =>
          prev.map((item) => ({
            ...item,
            checked: item.id === id || false,
            isChecked: item.id === id || false,
          }))
        );
        active.current = id;
        setChangeTracker(Date.now());
      }
    },
    []
  );

  useEffect(() => {
    if (!isFirstRender.current) {
      const foundItem = _items.find((item) => item.checked);

      if (foundItem && onSelected) {
        onSelected(foundItem.label);
      }
    }
  }, [changeTracker]);

  const isFirstRender = useFirstRender();

  const radioGroupClass = useMemo(
    () =>
      classNames("rc-radio-group", {
        "rc-radio-group-row": layout === "row",
        "rc-radio-group-column": layout === "column",
      }),
    []
  );

  return (
    <ul className={radioGroupClass} role="radiogroup" style={style}>
      {_items.map(({ id, disabled, label, checked }) => (
        <li
          key={id}
          className={classNames("rc-radio-grp-item", {
            "rc-radio-grp-item-disabled": disabled,
          })}
          aria-checked={!!checked}
        >
          <Radio
            onChange={handleChange}
            label={label}
            id={id}
            isChecked={checked}
            disabled={disabled}
            isControlled
            withGroup
          />
        </li>
      ))}
    </ul>
  );
};

export { RadioGroup };
