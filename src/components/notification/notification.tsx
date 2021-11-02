import classNames from "classnames";
import React, { CSSProperties, useEffect, useMemo, useRef } from "react";
import { Button } from "..";
import { CloseIcon } from "../../icons";
import { useCloseOnEscape } from "../common/effects/useCloseOnEsc";
import { withOverlay } from "../common/withOverlay";
import { NotificationModel } from "./notification-model";
import "./notification.scss";

const NotificationComponent: React.FunctionComponent<NotificationModel> = ({
  title,
  children,
  position,
  isClosing,
  onClose,
  width = 350,
  height = 100,
  autoClose,
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
        "--min-width": `${width}px`,
        "--min-height": `${height}px`,
      } as CSSProperties),
    []
  );

  useEffect(() => {
    if (autoClose) {
      setTimeout(() => onClose && onClose(), autoClose);
    }
  }, []);

  return (
    <div
      className={wrapperClass}
      style={wrapperStyle}
      role="dialog"
      aria-modal="true"
      ref={ref}
    >
      <header className="rc-notification-header">
        <span className="rc-notification-title">{title}</span>
        <span className="rc-notification-close-btn">
          <Button type="icon" size="sm" onClick={onClose}>
            <CloseIcon />
          </Button>
        </span>
      </header>
      <section className="rc-notification-content">{children}</section>
    </div>
  );
};

const Notification = withOverlay<NotificationModel>(NotificationComponent, {
  backdropColor: "transparent",
});

export { Notification };
