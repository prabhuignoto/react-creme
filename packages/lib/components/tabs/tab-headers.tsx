import classNames from 'classnames';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChevronRightIcon } from '../../icons';
import { TabHead } from './tab-head';
import './tab-header.scss';
import { TabHeadersProps } from './tabs-model';
import './tabs.scss';

const TabHeaders: React.FunctionComponent<TabHeadersProps> = ({
  items,
  tabStyle,
  handleTabSelection,
  focusable,
  icons,
}: TabHeadersProps) => {
  const tabHeadersRef = useRef<HTMLUListElement | null>(null);

  const [disableScrollRight, setDisableScrollRight] = useState(false);
  const [disableScrollLeft, setDisableScrollLeft] = useState(false);

  const [headerWidth, setHeaderWidth] = useState<number>(0);

  const [scrollLeftCurrent, setScrollLeftCurrent] = useState<{
    dir: 'left' | 'right';
    value: number;
  }>({ dir: 'left', value: 0 });

  const canShowControls = useMemo(() => {
    if (tabHeadersRef.current) {
      const { clientWidth, scrollWidth } =
        tabHeadersRef?.current as HTMLElement;

      return clientWidth < scrollWidth;
    }
  }, [headerWidth]);

  const scrollLeft = useCallback(() => {
    const tabHeaders = tabHeadersRef.current;
    if (tabHeaders) {
      const { scrollLeft, clientWidth } = tabHeaders;
      const newLeft = Math.max(0, scrollLeft - (clientWidth * 1) / 2);

      tabHeaders.scrollLeft = newLeft;
      setScrollLeftCurrent({ dir: 'left', value: newLeft });
    }
  }, []);

  const scrollRight = useCallback(() => {
    const tabHeaders = tabHeadersRef.current;
    if (tabHeaders) {
      const { scrollLeft, clientWidth } = tabHeaders;
      const newLeft = scrollLeft + (clientWidth * 1) / 2;
      tabHeaders.scrollLeft = newLeft;
      setScrollLeftCurrent({ dir: 'right', value: newLeft });
    }
  }, []);

  const onHeadersRef = useCallback((node) => {
    tabHeadersRef.current = node;
    setHeaderWidth(node?.scrollWidth || 0);
  }, []);

  const tabHeadersWrapperClass = useMemo(() => {
    return classNames('rc-tab-headers-wrapper', {
      [`rc-tab-headers-wrapper-${tabStyle}`]: true,
    });
  }, []);

  const tabHeadersClass = useMemo(() => {
    return classNames('rc-tab-headers', {
      [`rc-tab-headers-${tabStyle}`]: true,
    });
  }, []);

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
      <div className={tabHeadersClass} ref={onHeadersRef} role="tablist">
        {items.map(({ id, name, selected, disabled }, index) => (
          <TabHead
            key={id}
            id={id}
            name={name}
            selected={selected}
            handleTabSelection={handleTabSelection}
            tabStyle={tabStyle}
            disabled={disabled}
            focusable={focusable}
            icon={icons?.[index]}
          />
        ))}
      </div>
      {canShowControls ? (
        <div className="rc-tab-headers-control">
          {!disableScrollLeft && (
            <span
              className="rc-tab-header-btn rc-tab-header-btn-left"
              role="button"
              onClick={scrollLeft}
            >
              <ChevronRightIcon />
            </span>
          )}
          {!disableScrollRight && (
            <span
              className="rc-tab-header-btn"
              role="button"
              onClick={scrollRight}
            >
              <ChevronRightIcon />
            </span>
          )}
        </div>
      ) : null}
    </header>
  );
};

TabHeaders.displayName = 'TabHeaders';

export { TabHeaders };
