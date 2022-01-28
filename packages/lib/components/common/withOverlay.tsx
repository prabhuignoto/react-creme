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

type OverlayFunc = <U extends OverlayModel>(
  Node: React.FunctionComponent<U>,
  settings: Settings
) => React.FunctionComponent<U>;

export type OverlayContextModel = {
  align?: 'left' | 'right';
  childClosing?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

export const OverlayContext = React.createContext<OverlayContextModel | null>(
  null
);

const withOverlay: OverlayFunc = function <T extends OverlayModel>(
  Node: React.FunctionComponent<T>,
  settings: Settings = {
    backdropColor: 'rgba(0,0,0,0.5)',
    disableAnimation: false,
    disableBackdrop: false,
    hideDocumentOverflow: false,
  }
) {
  const Component = (props: T) => {
    const classPrefix = useRef('overlay');
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const {
      showClose,
      onClose,
      containedToParent,
      placementReference,
      placement,
      overlayAnimation,
      align,
      data,
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
              placement={placement}
              placementReference={placementReference}
              backdropColor={backdropColor}
              containedToParent={!!containedToParent}
              overlayAnimation={overlayAnimation}
              disableBackdrop={disableBackdrop}
              hideDocumentOverflow={hideDocumentOverflow}
            >
              <Node
                {...props}
                onClose={handleChildClose}
                isClosing={isClosing}
              />
            </Overlay>
          </OverlayContext.Provider>,
          portalContainer.current as HTMLElement
        )
      : null;
  };

  return Component;
};

export { withOverlay };
