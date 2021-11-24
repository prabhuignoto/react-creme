import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { CSSProperties, useCallback, useMemo, useState } from "react";
import { TabHeaders } from "./tab-headers";
import { TabItemModel, TabsModel } from "./tabs-model";
import "./tabs.scss";

const Tabs: React.FunctionComponent<TabsModel> = ({
  children,
  labels,
  width = "100%",
  tabStyle = "flat",
  border = false,
  style = {},
}) => {
  const [items, setItems] = useState<TabItemModel[]>(
    Array.isArray(children)
      ? children.map((_, index) => ({
          id: nanoid(),
          name: labels[index],
          selected: index === 0,
        }))
      : []
  );

  const tabsStyle = useMemo(
    () =>
      ({
        ...style,
        "--min-width": Number.isInteger(width) ? `${width}px` : width,
      } as CSSProperties),
    []
  );

  const handleTabSelection = useCallback((id) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        selected: id === item.id,
      }))
    );
  }, []);

  const rcTabsClass = useMemo(
    () =>
      classNames("rc-tabs", {
        "rc-tabs-border": border,
      }),
    []
  );

  const rcPanelsClass = useMemo(() => {
    return classNames("rc-tab-panels", {
      "rc-panel-border": tabStyle === "rounded",
    });
  }, []);

  return (
    <div className={rcTabsClass} style={tabsStyle} role="tab">
      <TabHeaders
        items={items}
        handleTabSelection={handleTabSelection}
        tabStyle={tabStyle}
      />
      <ul className={rcPanelsClass}>
        {items.map(
          ({ id, selected }, index) =>
            selected && (
              <li className="rc-tab-panel" key={id} role="tabpanel">
                {children[index]}
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export { Tabs };
