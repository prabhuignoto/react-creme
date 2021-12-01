import cls from "classnames";
import React from "react";
import { CheckIcon } from "../../icons";

interface ListItemOptionProps {
  name: string;
  selected?: boolean;
  tabIndex: number;
  showCheck?: boolean;
  focusable?: boolean;
}

const ListItemOption: React.FunctionComponent<ListItemOptionProps> = React.memo(
  ({ name, selected, showCheck, focusable }: ListItemOptionProps) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const listOptionClass = cls("rc-list-option-value-wrapper", {
      "rc-list-option-no-icon": !showCheck,
    });

    return (
      <div className={listOptionClass} ref={ref}>
        {showCheck && (
          <span
            className={cls("rc-list-option-icon", {
              "rc-list-option-selected": selected,
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
