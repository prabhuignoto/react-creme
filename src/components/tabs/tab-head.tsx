import classNames from "classnames";
import React, { useRef } from "react";
import { useFocus } from "../common/effects/useFocus";
import { useKey } from "../common/effects/useKey";
import { TabHeadProps } from "./tabs-model";
import "./tabs.scss";

const TabHead: React.FC<TabHeadProps> = ({
  id,
  name,
  selected,
  handleTabSelection,
}) => {
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
        })}
      >
        {name}
      </span>
    </li>
  );
};

export { TabHead };
