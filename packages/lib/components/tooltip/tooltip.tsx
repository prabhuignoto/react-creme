import classNames from 'classnames';
import * as React from 'react';
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CloseIcon } from '../../icons';
import { useFirstRender } from '../common/effects/useFirstRender';
import { usePosition } from '../common/effects/usePosition';
import { TooltipProps } from './tooltip-model';
import './tooltip.scss';

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
}: TooltipProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // flag to check if the component is rendering for the first time
  const isFirstRender = useFirstRender();

  // state to show/hide the tooltip
  const [showTooltip, setShowTooltip] = useState(isStatic);

  // helper to position the tooltip
  const cssPosition = usePosition(wrapperRef, tooltipRef, position, {
    alignToEdge: true,
    spacing: 15,
  });

  // handlers for showing/hiding tooltip
  const onShow = useCallback(
    () => !isStatic && setShowTooltip(true),
    [isStatic]
  );
  const onHide = useCallback(
    () => !isStatic && setShowTooltip(false),
    [isStatic]
  );

  // CSS
  const toolTipMessageClass = useMemo(
    () =>
      classNames([
        'rc-tooltip-message',
        {
          'hide-tooltip': !isFirstRender.current && !showTooltip,
          'show-tooltip': showTooltip,
          [`rc-tooltip-message-${size}`]: size,
          [`rc-tooltip-${position.split(' ')[0]}-${position.split(' ')[1]}`]:
            true,
        },
      ]),
    [showTooltip, position]
  );

  const tooltipWrapperClass = useMemo(
    () =>
      classNames([
        'rc-tooltip-wrapper',
        {
          'rc-tooltip-fixed': fixedAtCenter,
          'rc-tooltip-static': isStatic,
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

  const onRef = useCallback(node => {
    if (node) {
      wrapperRef.current = node;
    }
  }, []);

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
      } as CSSProperties),
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
          <span
            role="button"
            className="rc-tooltip-close-btn"
            onClick={handleClose}
          >
            <CloseIcon />
          </span>
        )}
        {message}
      </div>
      <section className="rc-tooltip-host-content" {...eventProps}>
        {children}
      </section>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

export { Tooltip };
