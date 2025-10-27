import { ChevronRightIcon } from '@icons';
import classNames from 'classnames';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useKeyNavigation } from '../common/effects/useKeyNavigation';
import { isDark } from '../common/utils';
import { TabHead } from './tab-head';
import styles from './tab-header.module.scss';
import { TabHeadersProps } from './tabs-model';

const TabHeaders: React.FunctionComponent<TabHeadersProps> = ({
  focusable,
  handleTabSelection,
  icons,
  items,
  tabStyle = 'flat',
  activeTabId,
  size,
}: TabHeadersProps) => {
  const tabHeadersRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [hasFocus, setHasFocus] = useState(false);

  const [disableScrollRight, setDisableScrollRight] = useState(false);
  const [disableScrollLeft, setDisableScrollLeft] = useState(false);

  const [headerWidth, setHeaderWidth] = useState<number>(0);

  const [scrollLeftCurrent, setScrollLeftCurrent] = useState<{
    dir: 'left' | 'right';
    value: number;
  }>({ dir: 'left', value: 0 });

  const isDarkMode = useMemo(() => isDark(), []);

  // Filter out disabled tabs for keyboard navigation
  const enabledItems = useMemo(
    () => items.filter(item => !item.disabled),
    [items]
  );

  // Find current active index in enabled items
  const activeIndex = useMemo(
    () => enabledItems.findIndex(item => item.id === activeTabId),
    [enabledItems, activeTabId]
  );

  // Keyboard navigation callback
  const handleNavigate = useCallback(
    (index: number) => {
      const selectedTab = enabledItems[index];
      if (selectedTab) {
        handleTabSelection(selectedTab.id);
        // Focus the tab button programmatically
        const tabIndex = items.findIndex(item => item.id === selectedTab.id);
        tabRefs.current[tabIndex]?.focus();
      }
    },
    [enabledItems, items, handleTabSelection]
  );

  // Keyboard navigation using existing hook (follows Breadcrumb pattern)
  useKeyNavigation(
    tabHeadersRef as React.RefObject<HTMLElement>,
    activeIndex,
    enabledItems.length,
    {
      orientation: 'horizontal',
      wrap: true, // Wrap from last to first and vice versa
      onNavigate: handleNavigate,
    },
    focusable
  );

  // show or hide scroll buttons
  const canShowControls = useMemo(() => {
    if (tabHeadersRef.current) {
      const { clientWidth, scrollWidth } = tabHeadersRef.current;

      return clientWidth < scrollWidth;
    }
  }, [headerWidth]);

  // scroll left and right handlers
  const scrollLeft = useCallback(() => {
    const tabHeaders = tabHeadersRef.current;
    if (tabHeaders) {
      const { scrollLeft, clientWidth } = tabHeaders;
      const newLeft = Math.max(0, scrollLeft - (clientWidth * 1) / 2);

      tabHeaders.scrollLeft = newLeft;
      setScrollLeftCurrent({
        dir: 'left',
        value: newLeft,
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    const tabHeaders = tabHeadersRef.current;
    if (tabHeaders) {
      const { scrollLeft, clientWidth } = tabHeaders;
      const newLeft = scrollLeft + (clientWidth * 1) / 2;
      tabHeaders.scrollLeft = newLeft;
      setScrollLeftCurrent({
        dir: 'right',
        value: newLeft,
      });
    }
  }, []);

  const onHeadersRef = useCallback((node: HTMLDivElement | null) => {
    tabHeadersRef.current = node;
    setHeaderWidth(node?.scrollWidth || 0);
  }, []);

  const onFocus = useCallback(() => {
    if (!hasFocus) {
      setHasFocus(true);
    }
  }, [hasFocus]);

  // style classes
  const tabHeadersWrapperClass = useMemo(() => {
    return classNames(styles.tab_headers_wrapper, {
      [styles[`tab_headers_${tabStyle}`]]: true,
      [styles.tab_headers_dark]: isDarkMode,
      [styles[tabStyle]]: true,
    });
  }, [isDarkMode]);

  const tabHeadersClass = useMemo(() => {
    return classNames(styles.tab_headers, {
      [styles[tabStyle]]: true,
    });
  }, []);

  const tabHeaderControl = useMemo(() => {
    return classNames(styles.tab_header_control, {
      [styles[`tab_header_control_${tabStyle}`]]: true,
      [styles.tab_head_icon]: icons?.length,
    });
  }, [icons?.length]);

  // side effects
  useEffect(() => {
    if (scrollLeftCurrent.value >= 0 && tabHeadersRef.current) {
      const { dir, value } = scrollLeftCurrent;
      const ref = tabHeadersRef.current;

      if (dir === 'left') {
        setDisableScrollLeft(value === 0);
        setDisableScrollRight(false);
      }

      if (dir === 'right') {
        const { clientWidth, scrollWidth } = ref;
        setDisableScrollRight(value + clientWidth >= scrollWidth);
        setDisableScrollLeft(false);
      }
    }
  }, [scrollLeftCurrent.value]);

  return (
    <header className={tabHeadersWrapperClass}>
      <div
        className={tabHeadersClass}
        ref={onHeadersRef}
        role="tablist"
        aria-orientation="horizontal"
        tabIndex={-1}
      >
        {items.map(({ id, name, disabled }, index) => (
          <TabHead
            key={id}
            id={id}
            name={name}
            selected={id === activeTabId}
            handleTabSelection={handleTabSelection}
            tabStyle={tabStyle}
            disabled={disabled}
            focusable={focusable}
            icon={icons?.[index]}
            onFocus={onFocus}
            parentHasFocus={hasFocus}
            size={size}
            ref={el => { tabRefs.current[index] = el; }}
          />
        ))}
      </div>
      {canShowControls ? (
        <div className={tabHeaderControl}>
          <button
            type="button"
            className={classNames(
              styles.tab_header_btn,
              styles.tab_header_btn_left,
              {
                [styles.tab_header_btn_disabled]: disableScrollLeft,
                [styles.dark]: isDarkMode,
              }
            )}
            aria-label="scroll left"
            onClick={scrollLeft}
            disabled={disableScrollLeft}
          >
            <ChevronRightIcon />
          </button>
          <button
            type="button"
            className={classNames(styles.tab_header_btn, {
              [styles.tab_header_btn_disabled]: disableScrollRight,
              [styles.dark]: isDarkMode,
            })}
            aria-label="scroll right"
            onClick={scrollRight}
            disabled={disableScrollRight}
          >
            <ChevronRightIcon />
          </button>
        </div>
      ) : null}
    </header>
  );
};

TabHeaders.displayName = 'TabHeaders';

export { TabHeaders };
