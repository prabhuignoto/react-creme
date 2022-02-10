import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useCallback, useLayoutEffect, useMemo } from 'react';
import { Accordion } from '../accordion/accordion';
import {
  AccordionGroupProps,
  AccordionItemProps,
} from '../accordion/accordion-model';
import './accordion-group.scss';

const AccordionGroup = ({
  alignIconRight = false,
  autoClose = false,
  border = false,
  children,
  expanded = false,
  iconColor,
  iconType = 'chevron',
  titleColor = '#000',
  titles = [],
  isTitleBold = false,
  disableCollapse = false,
  focusable = true,
  icons,
  disableIcon = false,
}: AccordionGroupProps) => {
  const [items, setItems] = React.useState<Array<AccordionItemProps>>(
    Array.isArray(children)
      ? children.map(() => ({
          expanded: expanded,
          id: nanoid(),
        }))
      : []
  );

  const handleExpand = useCallback((id: string) => {
    setItems(prev =>
      prev.map(item => ({
        ...item,
        expanded: autoClose ? item.id === id : item.id === id || item.expanded,
      }))
    );
  }, []);

  const handleCollapse = useCallback((id: string) => {
    setItems(prev =>
      prev.map(item => ({
        ...item,
        expanded: autoClose ? false : item.id === id ? false : item.expanded,
      }))
    );
  }, []);

  const groupClass = useMemo(() => {
    return classNames('rc-accordion-group', {
      'rc-accordion-grp-no-border': !border,
    });
  }, []);

  useLayoutEffect(() => {
    if (titles.length) {
      setItems(() =>
        titles.map(() => ({
          expanded: expanded,
          id: nanoid(),
        }))
      );
    } else {
      setItems([]);
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
            border={border}
            title={titles[index]}
            expanded={item.expanded}
            alignIconRight={alignIconRight}
            iconType={iconType}
            titleColor={titleColor}
            iconColor={iconColor}
            isTitleBold={isTitleBold}
            disableCollapse={disableCollapse}
            disableIcon={disableIcon}
            focusable={focusable}
            customIcon={icons && icons[index]}
          >
            {children && children[index]}
          </Accordion>
        </div>
      ))}
    </div>
  );
};

AccordionGroup.displayName = 'AccordionGroup';

export { AccordionGroup };
