import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
 * @param {string} titleColor - The color of the title. Default is undefined.
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
  titleColor,
  titles = [],
  isTitleBold = false,
  disableCollapse = false,
  focusable = true,
  icons,
  disableIcon = false,
  disableARIA = false,
  size = 'sm',
  fullWidth = false,
  colorizeHeader = false,
  headerHeight = 40,
}: AccordionGroupProps) => {
  const groupRef = useRef<HTMLDivElement>(null);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [items, setItems] = useState(() =>
    titles.map(() => ({ expanded, id: nanoid() }))
  );

  const handleExpand = useCallback(
    (id: string) => {
      setItems(prevItems =>
        prevItems.map(item => ({
          ...item,
          expanded: item.id === id ? true : autoClose ? false : item.expanded,
        }))
      );
    },
    [autoClose]
  );

  const handleCollapse = useCallback((id: string) => {
    setItems(prevItems =>
      prevItems.map(item => ({
        ...item,
        expanded: item.id === id ? false : item.expanded,
      }))
    );
  }, []);

  const groupClass = useMemo(
    () =>
      classNames(styles.group, {
        [styles.grp_no_border]: !border,
      }),
    [border]
  );

  // Fix ID regeneration - only regenerate if length changes
  useEffect(() => {
    setItems(prev => {
      // If length changed, regenerate all
      if (prev.length !== titles.length) {
        return titles.map(() => ({
          expanded,
          id: nanoid(),
        }));
      }
      // Otherwise, keep existing IDs but update expanded state
      return prev.map(item => ({
        ...item,
        expanded,
      }));
    });
  }, [titles.length, expanded]);

  // Keyboard navigation between accordions
  useEffect(() => {
    const currentGroup = groupRef.current;
    if (!currentGroup) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      // Only handle if a button inside our group is focused
      if (!target.matches('button') || !currentGroup.contains(target)) {
        return;
      }

      // Find current focused accordion index
      const buttons = Array.from(
        currentGroup.querySelectorAll('button')
      ) as HTMLButtonElement[];
      const currentIndex = buttons.indexOf(target as HTMLButtonElement);

      if (currentIndex === -1) return;

      let nextIndex = currentIndex;

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          nextIndex = currentIndex + 1;
          if (nextIndex >= buttons.length) {
            nextIndex = 0; // Wrap to first
          }
          break;

        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          nextIndex = currentIndex - 1;
          if (nextIndex < 0) {
            nextIndex = buttons.length - 1; // Wrap to last
          }
          break;

        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;

        case 'End':
          e.preventDefault();
          nextIndex = buttons.length - 1;
          break;

        default:
          return;
      }

      if (nextIndex !== currentIndex && buttons[nextIndex]) {
        buttons[nextIndex]?.focus();
      }
    };

    currentGroup.addEventListener('keydown', handleKeyDown);

    return () => {
      currentGroup.removeEventListener('keydown', handleKeyDown);
    };
  }, [titles.length]); // Re-attach when number of accordions changes

  return (
    <div className={groupClass} ref={groupRef}>
      {items.map((item, index) => (
        <div
          className={styles.group_item}
          key={item.id}
          role={!disableARIA ? 'group' : undefined}
          ref={el => {
            if (el) accordionRefs.current[index] = el;
          }}
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
            customIcon={icons?.[index]}
            disableARIA={disableARIA}
            size={size}
            fullWidth={fullWidth}
            colorizeHeader={colorizeHeader}
            headerHeight={headerHeight}
          >
            {Array.isArray(children) ? children[index] : children}
          </Accordion>
        </div>
      ))}
    </div>
  );
};

AccordionGroup.displayName = 'AccordionGroup';

export { AccordionGroup };
