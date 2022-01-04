import classNames from "classnames";
import React, { ReactNode, useMemo } from "react";
import "./home-button.scss";

interface HomeButtonProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  children?: ReactNode;
  link?: string;
}

const HomeButton: React.FunctionComponent<HomeButtonProps> = ({
  size = "sm",
  label,
  children,
  link = "",
}) => {
  const sizeClass = useMemo(
    () => classNames(size ? `rc-home-button-${size}` : "", "rc-demo-home-btn"),
    []
  );

  return (
    <a
      className={sizeClass}
      role="button"
      target="_blank"
      href={link}
      rel="noreferrer"
    >
      <span className="rc-home-button-icon">{children}</span>
      <span className="rc-home-button-label">{label}</span>
    </a>
  );
};

export { HomeButton };
