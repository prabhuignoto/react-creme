import classNames from "classnames";
import React, { useCallback, useMemo, useRef } from "react";
import "../../design/focus.scss";
import { useFocus } from "../common/effects/useFocus";
import { ButtonModel } from "./button-model";
import "./button.scss";

const Button: React.FunctionComponent<ButtonModel> = ({
  label,
  onClick,
  children,
  disabled,
  type = "default",
  size = "sm",
}) => {
  const buttonClass = useMemo(
    () =>
      classNames([`rc-btn-${type}`, `rc-btn-${size}`], {
        "rc-btn-label-icon": type !== "icon",
        "rc-btn-disabled": disabled,
      }),
    [disabled]
  );

  const ref = useRef(null);

  useFocus(ref, { bgHighlight: false });

  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick && onClick();
    }
  }, []);

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      ref={ref}
      role="button"
      tabIndex={0}
    >
      {children && <span className="rc-btn-icon-container">{children}</span>}
      <span className="rc-btn-label">{label}</span>
    </button>
  );
};

export { Button };
