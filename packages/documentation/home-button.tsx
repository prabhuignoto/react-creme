import classNames from "classnames";
import React, { ReactNode, useMemo } from "react";
import "./home-button.scss";

interface HomeButtonProps {
  children?: ReactNode;
  label?: string;
  link?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
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
          rel: "noreferrer",
          target: "_blank",
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
