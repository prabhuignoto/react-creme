import classNames from "classnames";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { Tooltip } from "..";
import { useDrag } from "../common/effects/useDrag";
import { useFocus } from "../common/effects/useFocus";
import { SliderModel } from "./slider-model";
import "./slider.scss";

const Slider: React.FunctionComponent<SliderModel> = ({
  disableTooltip = false,
  disabled = false,
  end = 10,
  onChange,
  position = "top",
  start = 1,
  knobShape = "circle",
  showTooltipOnHover = false,
  knobSize = 16,
}) => {
  const [dragging, setDragging] = React.useState(false);
  const [hideTooltip, setHideTooltip] = React.useState(showTooltipOnHover);

  const controlRef = useRef<HTMLElement | null>(null);
  const placerRef = useRef<HTMLElement | null>(null);
  const sliderFillRef = useRef(null);
  const trackerRef = useRef<HTMLElement | null>(null);

  const onChangeDebounced = onChange
    ? useDebouncedCallback(onChange, 100)
    : null;

  const [percent] = useDrag(trackerRef, controlRef, {
    direction: "horizontal",
    startValue: Math.min(start, end),
    endValue: end,
    offsetLeft: start,
    onDragStart: () => setDragging(true),
    onDragEnd: () => setDragging(false),
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

  const handelMouseOut = useCallback(() => {
    !dragging && setHideTooltip(true);
  }, [dragging]);

  const handleMouseOver = useCallback(() => {
    !dragging && setHideTooltip(false);
  }, []);

  const sliderFillStyle = useMemo(() => {
    if (sliderFillRef.current && trackerRef.current) {
      return {
        width: `${Math.round(trackerRef.current.clientWidth * percent) + 2}px`,
      } as CSSProperties;
    }
  }, [percent, sliderFillRef, trackerRef]);

  const value = useMemo(
    () => Math.round((end - start) * percent) + start,
    [percent]
  );

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
    });
  }, []);

  const canShowTooltip = useMemo(
    () => !disabled && !disableTooltip && !hideTooltip,
    [hideTooltip, disabled, disableTooltip]
  );

  useFocus(controlRef);

  useEffect(() => {
    onChangeDebounced && onChangeDebounced(value);
  }, [value]);

  return (
    <div
      className={sliderWrapperClass}
      role="slider"
      aria-valuemin={start}
      aria-valuemax={end}
      aria-valuenow={value}
      {...(showTooltipOnHover ? { onMouseOut: handelMouseOut } : null)}
    >
      <div className="rc-slider-track" ref={onTrackerInit}>
        <span
          ref={sliderFillRef}
          style={sliderFillStyle}
          className="rc-slider-fill"
        ></span>
        <span
          className={knobClass}
          ref={onControlInit}
          role="slider"
          tabIndex={0}
          style={{ "--size": `${knobSize}px` } as CSSProperties}
          {...(showTooltipOnHover ? { onMouseOver: handleMouseOver } : null)}
        >
          {canShowTooltip && (
            <Tooltip
              isStatic
              position={`${position} center`}
              message={value + ""}
              onTooltipRendered={onTooltipRender}
              fixedAtCenter
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
