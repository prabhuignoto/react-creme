import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Overlay } from "./overlay";
import { OverlayModel } from "./overlay-model";
import "./overlay.scss";

type Settings = {
  disableAnimation?: boolean;
  backdropColor?: string;
  placement?: "bottom" | "top";
  disableBackdrop?: boolean;
};

type OverlayFunc = <U extends OverlayModel>(
  Node: React.FunctionComponent<U>,
  settings: Settings
) => React.FunctionComponent<U>;

export const OverlayContext =
  React.createContext<{ align?: "left" | "right" }>(null);

const withOverlay: OverlayFunc = function <T extends OverlayModel>(
  Node: React.FunctionComponent<T>,
  settings: Settings = {
    disableAnimation: false,
    backdropColor: "rgba(0,0,0,0.5)",
    disableBackdrop: false,
  }
) {
  return (props: T) => {
    const classPrefix = useRef("overlay");
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const {
      showClose,
      onClose,
      containedToParent,
      placementReference,
      placement,
      overlayAnimation,
      align,
    } = props;
    const { backdropColor, disableBackdrop } = settings;
    const [portalWrapperCreated, setPortalWrapperCreated] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const portalContainer = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (containedToParent?.current) {
        portalContainer.current = containedToParent.current;
        portalContainer.current.style.position = "relative";
        setPortalWrapperCreated(true);
      } else {
        overlayRef.current = document.createElement("div");
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

      setTimeout(() => {
        setPortalWrapperCreated(false);
        onClose && onClose();
      }, 250);
    }, []);

    return portalWrapperCreated
      ? ReactDOM.createPortal(
          <OverlayContext.Provider value={{ align }}>
            <Overlay
              showCloseButton={showClose}
              onClose={handleClose}
              placement={placement}
              placementReference={placementReference}
              backdropColor={backdropColor}
              containedToParent={!!containedToParent}
              overlayAnimation={overlayAnimation}
              disableBackdrop={disableBackdrop}
            >
              <Node {...props} onClose={handleClose} isClosing={isClosing} />
            </Overlay>
          </OverlayContext.Provider>,
          portalContainer.current as HTMLElement
        )
      : null;
  };
};

export { withOverlay };
