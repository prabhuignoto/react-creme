import classNames from "classnames";
import React, {
  startTransition,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronRightIcon } from "../../icons";
import { TabHead } from "./tab-head";
import { TabItemModel, TabsCommonModel } from "./tabs-model";
import "./tabs.scss";

export interface TabHeadersModel extends TabsCommonModel {
  items: TabItemModel[];
  handleTabSelection: (id: string) => void;
}

const TabHeaders: React.FunctionComponent<TabHeadersModel> = ({
  items,
  tabStyle,
  handleTabSelection,
}: TabHeadersModel) => {
  const tabHeadersRef = useRef<HTMLUListElement | null>(null);

  const [disableScrollRight, setDisableScrollRight] = useState(false);
  const [disableScrollLeft, setDisableScrollLeft] = useState(false);

  const [headerWidth, setHeaderWidth] = useState<number>(0);

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

      startTransition(() => {
        setDisableScrollLeft(newLeft === 0);
        setDisableScrollRight(false);
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    const tabHeaders = tabHeadersRef.current;
    if (tabHeaders) {
      const { scrollLeft, clientWidth, scrollWidth } = tabHeaders;
      const newLeft = scrollLeft + (clientWidth * 1) / 2;
      tabHeaders.scrollLeft = newLeft;

      startTransition(() => {
        setDisableScrollRight(newLeft + clientWidth >= scrollWidth);
        setDisableScrollLeft(false);
      });
    }
  }, []);

  const onHeadersRef = useCallback((node) => {
    tabHeadersRef.current = node;
    setHeaderWidth(node?.scrollWidth || 0);
  }, []);

  const tabHeadersWrapperClass = useMemo(() => {
    return classNames("rc-tab-headers-wrapper", {
      [`rc-tab-headers-wrapper-${tabStyle}`]: true,
    });
  }, []);

  return (
    <header className={tabHeadersWrapperClass}>
      <ul className="rc-tab-headers" ref={onHeadersRef}>
        {items.map(({ id, name, selected }) => (
          <TabHead
            key={id}
            id={id}
            name={name}
            selected={selected}
            handleTabSelection={handleTabSelection}
            tabStyle={tabStyle}
          />
        ))}
      </ul>
      {canShowControls && (
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
      )}
    </header>
  );
};

TabHeaders.displayName = "TabHeaders";

export { TabHeaders };
