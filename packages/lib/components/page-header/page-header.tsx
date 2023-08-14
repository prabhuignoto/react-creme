import classNames from 'classnames';
import React, { useMemo } from 'react';
import { isDark } from '../common/utils';
import styles from './page-header.module.scss';

export interface PageHeaderProps {
  RTL?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  title: string;
}

/**
 * PageHeader Component
 *    @property {boolean} RTL - Whether the layout is right-to-left (default: false).
 *    @property {React.ReactNode | React.ReactNode[]} children - Child components or elements.
 *    @property {React.ReactNode} icon - An optional icon to display in the header.
 *    @property {string} size - The size of the header ('sm', 'md', or 'lg', default: 'sm').
 *    @property {string} title - The title text for the header.
 * @returns {JSX.Element} The PageHeader component.
 */
const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  title,
  children,
  RTL = false,
  size = 'sm',
  icon,
}) => {
  // Determine if dark mode is enabled
  const isDarkMode = useMemo(() => isDark(), []);

  // Compute class for header, including RTL and size considerations
  const headerClass = useMemo(() => {
    return classNames(styles.page_header, {
      [styles.rtl]: RTL,
      [styles[`${size}`]]: size,
    });
  }, [RTL, size]);

  // Compute class for title
  const titleClass = useMemo(() => classNames(styles.title), []);

  // Compute class for header icon
  const headerIconClass = useMemo(() => {
    return classNames(styles.icon, {
      [styles[`icon_${size}`]]: true,
    });
  }, [size]);

  // Compute class for content, including dark mode considerations
  const contentClass = useMemo(() => {
    return classNames(styles.content, {
      [styles.dark]: isDarkMode,
    });
  }, [isDarkMode]);

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
