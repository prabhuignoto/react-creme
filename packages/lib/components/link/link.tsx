import React, { AnchorHTMLAttributes } from 'react';
import './link.scss';

export interface LinkProps {
  children: React.ReactNode;
}

const Link: React.FunctionComponent<AnchorHTMLAttributes<LinkProps>> = ({
  children,
  href,
}) => {
  return (
    <a className="link" target="" href={href} tabIndex={-1}>
      {children}
    </a>
  );
};

Link.displayName = 'Link';

export { Link };
