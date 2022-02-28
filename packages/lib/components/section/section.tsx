import classNames from 'classnames';
import React, { CSSProperties, useMemo } from 'react';
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
}) => {
  const sectionStyle = useMemo(
    () =>
      ({
        minHeight: `${height}px`,
      } as CSSProperties),
    [height]
  );

  const bodyStyle = useMemo(
    () =>
      ({
        alignItems: layout === 'column' ? 'center' : 'stretch',
        flexDirection: layout === 'column' ? 'row' : 'column',
      } as CSSProperties),
    []
  );

  const bodyClass = useMemo(
    () =>
      classNames(styles.body, {
        [styles[layout]]: true,
        [styles.no_padding]: noPadding,
        [styles.no_title]: !title,
        [styles.rtl]: RTL,
      }),
    [layout, title]
  );

  const headerClass = useMemo(() => {
    return classNames(styles.header, {
      [styles.header_rtl]: RTL,
      [styles[`header_${size}`]]: true,
    });
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
    <div style={sectionStyle} className={styles.section} role="">
      {getTitle && (
        <div className={headerClass} id={getId} role="heading">
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
