import classNames from "classnames";
import React, { ReactNode, useMemo } from "react";
import "./home-button.scss";

interface HomeButtonProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  children?: ReactNode;
  link?: string;
  onClick?: () => void;
}

const HomeButton: React.FunctionComponent<HomeButtonProps> = ({
  size = "sm",
  label,
  children,
  link = "",
  onClick,
}) => {
  const sizeClass = useMemo(
    () => classNames(size ? `rc-home-button-${size}` : "", "rc-demo-home-btn"),
    []
  );

  const linkProps = useMemo(() => {
    return link
      ? {
          target: "_blank",
          rel: "noreferrer",
        }
      : {};
  }, []);

  const noLinkProps = useMemo(() => {
    return !link
      ? {
          onClick: onClick,
        }
      : {};
  }, []);

  return (
    <a
      className={sizeClass}
      role="button"
      href={link || "javascript:void(0);"}
      {...linkProps}
      {...noLinkProps}
    >
      <span className="rc-home-button-icon">{children}</span>
      {label && <span className="rc-home-button-label">{label}</span>}
    </a>
  );
};

export { HomeButton };
