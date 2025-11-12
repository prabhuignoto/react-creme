import classNames from 'classnames';
import React, { AnchorHTMLAttributes, useMemo, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import styles from './link.module.scss';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  accent?: 'default' | 'button';
  children: React.ReactNode;
  focusable?: boolean;
  highlight?: boolean;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  size?: 'sm' | 'md' | 'lg';
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      href,
      icon,
      target,
      accent = 'default',
      focusable = true,
      onClick,
      size = 'sm',
      highlight = false,
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLAnchorElement>(null);
    const ref = (forwardedRef ||
      internalRef) as React.RefObject<HTMLAnchorElement>;
    let focusProps = null;

    useFocusNew(focusable ? (ref as React.RefObject<HTMLElement>) : null);

    if (focusable) {
      focusProps = {
        tabIndex: 0,
      };
    }

    const isDarkMode = useMemo(() => isDark(), []);

    const linkClass = useMemo(() => {
      return classNames(styles.link, {
        [styles.btn]: accent === 'button',
        [styles[size]]: true,
        [styles.highlight]: highlight,
        [styles.dark]: isDarkMode,
      });
    }, [accent, size, highlight, isDarkMode]);

    return (
      <a
        className={linkClass}
        target={target}
        href={href}
        {...focusProps}
        ref={ref as React.Ref<HTMLAnchorElement>}
        onClick={onClick}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            onClick?.(e);
          }
        }}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.text}>{children}</span>
      </a>
    );
  }
);

Link.displayName = 'Link';

export { Link };
