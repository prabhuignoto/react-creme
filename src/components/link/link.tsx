import React, { AnchorHTMLAttributes } from "react";
import "./link.scss";

interface LinkModel {
  children: React.ReactNode;
}

const Link: React.FunctionComponent<AnchorHTMLAttributes<LinkModel>> = ({
  children,
  href,
  target,
}) => {
  return (
    <a className="link" target="" href={href}>
      {children}
    </a>
  );
};

export { Link };
