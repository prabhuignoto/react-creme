import classNames from "classnames";
import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useCloseOnEscape } from "../common/effects/useCloseOnEsc";
import { useFocus } from "../common/effects/useFocus";
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
}) => {
  const style = useMemo<CSSProperties>(() => {
    let newHeight: string | number = "100%";

    if (position === "top" || position === "bottom") {
      newHeight = Number.isInteger(height) ? `${height}px` : height || "300px";
    }

    return {
      "--min-width": `${width}px`,
      "--min-height": `${newHeight}`,
    } as CSSProperties;
  }, []);
  const [activate, setActivate] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const drawerClass = useMemo(
    () =>
      classNames(["rc-drawer", position], {
        [`visible slide-${position}-enter`]: activate && !isClosing,
        [`visible slide-${position}-exit`]: isClosing,
      }),
    [activate, isClosing]
  );

  useEffect(() => setActivate(true), []);

  useCloseOnEscape((ev) => onClose?.(), drawerRef);

  useFocus(drawerRef);

  useCloseOnEscape(() => {
    onClose && onClose();
  }, drawerRef);

  return (
    <div
      className={drawerClass}
      style={style}
      ref={drawerRef}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
};

const Drawer = withOverlay<DrawerModel>(DrawerComponent, {
  disableAnimation: false,
});

export { Drawer };
