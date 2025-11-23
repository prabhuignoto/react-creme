// Importing necessary libraries and components
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { isDark } from '../common/utils';
import { TabHeaders } from './tab-headers';
import { TabPanel } from './TabPanel';
import { TabsProps } from './tabs-model';
import styles from './tabs.module.scss';

/**
 * Tabs Component
 *    @property {boolean} border - Whether to show a border around the tabs (default: false).
 *    @property {React.ReactNode[]} children - The content of each tab.
 *    @property {string[]} disabledTabs - The labels of the tabs to be disabled.
 *    @property {boolean} focusable - Whether the tabs can be focused (default: true).
 *    @property {React.ReactNode[]} icons - The icons for each tab.
 *    @property {string} iconsColor - The color of the icons.
 *    @property {string[]} labels - The labels for each tab.
 *    @property {CSSProperties} style - The style of the tabs.
 *    @property {string} tabStyle - The style of the tabs ('flat' or 'rounded', default: 'flat').
 *    @property {string | number} width - The width of the tabs (default: '100%').
 *    @property {string} activeTab - The label of the active tab.
 *    @property {string} size - The size of the tabs ('sm', 'md', or 'lg', default: 'sm').
 *    @property {number} minHeight - The minimum height of the tabs (default: 200).
 * @returns {JSX.Element} The Tabs component.
 */
const Tabs: React.FunctionComponent<TabsProps> = ({
  border = false,
  children,
  disabledTabs = [],
  focusable = true,
  icons,
  iconsColor,
  labels,
  style = {},
  tabStyle = 'flat',
  width = '100%',
  activeTab,
  size = 'sm',
  minHeight = 200,
}) => {
  // useState hook to store the ID of the active tab
  const [activeTabId, setActiveTabId] = useState<string>('');

  // Maintain stable IDs for tabs across renders using a ref
  const idMapRef = useRef<Map<string, string>>(new Map());

  // Get or create a stable ID for a given label
  const getStableId = useCallback((label: string) => {
    if (!idMapRef.current.has(label)) {
      idMapRef.current.set(label, nanoid());
    }
    return idMapRef.current.get(label)!;
  }, []);

  // Prepare the data for the tabs (using useMemo to avoid props-to-state anti-pattern)
  const items = useMemo(() => {
    if (!Array.isArray(children)) {
      return [];
    }

    const generatedItems = children.map((_, index) => {
      // Check if the tab is disabled
      const label = labels[index] || '';
      const disabled = disabledTabs.includes(label);
      // Check if the tab can be selected on load
      const selected = activeTab
        ? activeTab === label
        : index === 0 && !disabled;

      return {
        content: children[index],
        disabled,
        id: getStableId(label),
        name: label,
        selected,
      };
    });

    // If no tab is selected, select the first available tab
    if (!generatedItems.some(item => item.selected)) {
      const availItems = generatedItems.filter(item => !item.disabled);
      if (availItems.length > 0 && availItems[0]) {
        availItems[0].selected = true;
      }
    }

    return generatedItems;
  }, [children, labels, disabledTabs, activeTab, getStableId]);

  // Gets the tab content based on the active selection
  const getTabContent = useMemo(() => {
    const activeTab = items.find(item => item.id === activeTabId);
    return activeTab ? activeTab.content : null;
  }, [items, activeTabId]);

  // Collection of tab items
  const tabItems = useMemo(() => {
    return items
      .filter(tab => !tab.disabled && tab.id === activeTabId)
      .map(({ id }) => (
        <TabPanel key={id} id={id}>
          {getTabContent}
        </TabPanel>
      ));
  }, [items, activeTabId, getTabContent]);

  // Visible tabs
  const visibleTabs = useMemo(() => {
    return items.filter(item => labels.includes(item.name));
  }, [items, labels]);

  // Handles the tab selection
  const handleTabSelection = useCallback((id: string) => {
    setActiveTabId(id);
  }, []);

  // Styles and classes
  const tabsStyle = useMemo(
    () =>
      ({
        ...style,
        '--icons-color': iconsColor,
        '--rc-tabs-min-height': `${minHeight}px`,
        '--rc-tabs-min-width': Number.isInteger(width) ? `${width}px` : width,
      }) as CSSProperties,
    [style, iconsColor, minHeight, width]
  );

  const rcTabsClass = useMemo(
    () => classNames(styles.tabs, { [styles.tab_border]: border }),
    [border]
  );
  const isDarkMode = isDark(); // Called once per render, doesn't change
  const rcPanelsClass = useMemo(
    () =>
      classNames(styles.tab_panels, {
        [styles.panel_border]: tabStyle === 'rounded',
        [styles.dark]: isDarkMode,
        [styles[tabStyle]]: true,
      }),
    [tabStyle, isDarkMode]
  );

  // Set the active tab ID on initial render only
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!hasInitialized.current) {
      const selected = items.find(item => item.selected);
      if (selected) {
        setActiveTabId(selected.id);
        hasInitialized.current = true;
      }
    }
  }, [items]);

  // Render the Tabs component
  return (
    <div className={rcTabsClass} style={tabsStyle}>
      <TabHeaders
        items={visibleTabs}
        handleTabSelection={handleTabSelection}
        tabStyle={tabStyle}
        focusable={focusable}
        {...(icons && { icons })}
        activeTabId={activeTabId}
        size={size}
      />
      <div className={rcPanelsClass}>{tabItems}</div>
    </div>
  );
};

Tabs.displayName = 'Tabs';

export { Tabs };
