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
import { TabHeaders } from './tab-headers';
import { TabPanel } from './TabPanel';
import { TabItemProps, TabsProps } from './tabs-model';
import './tabs.scss';

const Tabs: React.FunctionComponent<TabsProps> = ({
  border = false,
  children,
  disabledTabs = [],
  focusable = false,
  icons,
  iconsColor,
  labels,
  style = {},
  tabStyle = 'flat',
  width = '100%',
  activeTab,
}) => {
  const selectionStart = useRef<number>(-1);

  // state of tabs
  const [items, setItems] = useState<TabItemProps[]>(
    Array.isArray(children)
      ? children.map((_, index) => {
          // check if the tab is disabled
          const disabled = disabledTabs.includes(labels[index]);

          // check if the tab can be selected on load
          let selected = activeTab
            ? activeTab === labels[index]
            : index === 0 && !disabled;

          if (selected) {
            selectionStart.current = index;
          }

          // if (selected) {
          // } else if (index > 0 && selectionStart.current === -1 && !disabled) {
          //   selectionStart.current = index;
          //   selected = true;
          // }

          return {
            content: children[index],
            disabled: disabled,
            id: nanoid(),
            name: labels[index],
            selected,
          };
        })
      : []
  );

  // handles the tab selection
  const handleTabSelection = useCallback((id) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        selected: id === item.id,
      }))
    );
  }, []);

  // retrieves the content of the selected tab
  const getTabContent = useCallback(
    (index) => {
      return items.filter((item) => !item.disabled)[index].content;
    },
    [disabledTabs.length]
  );

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

  // side effects
  useEffect(() => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        disabled: disabledTabs.includes(item.name),
      }))
    );
  }, [disabledTabs.length]);

  return (
    <div className={rcTabsClass} style={tabsStyle}>
      <TabHeaders
        items={items}
        handleTabSelection={handleTabSelection}
        tabStyle={tabStyle}
        focusable={focusable}
        icons={icons}
      />
      <div className={rcPanelsClass}>
        {items
          .filter((tab) => !tab.disabled)
          .map(
            ({ id, selected }, index) =>
              selected && (
                <TabPanel key={id} id={id}>
                  {getTabContent(index)}
                </TabPanel>
              )
          )}
      </div>
    </div>
  );
};

export { Tabs };
