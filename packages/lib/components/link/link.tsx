import React, { AnchorHTMLAttributes } from 'react';
import './link.scss';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Link: React.FunctionComponent<LinkProps> = ({ children, href, icon }) => {
  return (
    <a className="rc-link" target="" href={href} tabIndex={-1}>
      {icon && <span className="rc-link-icon">{icon}</span>}
      <span className="rc-link-text">{children}</span>
    </a>
  );
};

Link.displayName = 'Link';

export { Link };
