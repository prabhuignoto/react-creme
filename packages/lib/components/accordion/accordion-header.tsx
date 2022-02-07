import classnames from 'classnames';
import React, { useMemo, useRef } from 'react';
import { ChevronRightIcon, MinusIcon, PlusIcon } from '../../icons';
import useFocusNew from '../common/effects/useFocusNew';
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
}) => {
  const accordionHeaderClass = useMemo(
    () =>
      classnames('rc-accordion-header', {
        'rc-accordion-align-icon-rt': alignIconRight,
        'rc-accordion-disable-collapse': disableCollapse,
        'rc-accordion-disable-icon': disableIcon,
        'rc-accordion-focusable': focusable,
        'rc-accordion-selected': selected,
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
    return classnames('rc-accordion-title', {
      'rc-accordion-title-bold': isTitleBold,
    });
  }, [isTitleBold]);

  const iconClass = useMemo(() => {
    const classes: string[] = [];

    return classnames([...classes, 'rc-accordion-icon'], {
      'rc-accordion-custom-icon': customIcon,
      [`rc-accordion-icon-${iconType}`]: true,
      'rc-accordion-icon-open': open,
    });
  }, [open, customIcon]);

  const icon = useMemo(() => {
    if (disableIcon) {
      return null;
    }

    if (customIcon) {
      return customIcon;
    } else if (iconType === 'chevron') {
      return <ChevronRightIcon />;
    } else if (iconType === 'plus') {
      return open ? <MinusIcon /> : <PlusIcon />;
    }
  }, [iconType, open, disableIcon]);

  if (focusable) {
    useFocusNew(ref, onToggle);
  }

  return (
    <div
      className={accordionHeaderClass}
      id={accordionId}
      ref={ref}
      role="button"
      {...focusProps}
      {...collapsibleProps}
    >
      {!disableIcon && <span className={iconClass}>{icon}</span>}
      <span className={titleClass}>{title}</span>
    </div>
  );
};

export { AccordionHeader };
