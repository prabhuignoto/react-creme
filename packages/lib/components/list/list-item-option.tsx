import cls from "classnames";
import React, { CSSProperties, useMemo } from "react";
import { CheckIcon } from "../../icons";
import { ListItemOptionProps } from "./list-model";

const ListItemOption: React.FunctionComponent<ListItemOptionProps> = React.memo(
  ({
    name,
    selected,
    showCheck,
    focusable,
    textColor,
    textColorSelected,
    RTL,
  }: ListItemOptionProps) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const listOptionClass = cls("rc-list-option-value-wrapper", {
      "rc-list-option-no-icon": !showCheck,
      "rc-list-option-rtl": RTL,
    });

    const style = useMemo(() => {
      return {
        "--text-color": textColor,
        "--text-color-selected": textColorSelected,
      } as CSSProperties;
    }, []);

    return (
      <div className={listOptionClass} ref={ref} style={style}>
        {showCheck && (
          <span
            className={cls("rc-list-option-icon", {
              "rc-list-option-selected": selected,
              "rc-list-option-rtl": RTL,
            })}
          >
            <CheckIcon />
          </span>
        )}
        <span className={"rc-list-option-value"}>{name}</span>
      </div>
    );
  },
  (prev, next) => {
    return prev.selected === next.selected;
  }
);

ListItemOption.displayName = "ListItemOption";

export { ListItemOption };