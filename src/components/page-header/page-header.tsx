import React from "react";
import "./page-header.scss";

export interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  title,
  children,
}) => {
  return (
    <header className="rc-page-header">
      <h2>{title}</h2>
      <p>{children}</p>
    </header>
  );
};

export { PageHeader };
