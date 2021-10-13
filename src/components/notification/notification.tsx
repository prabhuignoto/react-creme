import classNames from "classnames";
import React, { CSSProperties, useMemo } from "react";
import { CloseIcon } from "../../icons";
import { withOverlay } from "../common/withOverlay";
import { NotificationModel } from "./notification-model";
import "./notification.scss";

const NotificationComponent: React.FunctionComponent<NotificationModel> = ({
  title,
  children,
  position,
  isClosing,
  onClose,
  width = 450,
  height = 100,
}) => {
  const wrapperClass = classNames([
    "notification-wrapper",
    {
      [`notification-${position}-enter`]: !isClosing,
      [`notification-${position}-exit`]: isClosing,
    },
  ]);

  const wrapperStyle = useMemo(
    () =>
      ({
        "--min-width": `${width}px`,
        "--min-height": `${height}px`,
      } as CSSProperties),
    []
  );

  return (
    <div className={wrapperClass} style={wrapperStyle}>
      <header className="notification-header">
        <span className="notification-title">{title}</span>
        <button className="notification-close-btn" onClick={onClose}>
          <CloseIcon />
        </button>
      </header>
      <section className="notification-content">{children}</section>
    </div>
  );
};

const Notification = withOverlay<NotificationModel>(NotificationComponent, {
  disableBackdrop: true,
});

export { Notification };
