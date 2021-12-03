import classNames from "classnames";
import React, { useMemo, useRef } from "react";
import { CircularProgress } from "..";
import "../../design/focus.scss";
import { useFocus } from "../common/effects/useFocus";
import { ButtonModel } from "./button-model";
import "./button.scss";

const Button: React.FunctionComponent<ButtonModel> = ({
  border = true,
  children,
  disabled = false,
  focusable = true,
  label = "",
  onClick,
  size = "sm",
  style = {},
  type = "default",
}) => {
  const buttonClass = useMemo(
    () =>
      classNames(
        {
          "rc-disabled": disabled,
          "rc-btn-no-border": !border,
          "rc-btn-default": type === "progress",
        },
        [`rc-btn-${size}`, `rc-btn-${type}`, "rc-btn"]
      ),
    [disabled]
  );

  const ref = useRef(null);

  if (focusable) {
    useFocus(ref);
  }

  const focusableProps = useMemo(
    () => ({
      tabIndex: focusable ? 0 : -1,
    }),
    []
  );

  const handleClick = () => {
    if (!disabled) {
      onClick?.();
    }
  };

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      ref={ref}
      role="button"
      style={style}
      {...focusableProps}
    >
      {type === "progress" && !disabled && (
        <span className="rc-btn-progress-wrapper">
          <CircularProgress size={15} />
        </span>
      )}
      {children && <span className="rc-btn-icon-container">{children}</span>}
      {label && <span className="rc-btn-label">{label}</span>}
    </button>
  );
};

export { Button };
