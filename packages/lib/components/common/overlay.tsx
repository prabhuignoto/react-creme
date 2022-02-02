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
import { CloseIcon } from '../../icons';
import { OverlayProps } from './overlay-model';
import './overlay.scss';
import { OverlayContext, OverlayContextModel } from './withOverlay';

const Overlay: React.FunctionComponent<OverlayProps> = ({
  backdropColor = 'rgba(0, 0, 0, 0.5)',
  children,
  containedToParent = false,
  disableBackdrop,
  onClose,
  onOpen,
  overlayAnimation = true,
  placement,
  placementReference,
  showCloseButton = false,
  hideDocumentOverflow = false,
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

  /**
   * State to store the dimensions of the overlay content
   */
  const [overlayDimensions, setOverlayDimensions] = useState<{
    height: number;
    width: number;
  } | null>(null);

  // const [contentHeight, setContentHeight] = React.useState<number>(0);
  const [scrollPosition, setScrollPosition] = React.useState<number>(0);

  const overlayWrapperClass = useMemo(() => {
    return classNames(['rc-overlay-wrapper'], {
      'rc-overlay-contained': containedToParent,
      'rc-overlay-hide': hideOverlay,
    });
  }, [hideOverlay]);

  /**
   * Computes the placement style for the overlay content
   */
  const placementStyle = useMemo(() => {
    if (placementReference?.current && placement && overlayDimensions) {
      const child = placementReference?.current.firstChild as HTMLElement;
      const { top, left, right, height } = child.getBoundingClientRect();
      const positionRight = right - overlayDimensions.width;

      return {
        [placement === 'top' ? 'bottom' : 'top']: `${top + height}px`,
        left: `${context?.align === 'left' ? left : positionRight}px`,
        pointerEvents: 'all',
        position: 'absolute',
      } as CSSProperties;
    }
  }, [placementReference, scrollPosition, overlayDimensions?.width]);

  // event handlers

  /**
   *
   * Handles the overlay closure via Escape key
   */
  const handleClose = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Escape') {
      onClose?.();
      setHideOverlay(true);
    }
  };

  /**
   * checks if the child content has initiated a close operation
   */
  useEffect(() => {
    if (context?.childClosing) {
      setHideOverlay(true);
      onClose?.();

      if (hideDocumentOverflow) {
        document.body.style.overflow = 'auto';
      }
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
        setHideOverlay(true);
        onClose?.();
        document.body.style.overflow = 'auto';
      }
    },
    [overlayContentRef]
  );

  /**
   * Synchronizes the position of the overlay content with the scroll position
   */
  const handleWindowScroll = useCallback(
    () => setScrollPosition(window.scrollY),
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
      document.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  const onRef = useCallback(node => {
    const ele = node as HTMLDivElement;
    if (ele) {
      overlayRef.current = ele;

      setTimeout(() => {
        onOpen?.();
      }, 50);

      if (hideDocumentOverflow) {
        document.body.style.overflow = 'hidden';
      }
    }
  }, []);

  const onOverlayRef = useCallback(node => {
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
      style={{ backgroundColor: backdropColor }}
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
