import classNames from 'classnames';
import React, { CSSProperties, useMemo } from 'react';
import { SectionProps } from './section-model';
import './section.scss';

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
      classNames('rc-section-body', {
        [`rc-section-${layout}`]: true,
        'rc-section-no-padding': noPadding,
        'rc-section-no-title': !title,
        'rc-section-rtl': RTL,
      }),
    [layout, title]
  );

  const headerClass = useMemo(() => {
    return classNames('rc-section-header', {
      'rc-section-header-rtl': RTL,
      [`rc-section-header-${size}`]: true,
    });
  }, []);

  const getTitle = useMemo(() => {
    return useHash ? `# ${title}` : title;
  }, []);

  const getId = useMemo(() => {
    return `${title?.toLowerCase().replace(' ', '-')}`;
  }, []);

  return (
    <div style={sectionStyle} className={'rc-section'}>
      {getTitle && (
        <div className={headerClass} id={getId}>
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
