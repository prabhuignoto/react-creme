import classNames from 'classnames';
import React, { useMemo } from 'react';
import './page-header.scss';

export interface PageHeaderProps {
  RTL?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  title: string;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  title,
  children,
  RTL = false,
  size = 'sm',
  icon,
}) => {
  const headerClass = useMemo(() => {
    return classNames('rc-page-header', {
      'rc-page-header-rtl': RTL,
    });
  }, []);

  const titleClass = useMemo(() => {
    return classNames('rc-page-header-title', {
      [`rc-page-header-title-${size}`]: true,
    });
  }, []);

  const headerIconClass = useMemo(() => {
    return classNames('rc-page-header-icon', {
      [`rc-page-header-icon-${size}`]: true,
    });
  }, []);

  return (
    <header className={headerClass}>
      <div className="rc-page-header-title-container">
        {icon && <span className={headerIconClass}>{icon}</span>}
        <h2 className={titleClass}>{title}</h2>
      </div>
      <div className="rc-page-header-content">{children}</div>
    </header>
  );
};

PageHeader.displayName = 'PageHeader';

export { PageHeader };
