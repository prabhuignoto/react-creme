import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo } from "react";
import { Accordion } from "..";
import {
  AccordionGroupProps,
  AccordionItemProps,
} from "../accordion/accordion-model";
import "./accordion-group.scss";

const AccordionGroup = ({
  alignIconRight = false,
  autoClose = true,
  border = true,
  children,
  initialState = "close",
  titles = [],
  iconType = "chevron",
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
      "rc-accordion-grp-no-border": !border,
    });
  }, []);

  useEffect(() => {
    if (titles.length) {
      setItems(() =>
        titles.map(() => ({
          id: nanoid(),
          expanded: initialState === "open",
        }))
      );
    }
  }, [titles.length]);

  return (
    <div className={groupClass}>
      {items.map((item, index) => (
        <div className="rc-accordion-group-item" key={item.id} role="group">
          <Accordion
            id={item.id}
            onExpanded={handleExpand}
            onCollapsed={handleCollapse}
            noBorder
            title={titles[index]}
            controlledState={item.expanded}
            alignIconRight={alignIconRight}
            iconType={iconType}
          >
            {children && children[index]}
          </Accordion>
        </div>
      ))}
    </div>
  );
};

AccordionGroup.displayName = "AccordionGroup";

export { AccordionGroup };
