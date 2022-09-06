import { ChevronRightIcon, MinusIcon, PlusIcon } from '@icons';
import classnames from 'classnames';
import React, { CSSProperties, useMemo, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import styles from './accordion-header.module.scss';
import { AccordionHeaderProps } from './accordion-model';

const AccordionHeader: React.FunctionComponent<AccordionHeaderProps> = ({
  disableIcon,
  focusable,
  alignIconRight,
  disableCollapse,
  accordionBodyId,
  isTitleBold,
  title,
  customIcon,
  iconType,
  onToggle,
  accordionId,
  open,
  selected,
  customContent,
  size = 'sm',
  colorizeHeader = false,
  fullWidth = false,
  headerHeight,
}) => {
  const isDarkMode = useMemo(() => isDark(), []);

  const accordionHeaderClass = useMemo(
    () =>
      classnames(styles.header, {
        [styles['align-icon-rt']]: alignIconRight,
        [styles['disable-collapse']]: disableCollapse,
        [styles['disable-icon']]: disableIcon,
        [styles['focusable']]: focusable,
        [styles['selected']]: selected,
        [styles.dark]: isDarkMode,
        [styles.colorize]: colorizeHeader,
        [styles.full_width]: fullWidth,
        [styles.size]: true,
      }),
    [alignIconRight, focusable, selected]
  );

  const ref = useRef(null);

  const focusProps = useMemo(
    () => (focusable && !disableCollapse ? { tabIndex: 0 } : null),
    [focusable, disableCollapse]
  );

  const collapsibleProps = useMemo(() => {
    return !disableCollapse
      ? {
          'aria-controls': accordionBodyId,
          'aria-expanded': !!open,
          onClick: onToggle,
        }
      : null;
  }, []);

  const titleClass = useMemo(() => {
    return classnames(
      styles.title,
      {
        [styles[`title_${size}`]]: true,
      },
      isTitleBold ? styles.title_bold : '',
      colorizeHeader ? styles.colorize : ''
    );
  }, [isTitleBold]);

  const iconClass = useMemo(() => {
    const classes: string[] = [];

    return classnames([...classes, styles['icon']], {
      [styles['custom-icon']]: customIcon,
      [styles[`icon-${iconType}`]]: true,
      [styles['disable-icon']]: disableIcon,
      [styles[`icon-${size}`]]: true,
      [styles['icon-open']]: open,
      [styles.colorize]: colorizeHeader,
    });
  }, [open, customIcon, disableIcon]);

  const icon = useMemo(() => {
    if (customIcon) {
      return customIcon;
    } else if (iconType === 'chevron') {
      return <ChevronRightIcon />;
    } else if (iconType === 'plus') {
      return open ? <MinusIcon /> : <PlusIcon />;
    }
  }, [iconType, open]);

  useFocusNew(focusable ? ref : null, onToggle);

  return (
    <div
      className={accordionHeaderClass}
      id={accordionId}
      ref={ref}
      role="button"
      {...focusProps}
      {...collapsibleProps}
      style={
        { '--rc-accordion-header-height': `${headerHeight}px` } as CSSProperties
      }
    >
      <span className={iconClass} role="img">
        {icon}
      </span>
      {customContent ? (
        customContent
      ) : (
        <span className={titleClass}>{title}</span>
      )}
    </div>
  );
};

export { AccordionHeader };
