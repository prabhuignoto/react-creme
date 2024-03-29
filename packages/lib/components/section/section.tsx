import classNames from 'classnames';
import React, { CSSProperties, useMemo } from 'react';
import { isDark } from '../common/utils';
import { SectionProps } from './section-model';
import styles from './section.module.scss';

const Section: React.FC<SectionProps> = ({
  children,
  title,
  height = 150,
  layout = 'row',
  RTL = false,
  size = 'sm',
  noPadding = false,
  useHash = false,
  border = true,
}) => {
  const sectionStyle = useMemo(
    () =>
      ({
        minHeight: `${height}px`,
      }) as CSSProperties,
    [height]
  );

  const sectionClass = useMemo(
    () => classNames(styles.section, border ? styles.border : ''),
    []
  );

  const bodyStyle = useMemo(
    () =>
      ({
        alignItems: layout === 'column' ? 'center' : 'stretch',
        flexDirection: layout === 'column' ? 'row' : 'column',
      }) as CSSProperties,
    []
  );

  const bodyClass = useMemo(
    () =>
      classNames(styles.body, {
        [styles[layout]]: true,
        [styles.no_padding]: noPadding,
        [styles.no_title]: !title,
        [styles.rtl]: RTL,
        [styles[`body_${size}`]]: true,
      }),
    [layout, title]
  );

  const isDarkMode = useMemo(() => isDark(), []);

  const headerClass = useMemo(() => {
    return classNames(
      styles.header,
      {
        [styles.header_rtl]: RTL,
        [styles[`header_${size}`]]: true,
        [styles.dark]: isDarkMode,
      },
      'rc-component-widget-heading'
    );
  }, []);

  const getTitle = useMemo(() => {
    return useHash ? `# ${title}` : title;
  }, []);

  const getId = useMemo(() => {
    return `${title
      ?.replace(/\(|\)/gi, '')
      .replace('-', ' ')
      .split(' ')
      .map(f => f.trim().toLowerCase())
      .filter(f => f)
      .join('-')}`;
  }, []);

  return (
    <div style={sectionStyle} className={sectionClass}>
      {getTitle && (
        <div className={headerClass} id={getId} role="heading" aria-level={3}>
          {getTitle}
        </div>
      )}
      <div style={bodyStyle} className={bodyClass}>
        {children}
      </div>
    </div>
  );
};

Section.displayName = 'Section';

export { Section };
