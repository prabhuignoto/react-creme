import cls from "classnames";
import React from "react";
import { CheckIcon } from "../../icons";
import { useFocus } from "../common/effects/useFocus";

interface ListItemOptionProps {
  name: string;
  selected?: boolean;
  tabIndex: number;
  handleSelection: () => void;
  showCheck?: boolean;
}

const ListItemOption: React.FunctionComponent<ListItemOptionProps> = React.memo(
  ({
    name,
    selected,
    handleSelection,
    tabIndex,
    showCheck,
  }: ListItemOptionProps) => {
    const ref = React.useRef<HTMLDivElement>(null);

    useFocus(ref, {}, handleSelection);

    const listOptionClass = cls("rc-list-option-value-wrapper", {
      "rc-list-option-no-icon": !showCheck,
    });

    return (
      <div
        className={listOptionClass}
        onClick={handleSelection}
        ref={ref}
        tabIndex={tabIndex}
      >
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
  (prev, cur) => prev.selected === cur.selected
);

ListItemOption.displayName = "ListItemOption";

export { ListItemOption };
