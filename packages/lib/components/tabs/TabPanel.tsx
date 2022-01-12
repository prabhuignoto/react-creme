import classNames from "classnames";
import React, { useMemo } from "react";

export interface TabPanelProps {
  children?: React.ReactNode;
  disabled?: boolean;
  id?: string;
}

const TabPanel: React.FunctionComponent<TabPanelProps> = ({
  children,
  disabled,
  id,
}: TabPanelProps) => {
  const tabPanelClass = useMemo(() => {
    return classNames("rc-tab-panel", { "rc-tab-panel-disabled": disabled });
  }, []);
  return (
    <div
      className={tabPanelClass}
      role="tabpanel"
      id={`rc-tab-panel-${id}`}
      aria-labelledby={`rc-tab-${id}`}
    >
      {children}
    </div>
  );
};

TabPanel.displayName = "TabPanel";

export { TabPanel };
