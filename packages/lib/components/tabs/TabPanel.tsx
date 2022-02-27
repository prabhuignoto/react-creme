import classNames from 'classnames';
import React, { useMemo } from 'react';
import { TabPanelProps } from './tabs-model';
import styles from './tabs.module.scss';

const TabPanel: React.FunctionComponent<TabPanelProps> = ({
  children,
  disabled,
  id,
}: TabPanelProps) => {
  const tabPanelClass = useMemo(() => {
    return classNames(styles.tab_panel, {
      [styles.disabled]: disabled,
    });
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

TabPanel.displayName = 'TabPanel';

export { TabPanel };
