import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { Accordion } from '../accordion/accordion';
import { AccordionGroupProps } from '../accordion/accordion-model';
import styles from './accordion-group.module.scss';

/**
 * AccordionGroup component that renders a group of Accordion components.
 * @param {boolean} alignIconRight - Whether to align the icon to the right or not. Default is false.
 * @param {boolean} autoClose - Whether to automatically close other accordions when one is expanded. Default is false.
 * @param {boolean} border - Whether to show a border around the group. Default is false.
 * @param {React.ReactNode} children - The content of the AccordionGroup component.
 * @param {boolean} expanded - Whether to expand the accordion by default. Default is false.
 * @param {string} iconColor - The color of the icon. Default is undefined.
 * @param {string} iconType - The type of the icon. Default is 'chevron'.
 * @param {string} titleColor - The color of the title. Default is '#000'.
 * @param {string[]} titles - The titles of the accordions.
 * @param {boolean} isTitleBold - Whether to make the title bold or not. Default is false.
 * @param {boolean} disableCollapse - Whether to disable collapsing of the accordion. Default is false.
 * @param {boolean} focusable - Whether the accordion is focusable or not. Default is true.
 * @param {React.ReactNode[]} icons - The custom icons for the accordions.
 * @param {boolean} disableIcon - Whether to disable the icon or not. Default is false.
 * @param {boolean} disableARIA - Whether to disable ARIA attributes or not. Default is false.
 * @param {string} size - The size of the accordion. Default is 'sm'.
 * @param {boolean} fullWidth - Whether to make the accordion full width or not. Default is false.
 * @param {boolean} colorizeHeader - Whether to colorize the header or not. Default is false.
 * @param {number} headerHeight - The height of the header. Default is 40.
 * @returns {JSX.Element} - The AccordionGroup component.
 */
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
  disableARIA,
  size = 'sm',
  fullWidth = false,
  colorizeHeader = false,
  headerHeight = 40,
}: AccordionGroupProps): JSX.Element => {
  const [items, setItems] = useState(() => {
    if (Array.isArray(children)) {
      return children.map(() => ({
        expanded,
        id: nanoid(),
      }));
    }

    return [];
  });

  /**
   * Handles the expansion of an accordion.
   * @param {string} id - The id of the accordion.
   */
  const handleExpand = useCallback((id: string) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          return { ...item, expanded: true };
        }

        if (!autoClose) {
          return item;
        }

        return { ...item, expanded: false };
      })
    );
  }, []);

  /**
   * Handles the collapsing of an accordion.
   * @param {string} id - The id of the accordion.
   */
  const handleCollapse = useCallback((id: string) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          return { ...item, expanded: false };
        }

        return item;
      })
    );
  }, []);

  /**
   * The class name of the AccordionGroup component.
   */
  const groupClass = useMemo(() => {
    return classNames(styles.group, {
      [styles.grp_no_border]: !border,
    });
  }, []);

  /**
   * Sets the items of the AccordionGroup component.
   */
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
        <div
          className={styles.group_item}
          key={item.id}
          role={!disableARIA ? 'group' : ''}
        >
          <Accordion
            id={item.id}
            onExpanded={handleExpand}
            onCollapsed={handleCollapse}
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
            disableARIA={disableARIA}
            size={size}
            fullWidth={fullWidth}
            colorizeHeader={colorizeHeader}
            headerHeight={headerHeight}
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
