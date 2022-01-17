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
  labels,
  style = {},
  tabStyle = 'flat',
  width = '100%',
  focusable = false,
  iconsColor,
  icons,
}) => {
  const selectionStart = useRef<number>(-1);

  const [items, setItems] = useState<TabItemProps[]>(
    Array.isArray(children)
      ? children.map((_, index) => {
          const disabled = disabledTabs.includes(labels[index]);
          let selected = index === 0 && !disabled;

          if (selected) {
            selectionStart.current = index;
          } else if (index > 0 && selectionStart.current === -1 && !disabled) {
            selectionStart.current = index;
            selected = true;
          }

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

  const tabsStyle = useMemo(
    () =>
      ({
        ...style,
        '--icons-color': iconsColor,
        '--min-width': Number.isInteger(width) ? `${width}px` : width,
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

  const rcTabsClass = useMemo(
    () =>
      classNames('rc-tabs', {
        'rc-tabs-border': border,
      }),
    []
  );

  const getTabContent = useCallback(
    (index) => {
      return items.filter((item) => !item.disabled)[index].content;
    },
    [disabledTabs.length]
  );

  const rcPanelsClass = useMemo(() => {
    return classNames('rc-tab-panels', {
      'rc-panel-border': tabStyle === 'rounded',
    });
  }, []);

  useEffect(() => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        disabled: disabledTabs.includes(item.name),
      }))
    );
  }, [JSON.stringify(disabledTabs)]);

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
