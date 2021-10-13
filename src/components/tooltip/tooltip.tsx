import classNames from "classnames";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePosition } from "../common/effects/usePosition";
import { TooltipModel } from "./tooltip-model";
import "./tooltip.scss";

const Tooltip: React.FunctionComponent<TooltipModel> = ({
  children,
  position = "bottom center",
  message,
  width = 100,
}: TooltipModel) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // flag to check if the component is rendering for the first time
  const isFirstRender = useRef(true);

  // state to show/hide the tooltip
  const [show, setShow] = useState(false);

  // helper to position the tooltip
  const cssPosition = usePosition(wrapperRef, tooltipRef, position, {
    alignToEdge: false,
    spacing: 15,
  });

  // handlers for showing/hiding tooltip
  const showTooltip = useCallback(() => setShow(true), []);
  const hideTooltip = useCallback(() => setShow(false), []);

  // effects
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  // CSS
  const toolTipMessageClass = useMemo(
    () =>
      classNames([
        "tooltip-message",
        {
          "show-tooltip": show,
          "hide-tooltip": !isFirstRender.current && !show,
          [`tooltip-${position.split(" ")[0]}`]: true,
        },
      ]),
    [show]
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

  return (
    <div className="tooltip-wrapper" ref={wrapperRef}>
      <span
        className={toolTipMessageClass}
        style={tooltipMessageStyle}
        ref={tooltipRef}
      >
        {message}
      </span>
      <section
        className="tooltip-host-content"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </section>
    </div>
  );
};

export { Tooltip };
