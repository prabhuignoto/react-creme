import classNames from 'classnames';
import React, { useMemo } from 'react';
import { TabPanelProps } from './tabs-model';
import styles from './tabs.module.scss';

/**
 * TabPanel Component
 *    @property {React.ReactNode} children - The content of the tab panel.
 *    @property {boolean} disabled - Whether the tab panel is disabled.
 *    @property {string} id - The unique identifier for the tab panel.
 * @returns {JSX.Element} The TabPanel component.
 */
const TabPanel: React.FunctionComponent<TabPanelProps> = ({
  children,
  disabled,
  id,
}: TabPanelProps) => {
  // Define the class for the tab panel, adding the 'disabled' class if necessary
  const tabPanelClass = useMemo(() => {
    return classNames(styles.tab_panel, {
      [styles.disabled]: disabled,
    });
  }, [disabled]);

  // Render the tab panel with the appropriate ARIA roles and properties
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
