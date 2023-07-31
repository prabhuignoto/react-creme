import { CloseIcon } from '@icons';
import classNames from 'classnames';
import React from 'react';
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button } from '..';
import { useFirstRender } from '../common/effects/useFirstRender';
import { usePosition } from '../common/effects/usePosition';
import { isDark } from '../common/utils';
import { TooltipProps } from './tooltip-model';
import styles from './tooltip.module.scss';

// Tooltip component for displaying helpful information in a small pop-up box.
const Tooltip: React.FunctionComponent<TooltipProps> = ({
  children,
  fixedAtCenter = false,
  isStatic = false,
  message,
  onTooltipRendered,
  position = 'bottom center',
  minWidth = 150,
  maxWidth = 300,
  bgColor = '#fff',
  foreColor = '#000',
  size = 'sm',
  openOnClick = false,
  enablePadding = true,
}: TooltipProps) => {
  // Reference to the tooltip and wrapper div elements
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // Check for the component's first render
  const isFirstRender = useFirstRender();

  // State for showing/hiding the tooltip
  const [showTooltip, setShowTooltip] = useState(isStatic);

  // Helper function for tooltip positioning
  const { position: cssPosition, onInit } = usePosition(
    wrapperRef,
    tooltipRef,
    position,
    {
      alignToEdge: true,
      spacing: 15,
    }
  );

  // Handlers for showing/hiding the tooltip
  const onShow = useCallback(
    () => !isStatic && setShowTooltip(true),
    [isStatic]
  );
  const onHide = useCallback(
    () => !isStatic && setShowTooltip(false),
    [isStatic]
  );

  // Check for dark mode
  const isDarkMode = useMemo(() => isDark(), []);

  // Tooltip CSS class configuration
  const toolTipMessageClass = useMemo(
    () =>
      classNames([
        styles.message,
        {
          [styles.hide_tooltip]: !isFirstRender.current && !showTooltip,
          [styles.with_padding]: enablePadding,
          [styles[`message_${size}`]]: size,
          [styles.show_tooltip]: showTooltip,
          [styles[`${position.split(' ')[0]}_${position.split(' ')[1]}`]]: true,
          [styles.dark]: isDarkMode,
        },
      ]),
    [showTooltip, position]
  );

  const tooltipWrapperClass = useMemo(
    () =>
      classNames([
        styles.wrapper,
        {
          [styles.fixed]: fixedAtCenter,
          [styles.static]: isStatic,
        },
      ]),
    [fixedAtCenter]
  );

  const tooltipMessageStyle = useMemo(() => {
    if (cssPosition) {
      return {
        ...cssPosition,
        '--max-width': `${maxWidth}px`,
        '--min-width': `${minWidth}px`,
      };
    } else {
      return {
        '--max-width': `${maxWidth}px`,
        '--min-width': `${minWidth}px`,
      };
    }
  }, [cssPosition]);

  const onRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      wrapperRef.current = node;
      onInit();
    }
  }, []);

  // On tooltip rendered
  useEffect(() => {
    if (cssPosition) {
      onTooltipRendered?.();
    }
  }, [cssPosition]);

  const style = useMemo(
    () =>
      ({
        '--bg-color': bgColor,
        '--fore-color': foreColor,
      }) as CSSProperties,
    []
  );

  const eventProps = useMemo(
    () =>
      openOnClick
        ? {
            onClick: onShow,
          }
        : {
            onMouseEnter: onShow,
            onMouseLeave: onHide,
          },
    []
  );

  const handleClose = useCallback(() => {
    setShowTooltip(false);
  }, []);

  return (
    <div
      className={tooltipWrapperClass}
      ref={onRef}
      role="tooltip"
      style={style}
      aria-label="tooltip"
    >
      <div
        className={toolTipMessageClass}
        style={tooltipMessageStyle}
        ref={tooltipRef}
      >
        {openOnClick && (
          <div className={styles.close_btn_wrapper}>
            <Button type="icon" onClick={handleClose} size={size}>
              <CloseIcon />
            </Button>
          </div>
        )}
        {message}
      </div>
      <section className={styles.host_content} {...eventProps}>
        {children}
      </section>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

export { Tooltip };
