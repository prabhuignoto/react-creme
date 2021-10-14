import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Radio } from "../radio/radio";
import "./radio-group.scss";

export interface RadioGroupModel {
  items: string[];
  onSelected?: (selected: string) => void;
  disabled?: boolean;
}

export interface RadioGroupItemModel {
  id?: string;
  selected: boolean | null;
  value?: string;
  disabled?: boolean;
}

const RadioGroup: React.FunctionComponent<RadioGroupModel> = ({
  items,
  disabled,
  onSelected,
}) => {
  const [_items, setItems] = useState<RadioGroupItemModel[]>(
    Array.isArray(items)
      ? items.map((item) => ({
          id: nanoid(),
          value: item,
          selected: null,
        }))
      : []
  );
  const isFirstRender = useRef(true);

  const handleChange = useCallback(
    ({ id, selected }: { id?: string; selected?: boolean }) => {
      setItems((prev) =>
        prev.map((item) => ({
          ...item,
          selected:
            item.id === id ? true : item.selected !== null ? false : null,
        }))
      );
    },
    []
  );

  useEffect(() => {
    if (!isFirstRender.current) {
      const foundItem = _items.find((item) => item.selected);

      if (foundItem && foundItem.value && onSelected) {
        onSelected(foundItem.value);
      }
    }
  }, [JSON.stringify(_items)]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  return (
    <ul className={"radio-group-wrapper"} role="radiogroup">
      {_items.map((item) => (
        <li
          key={item.id}
          className={"radio-group-item"}
          role="none"
          aria-checked={!!item.selected}
        >
          <Radio
            onChange={handleChange}
            label={item.value}
            id={item.id}
            isChecked={item.selected}
          />
        </li>
      ))}
    </ul>
  );
};

export { RadioGroup };
