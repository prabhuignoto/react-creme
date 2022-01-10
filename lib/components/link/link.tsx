import React, { AnchorHTMLAttributes } from "react";
import "./link.scss";

export interface LinkModel {
  children: React.ReactNode;
}

const Link: React.FunctionComponent<AnchorHTMLAttributes<LinkModel>> = ({
  children,
  href,
  target,
}) => {
  return (
    <a className="link" target="" href={href} tabIndex={-1}>
      {children}
    </a>
  );
};

export { Link };
