import classNames from "classnames";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { useDrag } from "../common/effects/useDrag";
import { useFocus } from "../common/effects/useFocus";
import { Tooltip } from "../tooltip/tooltip";
import { SliderModel } from "./slider-model";
import "./slider.scss";

const Slider: React.FunctionComponent<SliderModel> = ({
  disableTooltip = false,
  disabled = false,
  end = 10,
  knobShape = "circle",
  knobSize = 16,
  onChange,
  position = "top",
  showTooltipOnHover = false,
  sliderValue = 0,
  start = 1,
  tooltipWidth = 40,
  focusable = false,
  formatter,
}) => {
  const [dragging, setDragging] = React.useState(false);

  // state to toggle the tooltip
  const [hideTooltip, setHideTooltip] = React.useState(showTooltipOnHover);

  const controlRef = useRef<HTMLElement | null>(null);
  const placerRef = useRef<HTMLElement | null>(null);
  const sliderFillRef = useRef(null);
  const trackerRef = useRef<HTMLElement | null>(null);

  const onChangeDebounced = onChange
    ? useDebouncedCallback(onChange, 100)
    : null;

  // callbacks for drag start and end operation
  const onDragStart = useCallback(() => setDragging(true), []);
  const onDragEnd = useCallback(() => setDragging(false), []);

  // setup the slider dragging function
  const [percent] = useDrag(trackerRef, controlRef, {
    direction: "horizontal",
    startValue: start,
    endValue: end,
    offsetLeft: start,
    onDragStart,
    onDragEnd,
    currentValue: sliderValue,
    observeContainer: true,
  });

  const onTrackerInit = useCallback((node) => {
    if (node) {
      trackerRef.current = node;
    }
  }, []);

  const onControlInit = useCallback((node) => {
    if (node) {
      controlRef.current = node;
    }
  }, []);

  const onPlacerRef = useCallback((node) => {
    if (node) {
      placerRef.current = node;
      node.style.height = "10px";
    }
  }, []);

  const onTooltipRender = useCallback(() => {
    if (placerRef.current) {
      placerRef.current.style.display = "none";
    }
  }, []);

  const handelMouseOut = useCallback(
    () => !dragging && setHideTooltip(true),
    [dragging]
  );

  const handleMouseOver = useCallback(
    () => !dragging && setHideTooltip(false),
    []
  );

  // Styles
  const sliderFillStyle = useMemo(() => {
    if (sliderFillRef.current && trackerRef.current) {
      return {
        width: `${Math.round(trackerRef.current.clientWidth * percent)}px`,
      } as CSSProperties;
    }
  }, [percent, sliderFillRef, trackerRef]);

  const sliderWrapperClass = useMemo(
    () =>
      classNames("rc-slider-wrapper", {
        "rc-slider-wrapper-disabled": disabled,
      }),
    []
  );

  const knobClass = useMemo(() => {
    return classNames("rc-slider-control", {
      [`rc-slider-control-${knobShape}`]: true,
      "rc-slider-control-dragging": dragging,
    });
  }, [dragging]);

  const value = useMemo(() => {
    return Math.round((end - start) * percent) + start;
  }, [percent, dragging]);

  const canShowTooltip = useMemo(
    () => !disableTooltip && !hideTooltip,
    [hideTooltip, disableTooltip]
  );

  if (focusable) {
    useFocus(controlRef);
  }

  useEffect(() => onChangeDebounced?.(value), [value]);

  const tooltipMessage = useMemo(() => {
    if (formatter) {
      return formatter(value) + "";
    }
    return value + "";
  }, [value]);

  const focusableProps = useMemo(
    () => focusable && { tabIndex: 0 },
    [focusable]
  );

  return (
    <div
      className={sliderWrapperClass}
      role="slider"
      aria-valuemin={start}
      aria-valuemax={end}
      aria-valuenow={value}
      {...(showTooltipOnHover ? { onMouseOut: handelMouseOut } : null)}
      ref={onTrackerInit}
    >
      <div className="rc-slider-track">
        <span
          ref={sliderFillRef}
          style={sliderFillStyle}
          className="rc-slider-fill"
        ></span>
        <span
          className={knobClass}
          ref={onControlInit}
          role="slider"
          {...focusableProps}
          style={{ "--size": `${knobSize}px` } as CSSProperties}
          {...(showTooltipOnHover ? { onMouseOver: handleMouseOver } : null)}
        >
          {canShowTooltip && (
            <Tooltip
              isStatic
              position={`${position} center`}
              message={tooltipMessage}
              onTooltipRendered={onTooltipRender}
              fixedAtCenter
              minWidth={tooltipWidth}
            >
              <span className="tooltip-placer" ref={onPlacerRef}></span>
            </Tooltip>
          )}
        </span>
      </div>
    </div>
  );
};

export { Slider };