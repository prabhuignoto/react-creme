import classNames from "classnames";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "../../icons";
import { OverlayModel, OverlayProps } from "./overlay-model";
import "./overlay.scss";

const Overlay: React.FunctionComponent<OverlayProps> = ({
  children,
  close,
  onClose,
  showCloseButton = false,
  disableAnimation = false,
  disableBackdrop,
}) => {
  const classPrefix = useRef("overlay");

  const overlayClass = useMemo(
    () =>
      classNames([
        `${classPrefix.current}-content-wrapper"`,
        !close
          ? `${classPrefix.current}-content-open`
          : `${classPrefix.current}-content-close`,
        disableAnimation ? "disable-anim" : "",
      ]),
    [close]
  );
  const overlayWrapperClass = useMemo(() => {
    return classNames([
      `${classPrefix.current}-wrapper`,
      disableBackdrop ? "disable-backdrop" : "",
    ]);
  }, []);

  const handleClose = (ev: React.MouseEvent) => {
    const classes = Array.from((ev.target as HTMLElement).classList);

    if (classes.some((cls) => cls === `${classPrefix.current}-wrapper`)) {
      onClose && onClose();
    }
  };

  return (
    <div className={overlayWrapperClass} onClick={handleClose}>
      <section className={overlayClass}>{children}</section>
      {showCloseButton && (
        <button className={`${classPrefix.current}-close-btn`}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

// type OverlayFunc = <T extends OverlayModel>(Node: React.FunctionComponent<T>,
//    settings: { disableAnimation?: boolean; disableBackdrop?: boolean }) => React.FunctionComponent;

type Settings = { disableAnimation?: boolean; disableBackdrop?: boolean };
type OverlayFunc = <U extends OverlayModel>(
  Node: React.FunctionComponent<U>,
  settings: Settings
) => void;

const withOverlay: OverlayFunc = function <T extends OverlayModel>(
  Node: React.FunctionComponent<T>,
  settings: Settings = { disableAnimation: false, disableBackdrop: false }
) {
  return (props: T) => {
    const classPrefix = useRef("overlay");
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const { showClose, onClose, containedToParent } = props;
    const { disableAnimation = false, disableBackdrop = false } = settings;

    const [portalWrapperCreated, setPortalWrapperCreated] = useState(false);
    const [close, setClose] = useState(false);
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
        setClose(true);
        onClose && onClose();
      }, 500);
    }, []);

    return portalWrapperCreated
      ? ReactDOM.createPortal(
          <Overlay
            close={close}
            showCloseButton={showClose}
            disableAnimation={disableAnimation}
            disableBackdrop={disableBackdrop}
            onClose={handleClose}
          >
            <Node {...props} onClose={handleClose} isClosing={isClosing} />
          </Overlay>,
          portalContainer.current as HTMLElement
        )
      : null;
  };
};

export { withOverlay };
