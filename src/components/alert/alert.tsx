import classNames from "classnames";
import React, { CSSProperties, useCallback, useMemo } from "react";
import {
  CheckIcon,
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  WarningIcon,
} from "../../icons";
import "./alert.scss";

interface AlertProps {
  message?: string;
  height?: number;
  state?: "success" | "error" | "warning" | "info";
  canDismiss?: boolean;
  onDismiss?: () => void;
}

const Alert: React.FunctionComponent<AlertProps> = ({
  message,
  height = 100,
  state = "info",
  canDismiss = true,
  onDismiss,
}) => {
  const [close, setClose] = React.useState(false);

  const style = useMemo(
    () =>
      ({
        "--height": `${height}px`,
      } as CSSProperties),
    [state]
  );

  const messageClass = useMemo(
    () =>
      classNames("rc-alert", {
        "rc-alert-success": state === "success",
        "rc-alert-error": state === "error",
        "rc-alert-warning": state === "warning",
        "rc-alert-info": state === "info",
        "rc-alert-close": close,
      }),
    [state, close]
  );

  const handleClose = useCallback(() => {
    setClose(true);
    onDismiss && onDismiss();
  }, []);

  return (
    <div className={messageClass} style={style} role="alert">
      <div className="rc-alert-icon-wrapper">
        <span className="rc-alert-icon" role="img">
          {state === "error" && <ErrorIcon />}
          {state === "warning" && <WarningIcon />}
          {state === "info" && <InfoIcon />}
          {state === "success" && <CheckIcon />}
        </span>
      </div>
      <span className="rc-alert-content">{message}</span>
      {canDismiss && (
        <span
          className="rc-alert-close-btn"
          role="button"
          onClick={handleClose}
        >
          <CloseIcon />
        </span>
      )}
    </div>
  );
};

export { Alert };
