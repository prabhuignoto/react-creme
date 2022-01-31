import classNames from 'classnames';
import React, { AnchorHTMLAttributes, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import './link.scss';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  accent?: 'default' | 'button';
  children: React.ReactNode;
  focusable?: boolean;
  icon?: React.ReactNode;
}

const Link: React.FunctionComponent<LinkProps> = ({
  children,
  href,
  icon,
  target,
  accent = 'default',
  focusable = true,
}) => {
  const ref = useRef(null);
  let focusProps = null;

  if (focusable) {
    useFocusNew(ref);
    focusProps = {
      tabIndex: 0,
    };
  }

  return (
    <a
      className={classNames('rc-link', {
        'rc-link-btn': accent === 'button',
      })}
      target={target}
      href={href}
      {...focusProps}
      ref={ref}
    >
      {icon && <span className="rc-link-icon">{icon}</span>}
      <span className="rc-link-text">{children}</span>
    </a>
  );
};

Link.displayName = 'Link';

export { Link };
