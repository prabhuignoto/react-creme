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
      classNames(
        [
          disabled ? "button-comp-disabled" : "",
          borderLess ? "button-comp-no-border" : "button-comp",
          type,
        ],
        {
          "button-label-icon": type !== "icon",
        }
      ),
    []
  );

  return (
    <button className={buttonClass} onClick={onClick}>
      {children && <span className="button-icon">{children}</span>}
      <span className="button-label">{label}</span>
    </button>
  );
};

export { Button };
