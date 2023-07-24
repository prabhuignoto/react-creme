import { ChevronRightIcon, MinusIcon, PlusIcon } from '@icons';
import classnames from 'classnames';
import React, { CSSProperties, useMemo, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import styles from './accordion-header.module.scss';
import { AccordionHeaderProps } from './accordion-model';

/**
 * AccordionHeader component that renders the header of the accordion
 * @param disableIcon - boolean to disable the icon
 * @param focusable - boolean to make the header focusable
 * @param alignIconRight - boolean to align the icon to the right
 * @param disableCollapse - boolean to disable the collapse functionality
 * @param accordionBodyId - id of the accordion body
 * @param isTitleBold - boolean to make the title bold
 * @param title - title of the accordion header
 * @param customIcon - custom icon to be used instead of the default icons
 * @param iconType - type of the icon to be used
 * @param onToggle - function to be called when the header is toggled
 * @param accordionId - id of the accordion
 * @param open - boolean to indicate if the accordion is open
 * @param selected - boolean to indicate if the accordion is selected
 * @param customContent - custom content to be used instead of the title
 * @param size - size of the accordion header
 * @param colorizeHeader - boolean to colorize the header
 * @param fullWidth - boolean to make the header full width
 * @param headerHeight - height of the accordion header
 * @returns AccordionHeader component
 */
const AccordionHeader: React.FunctionComponent<AccordionHeaderProps> = ({
  disableIcon,
  focusable,
  alignIconRight,
  disableCollapse,
  accordionBodyId,
  isTitleBold,
  title,
  customIcon,
  iconType = 'plus',
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

  // classnames for the accordion header
  const accordionHeaderClass = useMemo(() => {
    const classes = [
      styles.header,
      alignIconRight && styles['align-icon-rt'],
      disableCollapse && styles['disable-collapse'],
      disableIcon && styles['disable-icon'],
      focusable && styles['focusable'],
      selected && styles['selected'],
      isDarkMode && styles.dark,
      colorizeHeader && styles.colorize,
      fullWidth && styles.full_width,
      styles.size,
    ].filter(Boolean);

    return classnames(classes);
  }, [
    alignIconRight,
    disableCollapse,
    disableIcon,
    focusable,
    selected,
    isDarkMode,
    colorizeHeader,
    fullWidth,
  ]);

  const ref = useRef(null);

  // focus props for the accordion header
  const focusProps = useMemo(() => {
    if (focusable && !disableCollapse) {
      return { tabIndex: 0 };
    }
  }, [focusable, disableCollapse]);

  // collapsible props for the accordion header
  const collapsibleProps = useMemo(() => {
    if (disableCollapse) {
      return null;
    }

    return {
      'aria-controls': accordionBodyId,
      'aria-expanded': !!open,
      onClick: onToggle,
      onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onToggle?.();
        }
      },
    };
  }, [accordionBodyId, open, onToggle]);

  // classnames for the title of the accordion header
  const titleClass = useMemo(() => {
    const classes = [
      styles.title,
      styles[`title_${size}`],
      isTitleBold && styles.title_bold,
      colorizeHeader && styles.colorize,
    ].filter(Boolean);

    return classnames(classes);
  }, [size, isTitleBold, colorizeHeader]);

  // classnames for the icon of the accordion header
  const iconClass = useMemo(() => {
    const classes = [
      styles.icon,
      customIcon && styles['custom-icon'],
      styles[`icon-${iconType}`],
      disableIcon && styles['disable-icon'],
      styles[`icon-${size}`],
      open && styles['icon-open'],
      colorizeHeader && styles.colorize,
    ].filter(Boolean);

    return classnames(classes);
  }, [customIcon, disableIcon, iconType, size, open, colorizeHeader]);

  // icon to be used in the accordion header
  const icons = useRef({
    chevron: <ChevronRightIcon />,
    minus: <MinusIcon />,
    plus: <PlusIcon />,
  });

  const icon = useMemo(() => {
    if (customIcon) {
      return customIcon;
    }

    const _icons = icons.current;

    if (iconType === 'plus') {
      return open ? _icons.minus : _icons.plus;
    }

    return _icons[iconType] || null;
  }, [customIcon, iconType, open]);

  // hook to focus the accordion header
  useFocusNew(focusable ? ref : null, onToggle);

  return (
    <div
      className={accordionHeaderClass}
      id={accordionId}
      ref={ref}
      role="heading"
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
