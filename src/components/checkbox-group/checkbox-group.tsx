import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useMemo } from "react";
import { CheckBox } from "../checkbox/checkbox";
import { CheckboxModel } from "../checkbox/checkbox-model";
import "./checkbox-group.scss";

interface CheckboxGroupProps {
  options: CheckboxModel[];
  border?: boolean;
  disabled?: boolean;
  layout?: "horizontal" | "vertical";
}

const CheckBoxGroup: React.FunctionComponent<CheckboxGroupProps> = ({
  options,
  disabled,
  border,
  layout = "horizontal",
}) => {
  const wrapperClass = useMemo(() => {
    return classNames("rc-checkbox-group", {
      "rc-checkbox-group-border": border,
      "rc-checkbox-group-vertical": layout === "vertical",
      "rc-checkbox-group-horizontal": layout === "horizontal",
      "rc-checkbox-group-disabled": disabled,
    });
  }, [layout, disabled]);

  const [items, setItems] = React.useState(
    options ? options.map((option) => ({ id: nanoid(), ...option })) : []
  );

  const handleChange = (id: string, name: string, selected: boolean) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, isChecked: selected };
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <div className={wrapperClass} role="group">
      {items.map((item) => {
        const { id, ...rest } = item;
        return (
          <CheckBox
            key={id}
            {...rest}
            disabled={disabled || item.disabled}
            onChange={handleChange}
          />
        );
      })}
    </div>
  );
};

export { CheckBoxGroup };
