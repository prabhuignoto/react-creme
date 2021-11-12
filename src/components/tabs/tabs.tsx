import { nanoid } from "nanoid";
import React, { CSSProperties, useCallback, useMemo, useState } from "react";
import { TabHead } from "./tab-head";
import { TabItemModel, TabsModel } from "./tabs-model";
import "./tabs.scss";

const Tabs: React.FunctionComponent<TabsModel> = ({
  children,
  labels,
  width = 300,
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
        "--min-width": `${width}px`,
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

  return (
    <div className="rc-tabs" style={tabsStyle} role="tab">
      <header className="rc-tab-headers-wrapper">
        <ul className="rc-tab-headers">
          {items.map(({ id, name, selected }) => (
            <TabHead
              key={id}
              id={id}
              name={name}
              selected={selected}
              handleTabSelection={handleTabSelection}
            />
          ))}
        </ul>
        <div className="rc-tab-headers-control"></div>
      </header>
      <ul className="rc-tab-panels">
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
