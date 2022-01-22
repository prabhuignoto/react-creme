import classNames from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TabHeaders } from './tab-headers';
import { TabPanel } from './TabPanel';
import { TabItemProps, TabsProps } from './tabs-model';
import './tabs.scss';

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
          let selected = activeTab
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

  if (!items.current.some((item) => item.selected)) {
    const availItems = items.current.filter((item) => !item.disabled);

    if (availItems) {
      availItems[0].selected = true;
    }
  }

  // gets the tab content based on the active selection
  const getTabContent = useMemo(() => {
    if (activeTabId) {
      return items.current.filter(
        (item) => !item.disabled && item.id === activeTabId
      )[0].content;
    } else {
      return null;
    }
  }, [disabledTabs.length, activeTabId]);

  // collection of tab items
  const tabItems = useMemo(() => {
    return items.current
      .filter((tab) => !tab.disabled)
      .map(
        ({ id }) =>
          id === activeTabId && (
            <TabPanel key={id} id={id}>
              {getTabContent}
            </TabPanel>
          )
      );
  }, [activeTabId]);

  // handles the tab selection
  const handleTabSelection = useCallback((id) => {
    setActiveTabId(id);
  }, []);

  // styles and classes
  const tabsStyle = useMemo(
    () =>
      ({
        ...style,
        '--icons-color': iconsColor,
        '--min-width': Number.isInteger(width) ? `${width}px` : width,
      } as CSSProperties),
    []
  );

  const rcTabsClass = useMemo(
    () =>
      classNames('rc-tabs', {
        'rc-tabs-border': border,
      }),
    []
  );

  const rcPanelsClass = useMemo(() => {
    return classNames('rc-tab-panels', {
      'rc-panel-border': tabStyle === 'rounded',
    });
  }, []);

  useEffect(() => {
    const selected = items.current.find((item) => item.selected);

    if (selected) {
      setActiveTabId(selected.id);
    }
  }, []);

  const handleKeyUp = useCallback(
    (ev: React.KeyboardEvent) => {
      ev.stopPropagation();
      const key = ev.key;
      const _items = items.current;

      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        const activeTabIndex = _items.findIndex((item) => {
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
    <div className={rcTabsClass} style={tabsStyle} onKeyUp={handleKeyUp}>
      <TabHeaders
        items={items.current}
        handleTabSelection={handleTabSelection}
        tabStyle={tabStyle}
        focusable={focusable}
        icons={icons}
        activeTabId={activeTabId}
      />
      <div className={rcPanelsClass}>{tabItems}</div>
    </div>
  );
};

Tabs.displayName = 'Tabs';

export { Tabs };
