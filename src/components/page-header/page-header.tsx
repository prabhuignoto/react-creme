import classNames from "classnames";
import React, { useMemo } from "react";
import "./page-header.scss";

export interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  RTL?: boolean;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  title,
  children,
  RTL = false,
}) => {
  const headerClass = useMemo(() => {
    return classNames("rc-page-header", {
      "rc-page-header-rtl": RTL,
    });
  }, []);

  return (
    <header className={headerClass}>
      <h2>{title}</h2>
      <p>{children}</p>
    </header>
  );
};

export { PageHeader };
