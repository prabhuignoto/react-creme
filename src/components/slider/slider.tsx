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
import { SliderModel } from "./slider-model";
import "./slider.scss";

const Slider: React.FunctionComponent<SliderModel> = ({
  start = 1,
  end = 10,
  onChange,
  disabled = false,
  disableTooltip = false,
}) => {
  const trackerRef = useRef<HTMLElement | null>(null);
  const controlRef = useRef<HTMLElement | null>(null);
  const sliderFillRef = useRef(null);

  const onChangeDebounced = onChange
    ? useDebouncedCallback(onChange, 500)
    : null;

  const [percent] = useDrag(trackerRef, controlRef, {
    direction: "horizontal",
    startValue: Math.min(start, end),
    endValue: end,
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

  const sliderFillStyle = useMemo(() => {
    if (sliderFillRef.current && trackerRef.current) {
      return {
        width: `${Math.round(trackerRef.current.clientWidth * percent) + 2}px`,
      } as CSSProperties;
    }
  }, [percent, sliderFillRef, trackerRef]);

  const value = useMemo(() => Math.round(end * percent), [percent]);

  const sliderWrapperClass = useMemo(
    () =>
      classNames("rc-slider-wrapper", {
        "rc-slider-wrapper-disabled": disabled,
      }),
    []
  );

  const canShowTooltip = useMemo(() => !disabled && !disableTooltip, []);

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
    >
      <div className="rc-slider-track" ref={onTrackerInit}>
        <span
          ref={sliderFillRef}
          style={sliderFillStyle}
          className="rc-slider-fill"
        ></span>
        <span className="rc-slider-control" ref={onControlInit}>
          {canShowTooltip && (
            <Tooltip
              isStatic
              position="top center"
              message={Math.round(end * percent) + ""}
            >
              <span className="tooltip-placer"></span>
            </Tooltip>
          )}
        </span>
      </div>
    </div>
  );
};

export { Slider };
