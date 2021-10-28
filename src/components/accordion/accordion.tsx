import classNames from "classnames";
import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronRightIcon } from "../../icons";
import { useFocus } from "../common/effects/useFocus";
import { useKey } from "../common/effects/useKey";
import "./accordion.scss";

export interface AccordionModel {
  title?: string;
  children?: ReactNode;
}

const Accordion: React.FunctionComponent<AccordionModel> = ({
  title,
  children,
}) => {
  const [open, setOpen] = useState(false);

  const toggleAccordion = useCallback(() => setOpen((prev) => !prev), []);

  const ref = useRef(null);
  const chevronRef = useRef(null);

  const [bodyHeight, setBodyHeight] = useState(0);

  const accordionBodyClass = useMemo(
    () =>
      classNames("rc-accordion-body", {
        "rc-accordion-open": open,
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
      } as CSSProperties),
    [open, bodyHeight]
  );

  const iconClass = useMemo(
    () =>
      classNames("rc-accordion-icon", {
        "rc-accordion-icon-open": open,
      }),
    [open]
  );

  const onInitRef = useCallback((node) => {
    if (node) {
      ref.current = node;
      const height = (node as HTMLElement).scrollHeight;
      setBodyHeight(height);
    }
  }, []);

  useKey(chevronRef, () => {
    setOpen((prev) => !prev);
  });
  useFocus(chevronRef);

  return (
    <div className={"rc-accordion"} aria-expanded={open}>
      <div className="rc-accordion-header">
        <span
          className={iconClass}
          role="button"
          tabIndex={0}
          ref={chevronRef}
          onClick={toggleAccordion}
        >
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
