/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Overlay } from './overlay';
import { OverlayModel } from './overlay-model';
import './overlay.scss';

type Settings = {
  backdropColor?: string;
  disableAnimation?: boolean;
  disableBackdrop?: boolean;
  hideDocumentOverflow?: boolean;
  placement?: 'bottom' | 'top';
};

// type OverlayFunc = <U extends OverlayModel<T>>(
//   Node: React.FunctionComponent<U>,
//   settings: Settings
// ) => React.ForwardRefExoticComponent<
//   React.PropsWithoutRef<U> & React.RefAttributes<HTMLElement>
// >;

export type OverlayContextModel = {
  align?: 'left' | 'right';
  childClosing?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

export const OverlayContext = React.createContext<OverlayContextModel | null>(
  null
);

const withOverlay = function <T extends OverlayModel<U>, U>(
  Node: React.FunctionComponent<T> | React.ForwardRefExoticComponent<T>,
  settings: Settings = {
    backdropColor: 'rgba(0,0,0,0.5)',
    disableAnimation: false,
    disableBackdrop: false,
    hideDocumentOverflow: false,
  }
) {
  const Component = React.forwardRef<HTMLElement, T>((props: T, ref) => {
    const classPrefix = useRef('overlay');
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const {
      showClose,
      onClose,
      onOpen,
      containedToParent,
      placementReference,
      placement,
      overlayAnimation,
      align,
      data,
      placementOffset,
    } = props;

    const {
      backdropColor,
      disableBackdrop,
      disableAnimation,
      hideDocumentOverflow,
    } = settings;
    const [portalWrapperCreated, setPortalWrapperCreated] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const portalContainer = useRef<HTMLElement | null>(null);

    const [childInvokedClose, setChildInvokedClose] = useState(false);

    console.log(data);

    useEffect(() => {
      if (containedToParent?.current) {
        portalContainer.current = containedToParent.current;
        portalContainer.current.style.position = 'relative';
        setPortalWrapperCreated(true);
      } else {
        overlayRef.current = document.createElement('div');
        overlayRef.current.className = `${classPrefix.current}-portal-wrapper`;
        document.body.appendChild(overlayRef.current);
        portalContainer.current = overlayRef.current;
        setPortalWrapperCreated(true);

        return () => {
          document.body.removeChild(overlayRef.current as HTMLElement);
        };
      }
    }, []);

    const handleClose = useCallback(() => {
      setIsClosing(true);

      if (!disableAnimation) {
        setTimeout(() => {
          setPortalWrapperCreated(false);
          onClose && onClose();
        }, 250);
      } else {
        setPortalWrapperCreated(false);
        onClose && onClose();
      }
    }, []);

    const handleChildClose = useCallback(() => setChildInvokedClose(true), []);

    return portalWrapperCreated
      ? ReactDOM.createPortal(
          <OverlayContext.Provider
            value={{
              align,
              childClosing: childInvokedClose,
              data,
            }}
          >
            <Overlay
              showCloseButton={showClose}
              onClose={handleClose}
              onOpen={onOpen}
              placement={placement}
              placementReference={placementReference}
              backdropColor={backdropColor}
              containedToParent={!!containedToParent}
              overlayAnimation={overlayAnimation}
              disableBackdrop={disableBackdrop}
              hideDocumentOverflow={hideDocumentOverflow}
              placementOffset={placementOffset}
            >
              <Node
                {...props}
                onClose={handleChildClose}
                isClosing={isClosing}
                ref={ref}
              />
            </Overlay>
          </OverlayContext.Provider>,
          portalContainer.current as HTMLElement
        )
      : null;
  });

  Component.displayName = `withOverlay`;

  return Component;
};

export { withOverlay };
