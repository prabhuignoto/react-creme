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
import { useDebouncedCallback } from 'use-debounce';
import { OverlayProps } from './overlay-model';
import './overlay.scss';
import { OverlayContext, OverlayContextModel } from './withOverlay';
import ResizeObserver from 'resize-observer-polyfill';

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
  const [retriggerStyleCal, setRetriggerStyleCal] = useState<number>(0);

  /**
   * State to store the dimensions of the overlay content
   */
  const [overlayDimensions, setOverlayDimensions] = useState<{
    height: number;
    width: number;
  } | null>(null);

  const retrigger = useDebouncedCallback(() => {
    setRetriggerStyleCal(new Date().getTime());
  }, 25);

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
      const { top, left, right, height, width } = child.getBoundingClientRect();
      const positionRight = right - overlayDimensions.width + leftOffset;
      const overlayChild = overlayRef.firstChild as HTMLElement;

      return {
        [placement === 'top' ? 'bottom' : 'top']: `${
          top + height + placementOffset
        }px`,
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
        position: 'absolute',
      } as CSSProperties;
    }
  }, [placementReference, retriggerStyleCal, overlayDimensions?.width]);

  // event handlers

  const closeProcess = useCallback(() => {
    document.removeEventListener('scroll', handleWindowScroll);
    observer.current?.disconnect();
    onClose?.();
    setHideOverlay(true);

    if (hideDocumentOverflow) {
      // document.body.style.overflow = 'auto';
    }
  }, []);

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
  }, [context?.childClosing]);

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
    [overlayContentRef]
  );

  /**
   * Synchronizes the position of the overlay content with the scroll position
   */
  const handleWindowScroll = useCallback(
    () => setRetriggerStyleCal(new Date().getTime()),
    []
  );

  // onMount process
  useEffect(() => {
    document.addEventListener('scroll', handleWindowScroll);

    if (overlayAnimation) {
      setHideOverlay(false);
    }

    // cleanup
    return () => {
      // document.removeEventListener('scroll', handleWindowScroll);
      // observer.current?.disconnect();
    };
  }, []);

  const onRef = useCallback((node: HTMLDivElement) => {
    const ele = node as HTMLDivElement;
    if (ele) {
      overlayRef.current = ele;

      observer.current = new ResizeObserver(retrigger);

      observer.current.observe(ele);

      onOpen?.();
      // setTimeout(() => {
      // }, 50);
    }
  }, []);

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
    if (placement && placementStyle) {
      return placementStyle;
    }

    if (placement && !placementStyle) {
      return {
        visibility: 'hidden',
      };
    }

    return {};
  }, [JSON.stringify(placementStyle), placement]);

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
    >
      <div
        style={customPlacementStyle}
        className="rc-overlay-content-wrapper"
        ref={onOverlayRef}
      >
        {children}
      </div>
      {showCloseButton && (
        <span className={`rc-overlay-close-btn`} onClick={onClose}>
          <CloseIcon />
        </span>
      )}
    </div>
  ) : (
    <div
      style={customPlacementStyle}
      data-testid="rc-overlay"
      className="rc-overlay-content-wrapper"
      onKeyUp={handleClose}
      ref={onOverlayRef}
    >
      {children}
    </div>
  );
};

export { Overlay };
