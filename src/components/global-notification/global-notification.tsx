import classNames from "classnames";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CloseIcon } from "../../icons";
import "./global-notification.scss";

export type GlobalNotificationState = "success" | "error" | "warning" | "info";

export interface GlobalNotificationProps {
  height?: number;
  delay?: number;
  closeAfter?: number;
  message: string;
  state?: GlobalNotificationState;
  onClose?: () => void;
}

const GlobalNotification: React.FunctionComponent<GlobalNotificationProps> = ({
  height = 50,
  delay = 0,
  closeAfter = 3000,
  message,
  state = "info",
  onClose,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setOpen(true), delay);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
        setTimeout(() => onClose?.(), 250);
      }, closeAfter);
    }
  }, [open]);

  const globalNotificationClass = useMemo(
    () =>
      classNames("rc-global-notification", {
        "rc-global-notification-open": open,
        "rc-global-notification-close": !open,
        [`rc-global-notification-${state}`]: true,
      }),
    [open, state]
  );

  const style = useMemo(
    () =>
      ({
        "--height": `${height}px`,
      } as CSSProperties),
    []
  );

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <div className={globalNotificationClass} style={style}>
      <span className="rc-global-notification-message">{open && message}</span>
      <span className="rc-global-notification-close-btn" onClick={handleClose}>
        {open && <CloseIcon />}
      </span>
    </div>
  );
};

export { GlobalNotification };
