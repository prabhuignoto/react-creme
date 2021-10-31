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
  style = {},
}) => {
  const buttonClass = useMemo(
    () =>
      classNames(
        {
          "rc-disabled": disabled,
        },
        [`rc-btn-${size}`, `rc-btn-${type}`, "rc-btn"]
      ),
    [disabled]
  );

  const ref = useRef(null);

  useFocus(ref, { bgHighlight: false });

  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick && onClick();
    }
  }, [disabled]);

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      ref={ref}
      role="button"
      style={style}
      tabIndex={0}
    >
      {children && <span className="rc-btn-icon-container">{children}</span>}
      {label && <span className="rc-btn-label">{label}</span>}
    </button>
  );
};

export { Button };
