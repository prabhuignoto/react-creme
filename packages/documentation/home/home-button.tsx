import classNames from 'classnames';
import { ReactNode, useMemo } from 'react';
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
      classNames(size ? `rc-doc-home-btn-${size}` : '', 'rc-doc-home-btn', {
        [`rc-doc-home-btn-${accent}`]: true,
        [`rc-doc-home-btn-${fillStyle}`]: true,
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
