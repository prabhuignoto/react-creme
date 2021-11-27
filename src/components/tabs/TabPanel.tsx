import classNames from "classnames";
import React, { useMemo } from "react";

export interface TabPanelProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

const TabPanel: React.FunctionComponent<TabPanelProps> = React.memo(
  ({ children, disabled }: TabPanelProps) => {
    const tabPanelClass = useMemo(() => {
      return classNames("rc-tab-panel", { "rc-tab-panel-disabled": disabled });
    }, []);
    return (
      <li className={tabPanelClass} role="tabpanel">
        {children}
      </li>
    );
  }
);

TabPanel.displayName = "TabPanel";

export { TabPanel };
