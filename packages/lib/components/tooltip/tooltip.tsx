import { CloseIcon } from '@icons';
import classNames from 'classnames';
import React from 'react';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button } from '..';
import { withOverlay } from '../common/withOverlay';
import { OverlayModel } from '../common/overlay-model';
import { useFirstRender } from '../common/effects/useFirstRender';
import { isDark } from '../common/utils';
import { TooltipProps, ToolTipPosition } from './tooltip-model';
import styles from './tooltip.module.scss';

const mapTooltipPositionToOverlay = (
  position: ToolTipPosition
): { placement: 'top' | 'bottom' | 'left' | 'right'; align: 'left' | 'right' | 'center' } => {
  const [primary, secondary] = position.split(' ');
  
  if (primary === 'top' || primary === 'bottom') {
    return {
      placement: primary,
      align: (secondary === 'left' ? 'left' : secondary === 'right' ? 'right' : 'center') as 'left' | 'right' | 'center',
    };
  } else if (primary === 'left' || primary === 'right') {
    // For left/right placements, secondary (top/center/bottom) maps to vertical align
    // 'top' -> 'left' (top edge), 'bottom' -> 'right' (bottom edge), 'center' -> 'center'
    return {
      placement: primary,
      align: (secondary === 'top' ? 'left' : secondary === 'bottom' ? 'right' : 'center') as 'left' | 'right' | 'center',
    };
  }
  
  return { placement: 'bottom', align: 'center' };
};

interface TooltipContentProps extends OverlayModel<null> {
  message: string;
  size: 'sm' | 'md' | 'lg';
  minWidth: number;
  maxWidth: number;
  bgColor: string;
  foreColor: string;
  enablePadding: boolean;
  position: ToolTipPosition;
  openOnClick: boolean;
  onClose: () => void;
  isClosing?: boolean;
}

const TooltipContent: React.FunctionComponent<TooltipContentProps> = ({
  message,
  size,
  minWidth,
  maxWidth,
  bgColor,
  foreColor,
  enablePadding,
  position,
  openOnClick,
  onClose,
  isClosing,
}) => {
  const isDarkMode = useMemo(() => isDark(), []);
  const isFirstRender = useFirstRender();

  const toolTipMessageClass = useMemo(
    () =>
      classNames([
        styles.message,
        {
          [styles.hide_tooltip]: !isFirstRender.current && isClosing,
          [styles.with_padding]: enablePadding,
          [styles[`message_${size}`]]: size,
          [styles.show_tooltip]: !isClosing,
          [styles[`${position.split(' ')[0]}_${position.split(' ')[1]}`]]: true,
          [styles.dark]: isDarkMode,
        },
      ]),
    [isClosing, position, size, enablePadding, isDarkMode, isFirstRender]
  );

  const tooltipMessageStyle = useMemo(
    () =>
      ({
        '--max-width': `${maxWidth}px`,
        '--min-width': `${minWidth}px`,
        '--bg-color': bgColor,
        '--fore-color': foreColor,
      }) as React.CSSProperties,
    [maxWidth, minWidth, bgColor, foreColor]
  );

  return (
    <div
      className={toolTipMessageClass}
      style={tooltipMessageStyle}
      role="tooltip"
      aria-label="tooltip"
    >
      {openOnClick && (
        <div className={styles.close_btn_wrapper}>
          <Button type="icon" onClick={onClose} size={size}>
            <CloseIcon />
          </Button>
        </div>
      )}
      {message}
    </div>
  );
};

const TooltipOverlay = withOverlay<TooltipContentProps, null>(
  TooltipContent,
  {
    backdropColor: 'transparent',
    disableBackdrop: true,
    disableAnimation: false,
  }
);


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
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // state to show/hide the tooltip
  const [showTooltip, setShowTooltip] = useState(isStatic);

  const overlayPosition = useMemo(
    () => mapTooltipPositionToOverlay(position),
    [position]
  );

  // handlers for showing/hiding tooltip
  const onShow = useCallback(
    () => !isStatic && setShowTooltip(true),
    [isStatic]
  );
  const onHide = useCallback(
    () => !isStatic && setShowTooltip(false),
    [isStatic]
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
    [fixedAtCenter, isStatic]
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
    [onShow, onHide]
  );

  const handleClose = useCallback(() => {
    setShowTooltip(false);
  }, []);

  useEffect(() => {
    if (showTooltip || isStatic) {
      onTooltipRendered?.();
    }
  }, [showTooltip, isStatic, onTooltipRendered]);

  return (
    <>
      <div
        className={tooltipWrapperClass}
        ref={wrapperRef}
        aria-label="tooltip"
      >
        <section className={styles.host_content} {...eventProps}>
          {children}
        </section>
      </div>
      {(showTooltip || isStatic) && (
        <TooltipOverlay
          placement={overlayPosition.placement}
          align={overlayPosition.align}
          placementReference={wrapperRef as React.RefObject<HTMLElement>}
          placementOffset={15}
          message={message}
          size={size}
          minWidth={minWidth}
          maxWidth={maxWidth}
          bgColor={bgColor}
          foreColor={foreColor}
          enablePadding={enablePadding}
          position={position}
          openOnClick={openOnClick}
          onClose={handleClose}
        />
      )}
    </>
  );
};

Tooltip.displayName = 'Tooltip';

export { Tooltip };
