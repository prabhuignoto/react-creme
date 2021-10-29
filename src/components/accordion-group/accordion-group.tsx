import { nanoid } from "nanoid";
import React, { useCallback } from "react";
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
}: AccordionGroupProps) => {
  const [items, setItems] = React.useState<Array<AccordionItemProps>>(
    Array.isArray(children)
      ? children.map(() => ({ id: nanoid(), expanded: false }))
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

  return (
    <div className="rc-accordion-group">
      {items.map((item, index) => (
        <div className="rc-accordion-group-item" key={item.id}>
          <Accordion
            id={item.id}
            onExpanded={handleExpand}
            onCollapsed={handleCollapse}
            noBorder
            title={titles[index]}
            controlledState={item.expanded}
          >
            {children && children[index]}
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export { AccordionGroup };
