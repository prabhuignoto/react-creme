import classNames from 'classnames';
import React, { useMemo } from 'react';
import styles from './page-header.module.scss';

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
    return classNames(styles.page_header, {
      [styles.page_header_rtl]: RTL,
      [styles[`page_header_${size}`]]: size,
    });
  }, []);

  const titleClass = useMemo(() => {
    return classNames(styles.page_header_title);
  }, []);

  const headerIconClass = useMemo(() => {
    return classNames(styles.page_header_icon, {
      [styles[`page_header_icon_${size}`]]: true,
    });
  }, []);

  return (
    <header className={headerClass}>
      <div className={styles.page_header_title_container}>
        {icon && <span className={headerIconClass}>{icon}</span>}
        <h2 className={titleClass}>{title}</h2>
      </div>
      <div className={styles.page_header_content}>{children}</div>
    </header>
  );
};

PageHeader.displayName = 'PageHeader';

export { PageHeader };
