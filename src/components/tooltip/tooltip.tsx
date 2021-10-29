import classNames from "classnames";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFirstRender } from "../common/effects/useFirstRender";
import { usePosition } from "../common/effects/usePosition";
import { TooltipModel } from "./tooltip-model";
import "./tooltip.scss";

const Tooltip: React.FunctionComponent<TooltipModel> = ({
  children,
  fixedAtCenter = false,
  isStatic = false,
  message,
  onTooltipRendered,
  position = "bottom center",
  width = 50,
}: TooltipModel) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // flag to check if the component is rendering for the first time
  const isFirstRender = useFirstRender();

  // state to show/hide the tooltip
  const [showTooltip, setShowTooltip] = useState(isStatic);

  // helper to position the tooltip
  const cssPosition = usePosition(wrapperRef, tooltipRef, position, {
    alignToEdge: true,
    spacing: 15,
  });

  // handlers for showing/hiding tooltip
  const onShow = useCallback(
    () => !isStatic && setShowTooltip(true),
    [isStatic]
  );
  const onHide = useCallback(
    () => !isStatic && setShowTooltip(false),
    [isStatic]
  );

  // CSS
  const toolTipMessageClass = useMemo(
    () =>
      classNames([
        "rc-tooltip-message",
        {
          "show-tooltip": showTooltip,
          "hide-tooltip": !isFirstRender.current && !showTooltip,
          [`rc-tooltip-${position.split(" ")[0]}-${position.split(" ")[1]}`]:
            true,
        },
      ]),
    [showTooltip, position]
  );

  const tooltipWrapperClass = useMemo(
    () =>
      classNames([
        "rc-tooltip-wrapper",
        {
          "rc-tooltip-fixed": fixedAtCenter,
        },
      ]),
    [fixedAtCenter]
  );

  const tooltipMessageStyle = useMemo(() => {
    if (cssPosition) {
      return {
        ...cssPosition,
        "--width": `${width}px`,
      };
    } else {
      return {
        "--width": `${width}px`,
      };
    }
  }, [cssPosition]);

  const onRef = useCallback((node) => {
    if (node) {
      wrapperRef.current = node;
    }
  }, []);

  useEffect(() => {
    if (cssPosition) {
      onTooltipRendered && onTooltipRendered();
    }
  }, [cssPosition]);

  return (
    <div className={tooltipWrapperClass} ref={onRef} role="tooltip">
      <span
        className={toolTipMessageClass}
        style={tooltipMessageStyle}
        ref={tooltipRef}
      >
        {message}
      </span>
      <section
        className="rc-tooltip-host-content"
        onMouseEnter={onShow}
        onMouseLeave={onHide}
      >
        {children}
      </section>
    </div>
  );
};

export { Tooltip };
