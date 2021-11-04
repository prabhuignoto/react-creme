import React, {
  CSSProperties,
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
  scrollBarWidth = 15,
}) => {
  const [enableScrollY, setEnableScrollY] = useState(false);

  const [scrolledY, setScrolledY] = useState(0);

  const paneRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const verticalScrollbar = useRef<HTMLDivElement | null>(null);

  const haltWindowScroll = useRef(false);

  const [scrollbarHeight, setScrollbarHeight] = useState(0);

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

  const handleScroll = useCallback(
    (ev: React.WheelEvent) => {
      const pane = paneRef?.current;
      const content = contentRef?.current;

      if (!pane || !content) {
        return;
      }

      if (ev.deltaY < 0 && scrolledY > 0) {
        setScrolledY((prev) => prev - 30);
      } else if (
        ev.deltaY > 0 &&
        scrolledY + pane.offsetHeight <= content.offsetHeight
      ) {
        setScrolledY((prev) => prev + 30);
      }
    },
    [scrolledY]
  );

  const contentStyle = useMemo(() => {
    return {
      top: `${-scrolledY}px`,
    };
  }, [scrolledY]);

  const paneStyle = useMemo(() => {
    return {
      width: `${width}px`,
      height: `${height}px`,
    };
  }, [width, height]);

  const onVerticalScrollbarInit = useCallback(
    (node: HTMLDivElement) => {
      if (node && paneRef.current && contentRef.current) {
        // debugger;
        verticalScrollbar.current = node;

        const handle = node as HTMLElement;

        const diff =
          contentRef.current.clientHeight - paneRef.current.clientHeight;
        const percent = 1 - diff / contentRef.current.clientHeight;

        const scrollBarHeight = Math.round(
          percent * paneRef.current.clientHeight
        );

        handle.style.height = `${scrollbarHeight}px`;

        setScrollbarHeight(scrollBarHeight);
      }
    },
    [paneRef.current, contentRef]
  );

  const onContentRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      contentRef.current = node;
    }
  }, []);

  const scrollbarStyle = useMemo(() => {
    let top = 0;

    if (paneRef.current && contentRef.current) {
      const percent = scrolledY / contentRef.current.clientHeight;
      top = Math.round(percent * 100);
    }

    return {
      "--width": `${scrollBarWidth}px`,
      top: `${top}px`,
    } as CSSProperties;
  }, [scrolledY, paneRef.current, contentRef.current, scrollbarHeight]);

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
          style={scrollbarStyle}
          ref={onVerticalScrollbarInit}
        ></span>
      )}
      <div
        className="scroll-pane-content"
        style={contentStyle}
        ref={onContentRef}
      >
        {children}
      </div>
    </div>
  );
};

export { ScrollPane };
