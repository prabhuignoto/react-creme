import classNames from 'classnames';
import React, { ReactNode, useMemo } from 'react';
import './home-button.scss';

interface HomeButtonProps {
  accent?: 'round' | 'flat';
  children?: ReactNode;
  fillStyle?: 'solid' | 'outline';
  label?: string;
  link?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const HomeButton: React.FunctionComponent<HomeButtonProps> = ({
  size = 'sm',
  label,
  children,
  link = '',
  onClick,
  accent = 'flat',
  fillStyle = 'outline',
}) => {
  const btnClass = useMemo(
    () =>
      classNames(size ? `rc-demo-home-btn-${size}` : '', 'rc-demo-home-btn', {
        [`rc-demo-home-btn-${accent}`]: true,
        [`rc-demo-home-btn-${fillStyle}`]: true,
      }),
    []
  );

  const linkProps = useMemo(() => {
    return link
      ? {
          rel: 'noreferrer',
          target: '_blank',
        }
      : {};
  }, []);

  const noLinkProps = useMemo(() => {
    return !link
      ? {
          onClick: onClick,
        }
      : {};
  }, []);

  const labelClass = useMemo(() => {
    return classNames('rc-home-button-label', {
      [`rc-home-button-label-${size}`]: true,
    });
  }, []);

  const iconClass = useMemo(() => {
    return classNames('rc-home-button-icon', {
      [`rc-home-button-icon-${size}`]: true,
    });
  }, []);

  return (
    <a
      className={btnClass}
      role="button"
      href={link || 'javascript:void(0);'}
      {...linkProps}
      {...noLinkProps}
    >
      <span className={iconClass}>{children}</span>
      {label && <span className={labelClass}>{label}</span>}
    </a>
  );
};

export { HomeButton };
