import classNames from 'classnames';
import React, { AnchorHTMLAttributes } from 'react';
import './link.scss';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  accent?: 'default' | 'button';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Link: React.FunctionComponent<LinkProps> = ({
  children,
  href,
  icon,
  target,
  accent,
}) => {
  return (
    <a
      className={classNames('rc-link', {
        'rc-link-btn': accent === 'button',
      })}
      target={target}
      href={href}
      tabIndex={-1}
    >
      {icon && <span className="rc-link-icon">{icon}</span>}
      <span className="rc-link-text">{children}</span>
    </a>
  );
};

Link.displayName = 'Link';

export { Link };
