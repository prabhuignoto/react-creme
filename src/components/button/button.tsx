import classNames from "classnames";
import React, { useMemo, useRef } from "react";
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
}) => {
  const buttonClass = useMemo(
    () =>
      classNames([`button-${type}`], {
        "button-label-icon": type !== "icon",
        "button-disabled": disabled,
      }),
    []
  );

  const ref = useRef(null);

  useFocus(ref);

  return (
    <button className={buttonClass} onClick={onClick} ref={ref}>
      {children && <span className="button-icon-container">{children}</span>}
      <span className="button-label">{label}</span>
    </button>
  );
};

export { Button };
