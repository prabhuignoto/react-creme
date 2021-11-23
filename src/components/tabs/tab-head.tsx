import classNames from "classnames";
import React, { useRef } from "react";
import { useFocus } from "../common/effects/useFocus";
import { useKey } from "../common/effects/useKey";
import { TabHeadProps } from "./tabs-model";
import "./tabs.scss";

const TabHead: React.FC<TabHeadProps> = React.memo(
  ({ id, name, selected, handleTabSelection, tabStyle }: TabHeadProps) => {
    const ref = useRef(null);

    useFocus(ref);
    useKey(ref, () => handleTabSelection(id));

    return (
      <li
        key={id}
        className="rc-tab-head"
        onClick={() => handleTabSelection(id)}
        tabIndex={0}
        ref={ref}
      >
        <span
          className={classNames("rc-tab-header-label", {
            "rc-tab-header-selected": selected,
            [`rc-tab-header-${tabStyle}`]: true,
          })}
        >
          {name}
        </span>
      </li>
    );
  },
  (prev, next) => prev.selected === next.selected
);

TabHead.displayName = "TabHead";

export { TabHead };
