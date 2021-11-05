import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ScrollPaneModel } from "./scroll-pane-model";
import "./scroll-pane.scss";

const ScrollPane: React.FunctionComponent<ScrollPaneModel> = ({
  children,
  width = 300,
  height = 500,
  scrollBarWidth = 10,
}) => {
  const [enableScrollY, setEnableScrollY] = useState(false);

  const scrollY = useRef(0);
  // const scrollX = useRef(0);

  const scrollBarHeight = useRef<number | null>(0);

  const paneRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const verticalScrollbar = useRef<HTMLDivElement | null>(null);

  const haltWindowScroll = useRef(false);

  // const [scrollbarHeight, setScrollbarHeight] = useState(0);

  const onRefInit = useCallback((node: HTMLDivElement) => {
    if (node) {
      paneRef.current = node;
      const content = node.querySelector(".scroll-pane-content");

      if (content) {
        const ele = node as HTMLElement;

        if (content.clientHeight > ele.clientHeight) {
          setEnableScrollY(true);
        }
      }
    }
  }, []);

  const handleScroll = useCallback((ev: React.WheelEvent) => {
    const pane = paneRef?.current;
    const content = contentRef?.current;
    const handle = verticalScrollbar?.current;

    if (!pane || !content || !handle) {
      return;
    }

    if (ev.deltaY < 0 && scrollY.current > 0) {
      scrollY.current -= Math.round(0.2 * pane.clientHeight);
    } else if (
      ev.deltaY > 0 &&
      scrollY.current +
        Math.round(0.2 * pane.clientHeight) +
        pane.clientHeight <=
        content.clientHeight
    ) {
      scrollY.current += Math.round(0.2 * pane.clientHeight);
    }

    content.style.top = `-${scrollY.current}px`;
    handle.style.top = `${
      (scrollY.current / (content.clientHeight - pane.clientHeight)) *
      (pane.clientHeight - handle.clientHeight)
    }px`;
  }, []);

  const paneStyle = useMemo(() => {
    return {
      width: `${width}px`,
      height: `${height}px`,
    };
  }, [width, height]);

  const onVerticalScrollbarInit = useCallback(
    (node: HTMLDivElement) => {
      const pane = paneRef?.current;
      const content = contentRef?.current;

      if (node && pane && content) {
        verticalScrollbar.current = node;

        const handle = node as HTMLElement;

        const diff = content.clientHeight - pane.clientHeight;
        const percent = 1 - diff / content.clientHeight;

        const scrollHeight = Math.floor(percent * pane.clientHeight);

        handle.style.height = `${scrollHeight}px`;
        handle.style.width = `${scrollBarWidth}px`;

        scrollBarHeight.current = scrollHeight;
      }
    },
    [paneRef, contentRef]
  );

  const onContentRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      contentRef.current = node;
    }
  }, []);

  const handleWindowScroll = useCallback((ev) => {
    if (haltWindowScroll.current) {
      ev.preventDefault();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("wheel", handleWindowScroll, {
      passive: false,
    });

    return () => {
      document.removeEventListener("wheel", handleWindowScroll);
    };
  }, []);

  return (
    <div
      className="scroll-pane-wrapper"
      ref={onRefInit}
      onWheel={handleScroll}
      style={paneStyle}
      onMouseOver={() => {
        haltWindowScroll.current = true;
      }}
      onMouseOut={() => {
        haltWindowScroll.current = false;
      }}
    >
      {enableScrollY && (
        <span
          className="scrollbar-handle scrollbar-handle-vertical"
          ref={onVerticalScrollbarInit}
        ></span>
      )}
      <div className="scroll-pane-content" ref={onContentRef}>
        {children}
      </div>
    </div>
  );
};

export { ScrollPane };
