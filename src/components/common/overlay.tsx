import classNames from "classnames";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import ResizeObserver from "resize-observer-polyfill";
import { CloseIcon } from "../../icons";
import { OverlayProps } from "./overlay-model";
import "./overlay.scss";

const Overlay: React.FunctionComponent<OverlayProps> = ({
  children,
  close,
  onClose,
  showCloseButton = false,
  disableAnimation = false,
  disableBackdrop,
  placement,
  placementReference,
}) => {
  const overlayWrapperClass = useMemo(() => {
    return classNames([
      `rc-overlay-wrapper`,
      disableBackdrop ? "disable-backdrop" : "",
    ]);
  }, []);

  const [contentHeight, setContentHeight] = React.useState<number>(0);
  const [scrollPosition, setScrollPosition] = React.useState<number>(0);

  const observer = useRef<ResizeObserver>();

  observer.current = new ResizeObserver((entries) => {
    const contentHeight = entries[0].contentRect.height;
    setContentHeight(contentHeight);
  });

  observer.current.observe(placementReference?.current as HTMLElement);

  const placementStyle = useMemo(() => {
    if (placementReference?.current && placement) {
      const { top, left } = placementReference.current.getBoundingClientRect();
      return {
        [placement === "top" ? "bottom" : "top"]: `${top + contentHeight}px`,
        left: `${left}px`,
        position: "absolute",
      } as CSSProperties;
    }
  }, [placementReference, placement, contentHeight, scrollPosition]);

  const handleClose = (ev: React.MouseEvent) => {
    const classes = Array.from((ev.target as HTMLElement).classList);

    if (classes.some((cls) => cls === `rc-overlay-wrapper`)) {
      onClose && onClose();
    }
  };

  const handleWindowScroll = useCallback(() => {
    setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      observer?.current?.disconnect();
    };
  }, []);

  return (
    <div
      className={overlayWrapperClass}
      onClick={handleClose}
      data-testid="rc-overlay"
    >
      {placement ? <div style={placementStyle}>{children}</div> : children}
      {showCloseButton && (
        <button className={`rc-overlay-close-btn`}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export { Overlay };
