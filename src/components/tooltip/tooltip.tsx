import classNames from "classnames";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useFirstRender } from "../common/effects/useFirstRender";
import { usePosition } from "../common/effects/usePosition";
import { TooltipModel } from "./tooltip-model";
import "./tooltip.scss";

const Tooltip: React.FunctionComponent<TooltipModel> = ({
  children,
  message,
  position = "bottom center",
  isStatic = false,
  width = 50,
}: TooltipModel) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // flag to check if the component is rendering for the first time
  const isFirstRender = useFirstRender();

  // state to show/hide the tooltip
  const [show, setShow] = useState(isStatic);

  // helper to position the tooltip
  const cssPosition = usePosition(wrapperRef, tooltipRef, position, {
    alignToEdge: true,
    spacing: 15,
  });

  // handlers for showing/hiding tooltip
  const showTooltip = useCallback(() => !isStatic && setShow(true), [isStatic]);
  const hideTooltip = useCallback(
    () => !isStatic && setShow(false),
    [isStatic]
  );

  // CSS
  const toolTipMessageClass = useMemo(
    () =>
      classNames([
        "rc-tooltip-message",
        {
          "show-tooltip": show,
          "hide-tooltip": !isFirstRender.current && !show,
          [`rc-tooltip-${position.split(" ")[0]}-${position.split(" ")[1]}`]:
            true,
        },
      ]),
    [show, position]
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
    <div className="rc-tooltip-wrapper" ref={wrapperRef} role="tooltip">
      <span
        className={toolTipMessageClass}
        style={tooltipMessageStyle}
        ref={tooltipRef}
      >
        {message}
      </span>
      <section
        className="rc-tooltip-host-content"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </section>
    </div>
  );
};

export { Tooltip };
