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
  onClose,
  showCloseButton = false,
  placement,
  placementReference,
  backdropColor = "rgba(0, 0, 0, 0.5)",
  containedToParent = false,
}) => {
  const overlayWrapperClass = useMemo(() => {
    return classNames(["rc-overlay-wrapper"], {
      "rc-overlay-contained": containedToParent,
    });
  }, []);

  const [contentHeight, setContentHeight] = React.useState<number>(0);
  const [scrollPosition, setScrollPosition] = React.useState<number>(0);

  const observer = useRef<ResizeObserver>();

  if (placementReference?.current) {
    observer.current = new ResizeObserver((entries) => {
      const contentHeight = entries[0].contentRect.height;
      setContentHeight(contentHeight);
    });

    observer.current.observe(placementReference?.current as HTMLElement);
  }

  const placementStyle = useMemo(() => {
    if (placementReference?.current && placement) {
      const { top, left } = placementReference.current.getBoundingClientRect();
      return {
        [placement === "top" ? "bottom" : "top"]: `${top + contentHeight}px`,
        left: `${left}px`,
        position: "absolute",
        pointerEvents: "all",
      } as CSSProperties;
    }
  }, [placementReference, placement, contentHeight, scrollPosition]);

  const handleClose = (ev: React.MouseEvent | KeyboardEvent) => {
    if (ev instanceof KeyboardEvent) {
      if (ev.key === "Escape") {
        onClose && onClose();
      }
    } else {
      const classes = Array.from((ev.target as HTMLElement).classList);

      if (classes.some((cls) => cls === `rc-overlay-wrapper`)) {
        onClose && onClose();
      }
    }
  };

  const handleWindowScroll = useCallback(
    () => setScrollPosition(window.scrollY),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    window.addEventListener("keyup", handleClose);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("keyup", handleClose);
      observer?.current?.disconnect();
    };
  }, []);

  const onRef = useCallback((node) => {
    if (node) {
      (node as HTMLElement).focus();
    }
  }, []);

  return (
    <div
      className={overlayWrapperClass}
      onClick={handleClose}
      data-testid="rc-overlay"
      ref={onRef}
      tabIndex={0}
      style={{ backgroundColor: backdropColor }}
    >
      {placement ? (
        <div style={placementStyle} className="rc-overlay-content-wrapper">
          {children}
        </div>
      ) : (
        children
      )}
      {showCloseButton && (
        <button className={`rc-overlay-close-btn`}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export { Overlay };
