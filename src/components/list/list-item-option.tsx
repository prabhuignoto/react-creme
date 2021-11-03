import cls from "classnames";
import React from "react";
import { CheckIcon } from "../../icons";
import { useFocus } from "../common/effects/useFocus";

interface ListItemOptionProps {
  name: string;
  selected?: boolean;
  tabIndex: number;
  handleSelection: () => void;
}

const ListItemOption: React.FunctionComponent<ListItemOptionProps> = React.memo(
  ({ name, selected, handleSelection, tabIndex }: ListItemOptionProps) => {
    const ref = React.useRef<HTMLDivElement>(null);

    useFocus(ref, {}, handleSelection);

    return (
      <div
        className="rc-list-option-value-wrapper"
        ref={ref}
        tabIndex={tabIndex}
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
    );
  },
  (prev, cur) => prev.selected === cur.selected
);

ListItemOption.displayName = "ListItemOption";

export { ListItemOption };
