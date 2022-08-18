import classNames from 'classnames';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChevronRightIcon } from '@common/icons';
import { isDark } from '@common';
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
  const [hasFocus, setHasFocus] = useState(false);

  const [disableScrollRight, setDisableScrollRight] = useState(false);
  const [disableScrollLeft, setDisableScrollLeft] = useState(false);

  const [headerWidth, setHeaderWidth] = useState<number>(0);

  const [scrollLeftCurrent, setScrollLeftCurrent] = useState<{
    dir: 'left' | 'right';
    value: number;
  }>({ dir: 'left', value: 0 });

  const isDarkMode = useMemo(() => isDark(), []);

  // show or hide scroll buttons
  const canShowControls = useMemo(() => {
    if (tabHeadersRef.current) {
      const { clientWidth, scrollWidth } =
        tabHeadersRef?.current as HTMLElement;

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
        // onKeyDown={handleKeyUp}
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
          />
        ))}
      </div>
      {canShowControls ? (
        <div className={tabHeaderControl}>
          <span
            className={classNames(
              styles.tab_header_btn,
              styles.tab_header_btn_left,
              {
                [styles.tab_header_btn_disabled]: disableScrollLeft,
                [styles.dark]: isDarkMode,
              }
            )}
            role="button"
            aria-label="scroll left"
            onClick={scrollLeft}
          >
            <ChevronRightIcon />
          </span>
          <span
            className={classNames(styles.tab_header_btn, {
              [styles.tab_header_btn_disabled]: disableScrollRight,
              [styles.dark]: isDarkMode,
            })}
            role="button"
            aria-label="scroll right"
            onClick={scrollRight}
          >
            <ChevronRightIcon />
          </span>
        </div>
      ) : null}
    </header>
  );
};

TabHeaders.displayName = 'TabHeaders';

export { TabHeaders };
