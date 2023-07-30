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
import { TabItemProps, TabsProps } from './tabs-model';
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
  // useRef hook to store the index of the selected tab
  const selectionStart = useRef<number>(-1);
  // useState hook to store the ID of the active tab
  const [activeTabId, setActiveTabId] = useState<string>('');

  // Prepare the data for the tabs
  const items = useRef<TabItemProps[]>(
    Array.isArray(children)
      ? children.map((_, index) => {
          // Check if the tab is disabled
          const disabled = disabledTabs.includes(labels[index]);
          // Check if the tab can be selected on load
          const selected = activeTab
            ? activeTab === labels[index]
            : index === 0 && !disabled;
          const _id = nanoid();

          if (selected) {
            selectionStart.current = index;
          }

          return {
            content: children[index],
            disabled: disabled,
            id: _id,
            name: labels[index],
            selected,
          };
        })
      : []
  );

  // If no tab is selected, select the first available tab
  if (!items.current.some(item => item.selected)) {
    const availItems = items.current.filter(item => !item.disabled);
    if (availItems.length > 0) {
      availItems[0].selected = true;
    }
  }

  // Gets the tab content based on the active selection
  const getTabContent = useMemo(() => {
    const activeTab = items.current.find(item => item.id === activeTabId);
    return activeTab ? activeTab.content : null;
  }, [activeTabId]);

  // Collection of tab items
  const tabItems = useMemo(() => {
    return items.current
      .filter(tab => !tab.disabled)
      .map(
        ({ id }) =>
          id === activeTabId && (
            <TabPanel key={id} id={id}>
              {getTabContent}
            </TabPanel>
          )
      );
  }, [activeTabId, getTabContent]);

  // Visible tabs
  const visibleTabs = useMemo(() => {
    return items.current.filter(item => labels.includes(item.name));
  }, [labels]);

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
  const isDarkMode = useMemo(() => isDark(), []);
  const rcPanelsClass = useMemo(
    () =>
      classNames(styles.tab_panels, {
        [styles.panel_border]: tabStyle === 'rounded',
        [styles.dark]: isDarkMode,
        [styles[tabStyle]]: true,
      }),
    [tabStyle, isDarkMode]
  );

  // Set the active tab ID on initial render
  useEffect(() => {
    const selected = items.current.find(item => item.selected);
    if (selected) {
      setActiveTabId(selected.id);
    }
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent) => {
      const key = ev.key;
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        ev.stopPropagation();
        ev.preventDefault();

        const _items = items.current;
        const activeTabIndex = _items.findIndex(
          item => item.id === activeTabId
        );

        if (key === 'ArrowLeft' && activeTabIndex > 0) {
          handleTabSelection(_items[activeTabIndex - 1].id);
        } else if (key === 'ArrowRight' && activeTabIndex < _items.length - 1) {
          handleTabSelection(_items[activeTabIndex + 1].id);
        }
      }
    },
    [activeTabId, handleTabSelection]
  );

  // Render the Tabs component
  return (
    <div className={rcTabsClass} style={tabsStyle} onKeyDown={handleKeyDown}>
      <TabHeaders
        items={visibleTabs}
        handleTabSelection={handleTabSelection}
        tabStyle={tabStyle}
        focusable={focusable}
        icons={icons}
        activeTabId={activeTabId}
        size={size}
      />
      <div className={rcPanelsClass}>{tabItems}</div>
    </div>
  );
};

Tabs.displayName = 'Tabs';

export { Tabs };
