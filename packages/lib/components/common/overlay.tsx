import { CloseIcon } from '@icons';
import classNames from 'classnames';
import React, {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { OverlayProps } from './overlay-model';
import './overlay.scss';
import { OverlayContext, OverlayContextModel } from './withOverlay';

const Overlay: React.FunctionComponent<OverlayProps> = ({
  backdropColor = 'rgba(0, 0, 0, 0.5)',
  children,
  containedToParent = false,
  disableBackdrop,
  hideDocumentOverflow = false,
  onClose,
  onOpen,
  overlayAnimation = true,
  placement,
  placementOffset = 0,
  placementReference,
  showCloseButton = false,
  leftOffset = 0,
  name,
}) => {
  const context = useContext(OverlayContext) as OverlayContextModel;

  /**
   * State that controls the visibility of the overlay.
   */
  const [hideOverlay, setHideOverlay] =
    React.useState<boolean>(overlayAnimation);

  /**
   * Refs
   */
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayContentRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const scrollListenersRef = useRef<Set<HTMLElement | Document>>(new Set());
  const [retriggerStyleCal, setRetriggerStyleCal] = useState<number>(0);

  /**
   * State to store the dimensions of the overlay content
   */
  const [overlayDimensions, setOverlayDimensions] = useState<{
    height: number;
    width: number;
  } | null>(null);

  const retrigger = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      setRetriggerStyleCal(prev => prev + 1);
      rafIdRef.current = null;
    });
  }, []);

  const overlayWrapperClass = useMemo(() => {
    return classNames(['rc-overlay-wrapper'], {
      'disable-pointer-events':
        disableBackdrop || backdropColor === 'transparent',
      'rc-overlay-contained': containedToParent,
      'rc-overlay-hide': hideOverlay,
    });
  }, [hideOverlay]);

  /**
   * Computes the placement style for the overlay content
   */
  const placementStyle = useMemo(() => {
    const placementRef = placementReference?.current;
    const overlayRef = overlayContentRef.current;

    if (placementRef && placement && overlayDimensions && overlayRef) {
      const child = placementRef.firstChild as HTMLElement;
      const { top, left, right, bottom, height, width } = child.getBoundingClientRect();
      const overlayChild = overlayRef.firstChild as HTMLElement;
      const overlayWidth = overlayDimensions.width;
      const overlayHeight = overlayDimensions.height;

      // Handle vertical placements (top/bottom)
      if (placement === 'top' || placement === 'bottom') {
        const positionRight = right - overlayWidth + leftOffset;
        const verticalProp = placement === 'top' ? 'bottom' : 'top';
        const verticalValue = placement === 'top' 
          ? window.innerHeight - top + placementOffset
          : top + height + placementOffset;

        return {
          [verticalProp]: `${verticalValue}px`,
          left: `${
            context?.align === 'left'
              ? left + leftOffset
              : context.align === 'center'
                ? left +
                  Math.round(width / 2) -
                  Math.round(overlayChild.clientWidth / 2) +
                  leftOffset
                : positionRight
          }px`,
          pointerEvents: 'all',
          position: 'fixed',
        } as CSSProperties;
      }

      // Handle horizontal placements (left/right)
      if (placement === 'left' || placement === 'right') {
        const horizontalProp = placement === 'left' ? 'right' : 'left';
        const horizontalValue = placement === 'left'
          ? window.innerWidth - left + placementOffset
          : right + placementOffset;
        const positionBottom = bottom - overlayHeight;
        const verticalCenter = top + Math.round(height / 2) - Math.round(overlayHeight / 2);

        // For left/right placements, align maps to vertical alignment
        // 'left' = top, 'right' = bottom, 'center' = center
        return {
          [horizontalProp]: `${horizontalValue}px`,
          top: `${
            context?.align === 'left'
              ? top + leftOffset
              : context.align === 'right'
                ? positionBottom
                : verticalCenter
          }px`,
          pointerEvents: 'all',
          position: 'fixed',
        } as CSSProperties;
      }
    }
    
    return {} as CSSProperties;
  }, [placementReference, retriggerStyleCal, overlayDimensions, placement, context, leftOffset, placementOffset]);

  /**
   * Finds all scrollable parent elements of the placement reference
   */
  const getScrollableParents = useCallback((element: HTMLElement | null): (HTMLElement | Document)[] => {
    const scrollableParents: (HTMLElement | Document)[] = [document];
    
    if (!element) return scrollableParents;

    let current: HTMLElement | null = element;
    while (current && current !== document.body && current !== document.documentElement) {
      const style = window.getComputedStyle(current);
      const overflowY = style.overflowY;
      const overflowX = style.overflowX;
      const isScrollable = 
        (overflowY === 'auto' || overflowY === 'scroll') ||
        (overflowX === 'auto' || overflowX === 'scroll');
      
      if (isScrollable && current.scrollHeight > current.clientHeight) {
        scrollableParents.push(current);
      }
      
      current = current.parentElement;
    }
    
    return scrollableParents;
  }, []);

  /**
   * Synchronizes the position of the overlay content with the scroll position
   * Uses requestAnimationFrame for smooth, performant updates
   */
  const handleScroll = useCallback(() => {
    retrigger();
  }, [retrigger]);

  const closeProcess = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    
    const eventOptions = { capture: true, passive: true } as AddEventListenerOptions;
    scrollListenersRef.current.forEach(listener => {
      if (listener === document) {
        document.removeEventListener('scroll', handleScroll, eventOptions);
      } else {
        (listener as HTMLElement).removeEventListener('scroll', handleScroll, eventOptions);
      }
    });
    scrollListenersRef.current.clear();
    
    observer.current?.disconnect();
    onClose?.();
    setHideOverlay(true);

    if (hideDocumentOverflow) {
      // document.body.style.overflow = 'auto';
    }
  }, [handleScroll, onClose, hideDocumentOverflow]);

  /**
   *
   * Handles the overlay closure via Escape key
   */
  const handleClose = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Escape') {
      closeProcess();
    }
  };

  /**
   * checks if the child content has initiated a close operation
   */
  useEffect(() => {
    if (context?.childClosing) {
      closeProcess();
    }
  }, [context?.childClosing, closeProcess]);

  /**
   * Closes the overlay when click outside of the overlay content
   */
  const handleCloseOnClick = useCallback(
    (ev: React.MouseEvent) => {
      const overlayContent = overlayContentRef.current;
      if (
        overlayContent &&
        !overlayContent.contains(ev.target as HTMLElement)
      ) {
        closeProcess();
      }
    },
    [closeProcess]
  );

  // onMount process
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (hideDocumentOverflow) {
      document.body.style.overflow = 'hidden';
    }

    const scrollableParents = getScrollableParents(placementReference?.current || null);
    const eventOptions = { capture: true, passive: true } as AddEventListenerOptions;

    scrollableParents.forEach(parent => {
      if (parent === document) {
        document.addEventListener('scroll', handleScroll, eventOptions);
      } else {
        (parent as HTMLElement).addEventListener('scroll', handleScroll, eventOptions);
      }
      scrollListenersRef.current.add(parent);
    });

    if (overlayAnimation) {
      setHideOverlay(false);
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      
      scrollListenersRef.current.forEach(listener => {
        if (listener === document) {
          document.removeEventListener('scroll', handleScroll, eventOptions);
        } else {
          (listener as HTMLElement).removeEventListener('scroll', handleScroll, eventOptions);
        }
      });
      scrollListenersRef.current.clear();
      
      if (hideDocumentOverflow) {
        document.body.style.overflow = originalOverflow;
      }
    };
  }, [hideDocumentOverflow, handleScroll, overlayAnimation, placementReference, getScrollableParents]);

  const onRef = useCallback((node: HTMLDivElement) => {
    const ele = node as HTMLDivElement;
    if (ele) {
      overlayRef.current = ele;

      if (observer.current) {
        observer.current.disconnect();
      }
      
      observer.current = new ResizeObserver(retrigger);
      observer.current.observe(ele);

      onOpen?.();
    }
  }, [retrigger, onOpen]);

  const onOverlayRef = useCallback((node: HTMLDivElement) => {
    const ele = node as HTMLDivElement;
    if (ele) {
      overlayContentRef.current = ele;

      setOverlayDimensions({
        height: ele.clientHeight,
        width: ele.clientWidth,
      });
    }
  }, []);

  /**
   * Custom placement style. Fixes an edge case where the overlay content is not yet positioned correctly.
   * we would want to hide the overlay content until the overlay is positioned correctly.
   */
  const customPlacementStyle = useMemo<CSSProperties>(() => {
    if (placement && placementStyle && Object.keys(placementStyle).length > 0) {
      return placementStyle;
    }

    if (placement && (!placementStyle || Object.keys(placementStyle).length === 0)) {
      return {
        visibility: 'hidden',
      };
    }

    return {};
  }, [placementStyle, placement]);

  return !disableBackdrop ? (
    <div
      className={overlayWrapperClass}
      onClick={handleCloseOnClick}
      data-testid="rc-overlay"
      ref={onRef}
      style={{
        backgroundColor: backdropColor,
        zIndex: `var(--rc-zIndex-${name})`,
      }}
      onKeyUp={handleClose}
      role="presentation"
    >
      <div
        style={customPlacementStyle}
        className="rc-overlay-content-wrapper"
        ref={onOverlayRef}
      >
        {children}
      </div>
      {showCloseButton && (
        <span
          className={`rc-overlay-close-btn`}
          onClick={onClose}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClose?.();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close overlay"
        >
          <CloseIcon />
        </span>
      )}
    </div>
  ) : (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      style={customPlacementStyle}
      data-testid="rc-overlay"
      className="rc-overlay-content-wrapper"
      onKeyUp={handleClose}
      ref={onOverlayRef}
      role="dialog"
    >
      {children}
    </div>
  );
};

export { Overlay };
