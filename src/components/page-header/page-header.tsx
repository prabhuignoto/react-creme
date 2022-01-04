import classNames from "classnames";
import React, { useMemo } from "react";
import "./page-header.scss";

export interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  RTL?: boolean;
  size?: "sm" | "md" | "lg";
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  title,
  children,
  RTL = false,
  size = "sm",
}) => {
  const headerClass = useMemo(() => {
    return classNames("rc-page-header", {
      "rc-page-header-rtl": RTL,
    });
  }, []);

  const titleClass = useMemo(() => {
    return classNames("rc-page-header-title", {
      [`rc-page-header-title-${size}`]: true,
    });
  }, []);

  return (
    <header className={headerClass}>
      <h2 className={titleClass}>{title}</h2>
      <p>{children}</p>
    </header>
  );
};

export { PageHeader };
