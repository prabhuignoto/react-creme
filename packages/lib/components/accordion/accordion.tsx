import cls from 'classnames';
import { nanoid } from 'nanoid';
import React from 'react';
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFirstRender } from '../common/effects/useFirstRender';
import { AccordionHeader } from './accordion-header';
import { AccordionProps } from './accordion-model';
import styles from './accordion.module.scss';

// Define the Accordion component
const Accordion: React.FunctionComponent<AccordionProps> = ({
  alignIconRight = false,
  autoSetBodyHeight = true,
  border = false,
  children,
  customContent,
  customIcon = null,
  disableCollapse = false,
  disableIcon = false,
  expanded = null,
  focusable = true,
  iconColor,
  iconType = 'chevron',
  id,
  isTitleBold = false,
  onChange,
  onCollapsed,
  onExpanded,
  onRendered,
  selected = false,
  title,
  titleColor = '#000',
  transition = 'cubic-bezier(0.19, 1, 0.22, 1)',
  disableARIA,
  size = 'sm',
  animate = true,
  fullWidth = false,
  colorizeHeader = false,
  headerHeight = 40,
}: AccordionProps) => {
  // Generate unique IDs for the accordion and its body
  const accordionID = useRef(id || `accordion-${nanoid()}`);
  const accordionBodyId = useRef(`accordion-body-${nanoid()}`);

  // Create a reference to the accordion's div element
  const ref = useRef<HTMLDivElement | null>(null);

  // Define state variables for the accordion's open/closed state and body height
  const [open, setOpen] = useState(expanded);
  const [bodyHeight, setBodyHeight] = useState(0);

  // Define a function to toggle the accordion's open/closed state
  const toggleAccordion = useCallback(() => {
    enableCallback.current = true;

    setOpen(prev => {
      onChange?.(!prev);
      return !prev;
    });
  }, [onChange]);

  // Create a reference to track whether the callback function has been enabled
  const enableCallback = useRef(false);

  // Determine if this is the first render of the component
  const isFirstRender = useFirstRender();

  // Define the class name for the accordion's body
  const accordionBodyClass = useMemo(
    () =>
      cls(styles.body, {
        [styles.animate]: animate,
        [styles.close]: !open,
        [styles.open]: open && !isFirstRender.current,
      }),
    [open, animate, isFirstRender]
  );

  // Define the inline style for the accordion's body
  const style = useMemo(
    () => ({
      '--icon-color': iconColor,
      '--title-color': titleColor,
      '--transition': transition,
    }),
    [iconColor, titleColor, transition]
  );

  // Define the inline style for the accordion's body with height
  const styleWithHeight = useMemo(
    () =>
      style && !disableCollapse
        ? {
            ...style,
            '--max-height': open
              ? bodyHeight
                ? `${bodyHeight}px`
                : `${100}px`
              : '0px',
          }
        : {},
    [style, disableCollapse, open, bodyHeight]
  );

  // Define the class name for the accordion
  const accordionClass = useMemo(
    () =>
      cls(styles.accordion, {
        [styles['no-border']]: !border,
        [styles['open']]: open,
      }),
    [border, open]
  );

  // Define a callback function to set the ref to the accordion's div element
  const onInitRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      ref.current = node;
    }
  }, []);

  // Call the onExpanded or onCollapsed callback function when the accordion's open/closed state changes
  useEffect(() => {
    if (isFirstRender.current || !enableCallback.current) {
      return;
    }

    if (open) {
      onExpanded && onExpanded(accordionID.current);
    } else {
      onCollapsed && onCollapsed(accordionID.current);
    }
  }, [open, onExpanded, onCollapsed, isFirstRender]);

  // Set the accordion's open/closed state to the value of the expanded prop
  useEffect(() => {
    enableCallback.current = false;

    if (expanded !== null) {
      setOpen(expanded);
    }
  }, [expanded]);

  // Set the height of the accordion's body when it is rendered
  useEffect(() => {
    if (children && open) {
      const height = ref.current?.scrollHeight;

      if (height && autoSetBodyHeight) {
        setBodyHeight(height);
      }

      onRendered?.();
    }
  }, [children, open, autoSetBodyHeight, onRendered]);

  // Define the ARIA attributes for the accordion
  const ARIA = useMemo(
    () =>
      !disableARIA && {
        'aria-controls': accordionBodyId.current,
        'aria-expanded': open,
      },
    [disableARIA, open]
  );

  // Render the accordion
  return (
    <div className={accordionClass}>
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
        {...ARIA}
        selected={selected}
        customContent={customContent}
        size={size}
        fullWidth={fullWidth}
        colorizeHeader={colorizeHeader}
        headerHeight={headerHeight}
      />
      <div
        className={accordionBodyClass}
        style={(autoSetBodyHeight ? styleWithHeight : style) as CSSProperties}
        ref={onInitRef}
        id={accordionBodyId.current}
        aria-labelledby={accordionID.current}
        role="region"
      >
        {open ? (
          children
        ) : (
          <div
            style={{ height: `${bodyHeight}px`, visibility: 'hidden' }}
          ></div>
        )}
      </div>
    </div>
  );
};

// Set the display name for the Accordion component
Accordion.displayName = 'Accordion';

// Export the Accordion component
export { Accordion };
