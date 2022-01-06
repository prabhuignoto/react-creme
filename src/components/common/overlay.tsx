import classNames from "classnames";
import React, {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import ResizeObserver from "resize-observer-polyfill";
import { CloseIcon } from "../../icons";
import { OverlayProps } from "./overlay-model";
import "./overlay.scss";
import { OverlayContext } from "./withOverlay";

const Overlay: React.FunctionComponent<OverlayProps> = ({
  children,
  onClose,
  showCloseButton = false,
  placement,
  placementReference,
  backdropColor = "rgba(0, 0, 0, 0.5)",
  containedToParent = false,
  overlayAnimation = true,
}) => {
  const { align } = useContext(OverlayContext);
  const [hideOverlay, setHideOverlay] =
    React.useState<boolean>(overlayAnimation);
  const overlayWrapperClass = useMemo(() => {
    return classNames(["rc-overlay-wrapper"], {
      "rc-overlay-contained": containedToParent,
      "rc-overlay-hide": hideOverlay,
    });
  }, [hideOverlay]);

  const overlayContentRef = useRef<HTMLDivElement | null>(null);

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
    if (placementReference?.current && placement && overlayContentRef.current) {
      const child = placementReference?.current.firstChild as HTMLElement;
      const { top, left, right } = child.getBoundingClientRect();
      const positionRight = right - overlayContentRef.current.offsetWidth;
      return {
        [placement === "top" ? "bottom" : "top"]: `${top + contentHeight}px`,
        left: `${align === "left" ? left : positionRight}px`,
        position: "absolute",
        pointerEvents: "all",
      } as CSSProperties;
    }
  }, [
    placementReference,
    placement,
    contentHeight,
    scrollPosition,
    overlayContentRef,
  ]);

  const handleClose = (ev: React.MouseEvent | KeyboardEvent) => {
    const canClose = (ev.target as HTMLElement).classList.contains(
      "rc-overlay-wrapper"
    );

    if (!canClose) {
      return;
    }

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
    setHideOverlay(true);
  };

  const handleWindowScroll = useCallback(
    () => setScrollPosition(window.scrollY),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    window.addEventListener("keyup", handleClose);

    if (overlayAnimation) {
      setTimeout(() => {
        setHideOverlay(false);
      }, 100);
    }

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
        <div
          style={placementStyle}
          className="rc-overlay-content-wrapper"
          ref={overlayContentRef}
        >
          {children}
        </div>
      ) : (
        children
      )}
      {showCloseButton && (
        <span className={`rc-overlay-close-btn`} onClick={onClose}>
          <CloseIcon />
        </span>
      )}
    </div>
  );
};

export { Overlay };
