import classNames from "classnames";
import React, { CSSProperties, useEffect, useMemo, useRef } from "react";
import { CloseIcon } from "../../icons";
import { Button } from "../button/button";
import { useCloseOnEscape } from "../common/effects/useCloseOnEsc";
import useSwipe from "../common/effects/useSwipe";
import { withOverlay } from "../common/withOverlay";
import { NotificationProps } from "./notification-model";
import "./notification.scss";

const NotificationComponent: React.FunctionComponent<NotificationProps> = ({
  autoClose,
  children,
  height = 150,
  isClosing,
  onClose,
  position,
  swipeToClose = true,
  title,
  width = 350,
  disableHeader = false,
}) => {
  const wrapperClass = classNames([
    "rc-notification-wrapper",
    {
      [`rc-notification-${position}-enter`]: !isClosing,
      [`rc-notification-${position}-exit`]: isClosing,
    },
  ]);

  const ref = useRef(null);

  useCloseOnEscape(() => {
    onClose && onClose();
  }, ref);

  const wrapperStyle = useMemo(
    () =>
      ({
        "--min-height": `${height}px`,
        "--min-width": `${width}px`,
      } as CSSProperties),
    []
  );

  useEffect(() => {
    if (autoClose) {
      setTimeout(() => onClose && onClose(), autoClose);
    }
  }, []);

  const canSwipeToClose = useMemo(() => {
    const xPosition = position?.split("-")[1] || "";
    const leftORight = xPosition === "left" || xPosition === "right";
    return swipeToClose && !autoClose && leftORight;
  }, [position, swipeToClose]);

  const state = swipeToClose ? useSwipe(ref, "medium") : null;

  useEffect(() => {
    if (state) {
      const xPosition = position?.split("-")[1] || "";
      if (state.offset > 0 && state.dir.toLowerCase() === xPosition) {
        onClose && onClose();
      }
    }
  }, [state, canSwipeToClose, position]);

  return (
    <div
      className={wrapperClass}
      style={wrapperStyle}
      role="dialog"
      aria-modal="true"
      ref={ref}
    >
      {!disableHeader && (
        <header className="rc-notification-header">
          <span className="rc-notification-title">{title}</span>
          <span className="rc-notification-close-btn">
            <Button type="icon" size="md" onClick={onClose}>
              <CloseIcon />
            </Button>
          </span>
        </header>
      )}
      <section className="rc-notification-content">{children}</section>
    </div>
  );
};

const Notification = withOverlay<NotificationProps>(NotificationComponent, {
  backdropColor: "transparent",
});

export { Notification };
