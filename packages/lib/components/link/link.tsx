import classNames from 'classnames';
import React, { AnchorHTMLAttributes, useMemo, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import './link.scss';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  accent?: 'default' | 'button';
  children: React.ReactNode;
  focusable?: boolean;
  highlight?: boolean;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  size?: 'sm' | 'md' | 'lg';
}

const Link: React.FunctionComponent<LinkProps> = ({
  children,
  href,
  icon,
  target,
  accent = 'default',
  focusable = true,
  onClick,
  size = 'sm',
  highlight = false,
}) => {
  const ref = useRef(null);
  let focusProps = null;

  if (focusable) {
    useFocusNew(ref);
    focusProps = {
      tabIndex: 0,
    };
  }

  const linkClass = useMemo(() => {
    return classNames('rc-link', {
      'rc-link-btn': accent === 'button',
      [`rc-link-${size}`]: true,
      'rc-link-highlight': highlight,
    });
  }, [highlight]);

  return (
    <a
      className={linkClass}
      target={target}
      href={href}
      {...focusProps}
      ref={ref}
      onClick={onClick}
      onKeyUp={e => {
        if (e.key === 'Enter') {
          onClick?.(e);
        }
      }}
    >
      {icon && <span className="rc-link-icon">{icon}</span>}
      <span className="rc-link-text">{children}</span>
    </a>
  );
};

Link.displayName = 'Link';

export { Link };
