import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React from 'react';
import {
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
  const selectionStart = useRef<number>(-1);
  const [activeTabId, setActiveTabId] = useState<string>('');

  // prepare the data for the tabs
  const items = useRef<TabItemProps[]>(
    Array.isArray(children)
      ? children.map((_, index) => {
          // check if the tab is disabled
          const disabled = disabledTabs.includes(labels[index]);

          // check if the tab can be selected on load
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

  if (!items.current.some(item => item.selected)) {
    const availItems = items.current.filter(item => !item.disabled);

    if (availItems) {
      availItems[0].selected = true;
    }
  }

  // gets the tab content based on the active selection
  const getTabContent = useMemo(() => {
    if (activeTabId) {
      return items.current.filter(
        item => !item.disabled && item.id === activeTabId
      )[0].content;
    } else {
      return null;
    }
  }, [disabledTabs.length, activeTabId]);

  // collection of tab items
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
  }, [activeTabId]);

  const visibleTabs = useMemo(() => {
    return items.current.filter(item => labels.indexOf(item.name) > -1);
  }, [labels.length]);

  // handles the tab selection
  const handleTabSelection = useCallback((id: string) => {
    setActiveTabId(id);
  }, []);

  // styles and classes
  const tabsStyle = useMemo(
    () =>
      ({
        ...style,
        '--icons-color': iconsColor,
        '--rc-tabs-min-height': `${minHeight}px`,
        '--rc-tabs-min-width': Number.isInteger(width) ? `${width}px` : width,
      }) as CSSProperties,
    []
  );

  const rcTabsClass = useMemo(
    () =>
      classNames(styles.tabs, {
        [styles.tab_border]: border,
      }),
    []
  );

  const isDarkMode = useMemo(() => isDark(), []);

  const rcPanelsClass = useMemo(() => {
    return classNames(styles.tab_panels, {
      [styles.panel_border]: tabStyle === 'rounded',
      [styles.dark]: isDarkMode,
      [styles[tabStyle]]: true,
    });
  }, []);

  useEffect(() => {
    const selected = items.current.find(item => item.selected);

    if (selected) {
      setActiveTabId(selected.id);
    }
  }, []);

  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent) => {
      const key = ev.key;
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        ev.stopPropagation();
        ev.preventDefault();

        const _items = items.current;
        const activeTabIndex = _items.findIndex(item => {
          return item.id === activeTabId;
        });

        if (key === 'ArrowLeft' && activeTabIndex > 0) {
          handleTabSelection(_items[activeTabIndex - 1].id);
        } else if (key === 'ArrowRight' && activeTabIndex < _items.length - 1) {
          handleTabSelection(_items[activeTabIndex + 1].id);
        }
      }
    },
    [activeTabId]
  );

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
