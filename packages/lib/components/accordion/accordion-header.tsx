import { ChevronRightIcon, MinusIcon, PlusIcon } from '@icons';
import classnames from 'classnames';
import React, { CSSProperties, useMemo, useRef, useCallback } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import styles from './accordion-header.module.scss';
import { AccordionHeaderProps } from './accordion-model';

/**
 * AccordionHeader component that renders the header of the accordion
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
  const ref = useRef<HTMLDivElement | null>(null);

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

  // focus props for the accordion header
  const focusProps = useMemo(() => {
    if (focusable && !disableCollapse) {
      return { tabIndex: 0 };
    }
    return undefined;
  }, [focusable, disableCollapse]);

  // Handle keyboard events for accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onToggle?.();
      }
    },
    [onToggle]
  );

  // collapsible props for the accordion header
  const collapsibleProps = useMemo(() => {
    if (disableCollapse) {
      return null;
    }

    return {
      'aria-controls': accordionBodyId,
      'aria-expanded': !!open,
      onClick: onToggle,
      onKeyDown: handleKeyDown,
    };
  }, [accordionBodyId, open, onToggle, handleKeyDown, disableCollapse]);

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

  // Pre-defined icons
  const icons = useRef({
    chevron: <ChevronRightIcon />,
    minus: <MinusIcon />,
    plus: <PlusIcon />,
  });

  // Choose the appropriate icon based on type and state
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
  useFocusNew(
    focusable ? (ref as React.RefObject<HTMLElement>) : null,
    onToggle
  );

  // Calculate the style object with header height
  const headerStyle = useMemo(() => {
    return {
      '--rc-accordion-header-height': `${headerHeight}px`,
    } as CSSProperties;
  }, [headerHeight]);

  return (
    <div
      className={accordionHeaderClass}
      id={accordionId}
      ref={ref}
      role="heading"
      {...focusProps}
      {...collapsibleProps}
      style={headerStyle}
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
