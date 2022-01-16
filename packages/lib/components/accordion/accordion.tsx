import cls from "classnames";
import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFirstRender } from "../common/effects/useFirstRender";
import { AccordionHeader } from "./accordion-header";
import { AccordionModel } from "./accordion-model";
import "./accordion.scss";

const Accordion: React.FunctionComponent<AccordionModel> = React.memo(
  ({
    alignIconRight = false,
    border = false,
    children,
    customIcon = null,
    disableCollapse = false,
    disableIcon = false,
    expanded = null,
    focusable = false,
    iconColor,
    iconType = "chevron",
    id,
    isTitleBold = false,
    onCollapsed,
    onExpanded,
    title,
    titleColor = "#000",
    transition = "cubic-bezier(0.19, 1, 0.22, 1)",
  }: AccordionModel) => {
    const accordionID = useRef(id || `accordion-${nanoid()}`);
    const accordionBodyId = useRef(`accordion-body-${nanoid()}`);

    const ref = useRef(null);

    const [open, setOpen] = useState(expanded);
    const [bodyHeight, setBodyHeight] = useState(0);

    const toggleAccordion = useCallback(() => {
      enableCallback.current = true;

      setOpen((prev) => {
        return !prev;
      });
    }, []);

    const enableCallback = useRef(false);
    const isFirstRender = useFirstRender();

    const accordionBodyClass = useMemo(
      () =>
        cls("rc-accordion-body", {
          "rc-accordion-close": !open,
          "rc-accordion-open": open && !isFirstRender.current,
        }),
      [open]
    );

    const style = useMemo(
      () =>
        ({
          "--icon-color": iconColor,
          "--max-height": open
            ? bodyHeight
              ? `${bodyHeight}px`
              : `${100}px`
            : "0px",
          "--title-color": titleColor,
          "--transition": transition,
        } as CSSProperties),
      [open, bodyHeight]
    );

    const accordionClass = useMemo(
      () =>
        cls("rc-accordion", {
          "rc-accordion-no-border": !border,
          "rc-accordion-open": open,
        }),
      [border, open, alignIconRight]
    );

    const onInitRef = useCallback((node) => {
      if (node) {
        ref.current = node;
        const height = (node as HTMLElement).scrollHeight;
        setBodyHeight(height);
      }
    }, []);

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

    useEffect(() => {
      enableCallback.current = false;

      if (expanded !== null) {
        setOpen(expanded);
      }
    }, [expanded]);

    return (
      <div className={accordionClass} style={style}>
        <AccordionHeader
          disableIcon={disableIcon}
          focusable={focusable}
          alignIconRight={alignIconRight}
          disableCollapse={disableCollapse}
          accordionBodyId={accordionBodyId.current}
          accordionId={accordionID.current}
          iconType={iconType}
          iconColor={iconColor}
          title={title}
          customIcon={customIcon}
          isTitleBold={isTitleBold}
          open={open}
          onToggle={toggleAccordion}
          aria-controls={accordionBodyId.current}
          aria-expanded={open}
        />
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
