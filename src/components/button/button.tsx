import classNames from "classnames";
import React, { useMemo } from "react";
import "../../design/layout.scss";
import { ButtonModel } from "./button-model";
import "./button.scss";

const Button: React.FunctionComponent<ButtonModel> = ({
  label,
  onClick,
  children,
  disabled,
  borderLess,
  type = "default",
}) => {
  const buttonClass = useMemo(
    () =>
      classNames([`button-${type}`], {
        "button-label-icon": type !== "icon",
        "button-comp-no-border": type !== "default",
        "button-disabled": disabled,
      }),
    []
  );

  return (
    <button className={buttonClass} onClick={onClick}>
      {children && <span className="button-icon-container">{children}</span>}
      <span className="button-label">{label}</span>
    </button>
  );
};

export { Button };
