import cls from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
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
import './accordion.scss';

const Accordion: React.FunctionComponent<AccordionProps> = React.memo(
  ({
    customIcon = null,
    alignIconRight = false,
    border = false,
    children,
    disableCollapse = false,
    disableIcon = false,
    iconType = 'chevron',
    expanded = null,
    focusable = true,
    iconColor,
    id,
    isTitleBold = false,
    onCollapsed,
    onExpanded,
    title,
    titleColor = '#000',
    transition = 'cubic-bezier(0.19, 1, 0.22, 1)',
    onRendered,
    autoSetBodyHeight = true,
    onChange,
    selected = false,
    customContent,
  }: AccordionProps) => {
    const accordionID = useRef(id || `accordion-${nanoid()}`);
    const accordionBodyId = useRef(`accordion-body-${nanoid()}`);

    const ref = useRef<HTMLDivElement | null>(null);

    const [open, setOpen] = useState(expanded);
    const [bodyHeight, setBodyHeight] = useState(0);

    const toggleAccordion = useCallback(() => {
      enableCallback.current = true;

      setOpen(prev => {
        onChange?.(!prev);
        return !prev;
      });
    }, [open]);

    const enableCallback = useRef(false);
    const isFirstRender = useFirstRender();

    const accordionBodyClass = useMemo(
      () =>
        cls('rc-accordion-body', {
          'rc-accordion-close': !open,
          'rc-accordion-open': open && !isFirstRender.current,
        }),
      [open]
    );

    const style = useMemo(
      () => ({
        '--icon-color': iconColor,
        '--title-color': titleColor,
        '--transition': transition,
      }),
      [open, bodyHeight]
    );

    const styleWithHeight = useMemo(
      () =>
        style
          ? {
              ...style,
              '--max-height': open
                ? bodyHeight
                  ? `${bodyHeight}px`
                  : `${100}px`
                : '0px',
            }
          : {},
      [autoSetBodyHeight, bodyHeight, style, open]
    );

    const accordionClass = useMemo(
      () =>
        cls('rc-accordion', {
          'rc-accordion-no-border': !border,
          'rc-accordion-open': open,
        }),
      [border, open, alignIconRight]
    );

    const onInitRef = useCallback(node => {
      if (node) {
        ref.current = node as HTMLDivElement;
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

    useEffect(() => {
      if (children) {
        const height = ref.current?.scrollHeight;

        if (height && autoSetBodyHeight) {
          setBodyHeight(height);
        }

        onRendered?.();
      }
    }, [children]);

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
          aria-controls={accordionBodyId.current}
          aria-expanded={open}
          selected={selected}
          customContent={customContent}
        />
        <div
          className={accordionBodyClass}
          style={(autoSetBodyHeight ? styleWithHeight : style) as CSSProperties}
          // style={style}
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

Accordion.displayName = 'Accordion';

export { Accordion };
