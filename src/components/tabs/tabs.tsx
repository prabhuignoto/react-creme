import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import "./tabs.scss";

export interface TabsModel {
  children: ReactNode[];
  labels: string[];
  width?: number;
}

export interface TabItemModel {
  name: string;
  id?: string;
  selected?: boolean;
}

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
      <ul className="rc-tab-headers">
        {items.map(({ id, name, selected }) => (
          <li key={id} onClick={() => handleTabSelection(id)}>
            <span
              className={classNames("rc-tab-header-label", {
                "rc-tab-header-selected": selected,
              })}
            >
              {name}
            </span>
          </li>
        ))}
      </ul>
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
