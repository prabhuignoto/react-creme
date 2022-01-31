import classNames from 'classnames';
import React, {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';
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
  overlayAnimation = true,
  placement,
  placementReference,
  showCloseButton = false,
  hideDocumentOverflow = false,
}) => {
  const context = useContext(OverlayContext) as OverlayContextModel;

  const [hideOverlay, setHideOverlay] =
    React.useState<boolean>(overlayAnimation);
  const overlayWrapperClass = useMemo(() => {
    return classNames(['rc-overlay-wrapper'], {
      'rc-overlay-contained': containedToParent,
      'rc-overlay-hide': hideOverlay,
    });
  }, [hideOverlay]);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayContentRef = useRef<HTMLDivElement | null>(null);

  const [contentHeight, setContentHeight] = React.useState<number>(0);
  const [scrollPosition, setScrollPosition] = React.useState<number>(0);

  // setup the observer for position the overlay content
  const observer = useRef<ResizeObserver>();
  if (placementReference?.current) {
    observer.current = new ResizeObserver(entries => {
      const contentHeight = entries[0].contentRect.height;
      setContentHeight(contentHeight);
    });

    observer.current.observe(placementReference?.current as HTMLElement);
  }

  // computes the style for the overlay content
  const placementStyle = useMemo(() => {
    if (placementReference?.current && placement && overlayContentRef.current) {
      const child = placementReference?.current.firstChild as HTMLElement;
      const { top, left, right } = child.getBoundingClientRect();
      const positionRight = right - overlayContentRef.current.offsetWidth;
      return {
        [placement === 'top' ? 'bottom' : 'top']: `${top + contentHeight}px`,
        left: `${context?.align === 'left' ? left : positionRight}px`,
        pointerEvents: 'all',
        position: 'absolute',
      } as CSSProperties;
    }
  }, [
    placementReference,
    placement,
    contentHeight,
    scrollPosition,
    overlayContentRef,
  ]);

  // event handlers

  // handles closure
  const handleClose = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Escape') {
      onClose?.();
      setHideOverlay(true);
    }
  };

  useEffect(() => {
    if (context?.childClosing) {
      setHideOverlay(true);
      onClose?.();

      if (hideDocumentOverflow) {
        document.body.style.overflow = 'auto';
      }
    }
  }, [context?.childClosing]);

  // closes the overlay when clicked on the document
  const handleCloseOnClick = useCallback((ev: React.MouseEvent) => {
    const overlayContent = overlayContentRef.current;
    if (overlayContent && !overlayContent.contains(ev.target as HTMLElement)) {
      setHideOverlay(true);
      onClose?.();
    }
  }, []);

  // sync the position on scroll
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
      observer?.current?.disconnect();
    };
  }, []);

  const onRef = useCallback(
    node => {
      const ele = node as HTMLDivElement;
      if (ele) {
        overlayRef.current = ele;

        ele.focus();

        if (hideDocumentOverflow) {
          document.body.style.overflow = 'hidden';
        }
      }
    },
    [overlayContentRef]
  );

  const onOverlayContentRef = useCallback(node => {
    const ele = node as HTMLDivElement;
    if (ele) {
      overlayContentRef.current = ele;
    }
  }, []);

  return !disableBackdrop ? (
    <div
      className={overlayWrapperClass}
      onClick={handleCloseOnClick}
      onKeyUp={handleClose}
      data-testid="rc-overlay"
      ref={onRef}
      tabIndex={0}
      style={{ backgroundColor: backdropColor }}
    >
      {placement ? (
        <div
          style={placementStyle}
          className="rc-overlay-content-wrapper"
          ref={onOverlayContentRef}
        >
          {children}
        </div>
      ) : (
        children
      )}
      {showCloseButton && (
        <span className={`rc-overlay-close-btn`} onClick={onClose}>
          <CloseIcon />
        </span>
      )}
    </div>
  ) : (
    <div
      style={placementStyle}
      className="rc-overlay-content-wrapper"
      ref={overlayContentRef}
    >
      {children}
    </div>
  );
};

export { Overlay };
