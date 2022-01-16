import classNames from "classnames";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CloseIcon } from "../../icons";
import { Button } from "../button/button";
import { useCloseOnEscape } from "../common/effects/useCloseOnEsc";
import { useFocus } from "../common/effects/useFocus";
import { useKey } from "../common/effects/useKey";
import { withOverlay } from "../common/withOverlay";
import { DrawerModel } from "./drawer-model";
import "./drawer.scss";

const DrawerComponent: React.FunctionComponent<DrawerModel> = ({
  children,
  height = 300,
  isClosing,
  onClose,
  position = "left",
  width = 300,
  transition = "cubic-bezier(0.79, 0.14, 0.15, 0.86)",
}) => {
  const [activate, setActivate] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const style = useMemo<CSSProperties>(() => {
    let newHeight: string | number = "100%";

    if (position === "top" || position === "bottom") {
      newHeight = Number.isInteger(height) ? `${height}px` : height || "300px";
    }

    return {
      "--min-height": `${newHeight}`,
      "--min-width": `${width}px`,
      "--transition": transition,
    } as CSSProperties;
  }, []);

  const drawerClass = useMemo(
    () =>
      classNames(["rc-drawer", `rc-drawer-${position}`], {
        [`visible slide-${position}-enter`]: activate && !isClosing,
        [`visible slide-${position}-exit`]: isClosing,
      }),
    [activate, isClosing]
  );

  useEffect(() => {
    setActivate(true);
  }, []);

  useCloseOnEscape((ev) => onClose?.(), drawerRef);

  useFocus(drawerRef);

  if (onClose) {
    useKey(drawerRef, onClose);
  }

  const onInitRef = useCallback((node) => {
    if (node) {
      drawerRef.current = node;

      setTimeout(() => node.focus(), 500);
    }
  }, []);

  return (
    <div
      className={drawerClass}
      style={style}
      ref={onInitRef}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
    >
      <div className="rc-drawer-close-btn-wrapper">
        <Button type="icon" size="lg" onClick={onClose}>
          <CloseIcon />
        </Button>
      </div>
      {children}
    </div>
  );
};

const Drawer = withOverlay<DrawerModel>(DrawerComponent, {
  disableAnimation: false,
});

export { Drawer };
