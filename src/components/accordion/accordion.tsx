import cls from "classnames";
import React, {
  CSSProperties,
  startTransition,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronRightIcon, MinusIcon, PlusIcon } from "../../icons";
import { useFirstRender } from "../common/effects/useFirstRender";
import { useFocus } from "../common/effects/useFocus";
import { AccordionModel } from "./accordion-model";
import "./accordion.scss";

const Accordion: React.FunctionComponent<AccordionModel> = React.memo(
  ({
    alignIconRight = false,
    children,
    controlledState = null,
    id,
    noBorder = false,
    onCollapsed,
    onExpanded,
    title,
    transition = "cubic-bezier(0.19, 1, 0.22, 1)",
    iconType = "chevron",
    focusable = false,
    disableIcon = false,
    customIcon = null,
    titleColor = "#000",
    iconColor = "#000",
  }: AccordionModel) => {
    const accordionID = useRef(id || `accordion-${useId()}`);
    const accordionBodyId = useRef(`accordion-body-${useId()}`);

    const ref = useRef(null);
    const chevronRef = useRef(null);

    const [open, setOpen] = useState(controlledState);
    const [bodyHeight, setBodyHeight] = useState(0);

    const toggleAccordion = useCallback(() => {
      enableCallback.current = true;

      startTransition(() => setOpen((prev) => !prev));
    }, []);

    const enableCallback = useRef(false);
    const isFirstRender = useFirstRender();

    const accordionBodyClass = useMemo(
      () =>
        cls("rc-accordion-body", {
          "rc-accordion-open": open && !isFirstRender.current,
          "rc-accordion-close": !open,
        }),
      [open]
    );

    const style = useMemo(
      () =>
        ({
          "--max-height": open
            ? bodyHeight
              ? `${bodyHeight}px`
              : `${100}px`
            : "0px",
          "--transition": transition,
          "--title-color": titleColor,
          "--icon-color": iconColor,
        } as CSSProperties),
      [open, bodyHeight]
    );

    const iconClass = useMemo(() => {
      const classes: string[] = [];

      return cls([...classes, "rc-accordion-icon"], {
        "rc-accordion-icon-open": open,
        [`rc-accordion-icon-${iconType}`]: true,
        "rc-accordion-custom-icon": customIcon,
      });
    }, [open, customIcon]);

    const onInitRef = useCallback((node) => {
      if (node) {
        ref.current = node;
        const height = (node as HTMLElement).scrollHeight;
        setBodyHeight(height);
      }
    }, []);

    const accordionClass = useMemo(
      () =>
        cls("rc-accordion", {
          "rc-accordion-no-border": noBorder,
          "rc-accordion-open": open,
        }),
      [noBorder, open, alignIconRight]
    );

    const accordionHeaderClass = useMemo(
      () =>
        cls("rc-accordion-header", {
          "rc-accordion-align-icon-rt": alignIconRight,
          "rc-accordion-disable-icon": disableIcon,
        }),
      [alignIconRight]
    );

    useEffect(() => {
      if (isFirstRender.current || !enableCallback.current) {
        return;
      }

      if (open) {
        onExpanded && onExpanded(accordionID.current);
      } else {
        onCollapsed && onCollapsed(accordionID.current);
      }
    }, [open]);

    if (focusable) {
      useFocus(chevronRef, toggleAccordion);
    }

    useEffect(() => {
      if (isFirstRender.current || controlledState === null) {
        return;
      }

      enableCallback.current = false;

      if (open !== controlledState) {
        setOpen(controlledState);
      }
    }, [controlledState, open]);

    useFocus(chevronRef, toggleAccordion);

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

    return (
      <div className={accordionClass} style={style}>
        <div
          aria-controls={accordionBodyId.current}
          aria-expanded={!!open}
          className={accordionHeaderClass}
          id={accordionID.current}
          onClick={toggleAccordion}
          ref={chevronRef}
          role="button"
          tabIndex={focusable ? 0 : -1}
        >
          {!disableIcon && <span className={iconClass}>{icon}</span>}
          <span className="rc-accordion-title">{title}</span>
        </div>
        <div
          className={accordionBodyClass}
          style={style}
          ref={onInitRef}
          id={accordionBodyId.current}
          aria-labelledby={accordionID.current}
        >
          {children}
        </div>
      </div>
    );
  }
);

Accordion.displayName = "Accordion";

export { Accordion };
