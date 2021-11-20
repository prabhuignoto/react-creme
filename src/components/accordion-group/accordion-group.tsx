import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useCallback, useMemo } from "react";
import { Accordion } from "..";
import {
  AccordionGroupProps,
  AccordionItemProps,
} from "../accordion/accordion-model";
import "./accordion-group.scss";

const AccordionGroup = ({
  children,
  titles = [],
  autoClose = true,
  initialState = "close",
  alignIconRight = false,
  noBorder = false,
}: AccordionGroupProps) => {
  const [items, setItems] = React.useState<Array<AccordionItemProps>>(
    Array.isArray(children)
      ? children.map(() => ({
          id: nanoid(),
          expanded: initialState === "open",
        }))
      : []
  );

  const handleExpand = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        expanded: autoClose ? item.id === id : item.id === id || item.expanded,
      }))
    );
  }, []);

  const handleCollapse = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        expanded: autoClose ? false : item.id === id ? false : item.expanded,
      }))
    );
  }, []);

  const groupClass = useMemo(() => {
    return classNames("rc-accordion-group", {
      "rc-accordion-grp-no-border": noBorder,
    });
  }, []);

  return (
    <div className={groupClass}>
      {items.map((item, index) => (
        <div className="rc-accordion-group-item" key={item.id}>
          <Accordion
            id={item.id}
            onExpanded={handleExpand}
            onCollapsed={handleCollapse}
            noBorder
            title={titles[index]}
            controlledState={item.expanded}
            alignIconRight={alignIconRight}
          >
            {children && children[index]}
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export { AccordionGroup };
