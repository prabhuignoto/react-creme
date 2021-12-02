import classNames from "classnames";
import React, { useMemo, useRef } from "react";
import { useFocus } from "../common/effects/useFocus";
import { useKey } from "../common/effects/useKey";
import { TabHeadProps } from "./tabs-model";
import "./tabs.scss";

const TabHead: React.FC<TabHeadProps> = React.memo(
  ({
    disabled,
    focusable,
    handleTabSelection,
    id,
    name,
    selected,
    tabStyle,
  }: TabHeadProps) => {
    const ref = useRef(null);

    if (!disabled && focusable) {
      useFocus(ref, () => handleTabSelection(id));
      useKey(ref, () => handleTabSelection(id));
    }

    const headerLabelClass = useMemo(() => {
      return classNames("rc-tab-header-label", {
        "rc-tab-header-selected": selected,
        [`rc-tab-header-${tabStyle}`]: true,
      });
    }, [selected]);

    const tabHeadClass = useMemo(() => {
      return classNames("rc-tab-head", {
        "rc-tab-head-disabled": disabled,
        [`rc-tab-head-${tabStyle}`]: true,
      });
    }, [disabled]);

    return (
      <li
        key={id}
        className={tabHeadClass}
        onClick={() => !disabled && handleTabSelection(id)}
        tabIndex={!disabled && focusable ? 0 : -1}
        ref={ref}
      >
        <span className={headerLabelClass}>{name}</span>
      </li>
    );
  },
  (prev, next) =>
    prev.selected === next.selected && prev.disabled === next.disabled
);

TabHead.displayName = "TabHead";

export { TabHead };
