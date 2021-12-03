import classNames from "classnames";
import React, {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronRightIcon } from "../../icons";
import useSwipe from "../common/effects/useSwipe";
import { TabHead } from "./tab-head";
import "./tab-header.scss";
import { TabHeadersModel } from "./tabs-model";
import "./tabs.scss";

const TabHeaders: React.FunctionComponent<TabHeadersModel> = ({
  items,
  tabStyle,
  handleTabSelection,
  focusable,
  enableSwipe,
}: TabHeadersModel) => {
  const tabHeadersRef = useRef<HTMLUListElement | null>(null);

  const [disableScrollRight, setDisableScrollRight] = useState(false);
  const [disableScrollLeft, setDisableScrollLeft] = useState(false);

  const [headerWidth, setHeaderWidth] = useState<number>(0);

  const [scrollLeftCurrent, setScrollLeftCurrent] = useState<{
    dir: "left" | "right";
    value: number;
  }>({ dir: "left", value: 0 });

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
      setScrollLeftCurrent({ dir: "left", value: newLeft });

      // startTransition(() => {
      //   setDisableScrollLeft(newLeft === 0);
      //   setDisableScrollRight(false);
      // });
    }
  }, []);

  const scrollRight = useCallback(() => {
    const tabHeaders = tabHeadersRef.current;
    if (tabHeaders) {
      const { scrollLeft, clientWidth } = tabHeaders;
      const newLeft = scrollLeft + (clientWidth * 1) / 2;
      tabHeaders.scrollLeft = newLeft;
      setScrollLeftCurrent({ dir: "right", value: newLeft });

      // startTransition(() => {
      //   setDisableScrollRight(newLeft + clientWidth >= scrollWidth);
      //   setDisableScrollLeft(false);
      // });
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

  useEffect(() => {
    if (scrollLeftCurrent.value && tabHeadersRef.current) {
      const { dir, value } = scrollLeftCurrent;
      const ref = tabHeadersRef.current;

      if (dir === "left") {
        startTransition(() => {
          setDisableScrollLeft(value === 0);
          setDisableScrollRight(false);
        });
      }

      if (dir === "right") {
        const { clientWidth, scrollWidth } = ref;
        startTransition(() => {
          setDisableScrollRight(value + clientWidth >= scrollWidth);
          setDisableScrollLeft(false);
        });
      }
    }
  }, [scrollLeftCurrent.value]);

  if (enableSwipe) {
    const swipeState = useSwipe(tabHeadersRef);

    useEffect(() => {
      if (swipeState.offset >= 0) {
        if (swipeState.dir === "LEFT") {
          scrollRight();
        } else if (swipeState.dir === "RIGHT") {
          scrollLeft();
        }
      }
    }, [swipeState]);
  }

  return (
    <header className={tabHeadersWrapperClass}>
      <ul className="rc-tab-headers" ref={onHeadersRef}>
        {items.map(({ id, name, selected, disabled }) => (
          <TabHead
            key={id}
            id={id}
            name={name}
            selected={selected}
            handleTabSelection={handleTabSelection}
            tabStyle={tabStyle}
            disabled={disabled}
            focusable={focusable}
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
