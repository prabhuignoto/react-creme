import cls from "classnames";
import React, { useMemo, useRef } from "react";
import { ChevronRightIcon, MinusIcon, PlusIcon } from "../../icons";
import { useFocus } from "../common/effects/useFocus";
import { AccordionHeaderProps } from "./accordion-model";

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
}) => {
  const accordionHeaderClass = useMemo(
    () =>
      cls("rc-accordion-header", {
        "rc-accordion-align-icon-rt": alignIconRight,
        "rc-accordion-disable-icon": disableIcon,
        "rc-accordion-focusable": focusable,
      }),
    [alignIconRight, focusable]
  );

  const ref = useRef(null);

  const focusProps = useMemo(
    () => (focusable && !disableCollapse ? { tabIndex: 0 } : null),
    [focusable, disableCollapse]
  );

  const collapsibleProps = useMemo(() => {
    return !disableCollapse
      ? {
          onClick: onToggle,
          "aria-controls": accordionBodyId,
          "aria-expanded": !!open,
        }
      : null;
  }, []);

  const titleClass = useMemo(() => {
    return cls("rc-accordion-title", {
      "rc-accordion-title-bold": isTitleBold,
    });
  }, [isTitleBold]);

  const iconClass = useMemo(() => {
    const classes: string[] = [];

    return cls([...classes, "rc-accordion-icon"], {
      "rc-accordion-icon-open": open,
      [`rc-accordion-icon-${iconType}`]: true,
      "rc-accordion-custom-icon": customIcon,
    });
  }, [open, customIcon]);

  const icon = useMemo(() => {
    if (disableIcon) {
      return null;
    }

    if (customIcon) {
      return customIcon;
    } else if (iconType === "chevron") {
      return <ChevronRightIcon />;
    } else if (iconType === "plus") {
      return open ? <MinusIcon /> : <PlusIcon />;
    }
  }, [iconType, open, disableIcon]);

  if (focusable) {
    useFocus(ref, onToggle);
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
