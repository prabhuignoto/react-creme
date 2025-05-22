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
  name?: string;
  placement?: 'bottom' | 'top';
};

export type OverlayContextModel = {
  align?: 'left' | 'right' | 'center';
  childClosing?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

export const OverlayContext = React.createContext<OverlayContextModel | null>(
  null
);

const withOverlay = function <T extends OverlayModel<U>, U>(
  Node:
    | React.FunctionComponent<T & { isClosing?: boolean; onClose?: () => void }>
    | React.ForwardRefExoticComponent<
        T & { isClosing?: boolean; onClose?: () => void }
      >,
  settings: Settings = {
    backdropColor: 'rgba(0,0,0,0.5)',
    disableAnimation: false,
    disableBackdrop: false,
    hideDocumentOverflow: false,
    name: '',
  }
) {
  const Component = React.forwardRef<HTMLElement, T>((props, ref) => {
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
      leftOffset,
      // name
    } = props;

    const {
      backdropColor,
      disableBackdrop,
      disableAnimation,
      hideDocumentOverflow,
      name,
    } = settings;
    const [portalWrapperCreated, setPortalWrapperCreated] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const portalContainer = useRef<HTMLElement | null>(null);

    const [childInvokedClose, setChildInvokedClose] = useState(false);

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
              leftOffset={leftOffset}
              name={name}
            >
              <Node
                {...(props as T)}
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
