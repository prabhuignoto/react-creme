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
import { ChevronRightIcon } from "../../icons";
import { useFirstRender } from "../common/effects/useFirstRender";
import { useFocus } from "../common/effects/useFocus";
import { AccordionModel } from "./accordion-model";
import "./accordion.scss";

const Accordion: React.FunctionComponent<AccordionModel> = ({
  children,
  controlledState = null,
  id,
  noBorder = false,
  onCollapsed,
  onExpanded,
  title,
  transition = "cubic-bezier(0.19, 1, 0.22, 1)",
}) => {
  const accordionID = useRef(id || `accordion-${nanoid()}`);
  const ref = useRef(null);
  const chevronRef = useRef(null);

  const [open, setOpen] = useState(controlledState);
  const [bodyHeight, setBodyHeight] = useState(0);

  const toggleAccordion = useCallback(() => {
    enableCallback.current = true;
    setOpen((prev) => !prev);
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
      } as CSSProperties),
    [open, bodyHeight]
  );

  const iconClass = useMemo(() => {
    const classes: string[] = [];

    return cls([...classes, "rc-accordion-icon"], {
      "rc-accordion-icon-open": open,
    });
  }, [open]);

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
    [noBorder, open]
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

  useFocus(chevronRef, { bgHighlight: false }, toggleAccordion);

  useEffect(() => {
    if (isFirstRender.current || controlledState === null) {
      return;
    }

    enableCallback.current = false;

    if (open !== controlledState) {
      setOpen(controlledState);
    }
  }, [controlledState, open]);

  return (
    <div className={accordionClass}>
      <div
        className="rc-accordion-header"
        role="button"
        tabIndex={0}
        onClick={toggleAccordion}
        ref={chevronRef}
      >
        <span className={iconClass}>
          <ChevronRightIcon />
        </span>
        <span className="rc-accordion-title">{title}</span>
      </div>
      <div className={accordionBodyClass} style={style} ref={onInitRef}>
        {children}
      </div>
    </div>
  );
};

export { Accordion };
