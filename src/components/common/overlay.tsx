import classNames from "classnames";
import React, { CSSProperties, useMemo } from "react";
import { CloseIcon } from "../../icons";
import { OverlayProps } from "./overlay-model";

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
  const overlayClass = useMemo(
    () =>
      classNames([
        `rc-overlay-content-wrapper"`,
        !close ? `rc-overlay-content-open` : `rc-overlay-content-close`,
        disableAnimation ? "disable-anim" : "",
      ]),
    [close]
  );
  const overlayWrapperClass = useMemo(() => {
    return classNames([
      `rc-overlay-wrapper`,
      disableBackdrop ? "disable-backdrop" : "",
    ]);
  }, []);

  const placementStyle = useMemo(() => {
    if (placementReference?.current && placement) {
      const { top, left } = placementReference.current.getBoundingClientRect();
      return {
        [placement === "top" ? "bottom" : "top"]: `${top}px`,
        left: `${left}px`,
        position: "absolute",
      } as CSSProperties;
    }
  }, [placementReference, placement]);

  const handleClose = (ev: React.MouseEvent) => {
    const classes = Array.from((ev.target as HTMLElement).classList);

    if (classes.some((cls) => cls === `rc-overlay-wrapper`)) {
      onClose && onClose();
    }
  };

  return (
    <div
      className={overlayWrapperClass}
      onClick={handleClose}
      data-testid="rc-overlay"
    >
      <section className={overlayClass}>
        {placement ? <div style={placementStyle}>{children}</div> : children}
      </section>
      {showCloseButton && (
        <button className={`rc-overlay-close-btn`}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export { Overlay };
