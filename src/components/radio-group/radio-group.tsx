import { nanoid } from "nanoid";
import React, { useCallback, useState } from "react";
import { Radio } from "../radio/radio";
import "./radio-group.scss";

interface RadioGroupModel {
  items: string[];
  onSelected?: (selected: string) => void;
  disabled?: boolean;
}

interface RadioGroupItemModel {
  id?: string;
  selected: boolean | null;
  value?: string;
  disabled?: boolean;
}

const RadioGroup: React.FunctionComponent<RadioGroupModel> = ({
  items,
  disabled,
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
