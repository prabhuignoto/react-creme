import classNames from 'classnames';
import React, { useMemo } from 'react';
import { isDark } from '@common';
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
  const isDarkMode = useMemo(() => isDark(), []);
  const headerClass = useMemo(() => {
    return classNames(styles.page_header, {
      [styles.rtl]: RTL,
      [styles[`${size}`]]: size,
    });
  }, []);

  const titleClass = useMemo(() => {
    return classNames(styles.title);
  }, []);

  const headerIconClass = useMemo(() => {
    return classNames(styles.icon, {
      [styles[`icon_${size}`]]: true,
    });
  }, []);

  const contentClass = useMemo(
    () =>
      classNames(styles.content, {
        [styles.dark]: isDarkMode,
      }),
    []
  );

  return (
    <header className={headerClass}>
      <div className={styles.title_container}>
        {icon && <span className={headerIconClass}>{icon}</span>}
        <h2 className={titleClass}>{title}</h2>
      </div>
      <div className={contentClass}>{children}</div>
    </header>
  );
};

PageHeader.displayName = 'PageHeader';

export { PageHeader };
