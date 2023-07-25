import classNames from 'classnames';
import React from 'react';
import { CSSProperties, useCallback, useEffect, useMemo, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useDrag } from '../common/effects/useDrag';
import { isDark } from '../common/utils';
// import useFocus from '../common/effects/useFocusNew';
import { Tooltip } from '../tooltip/tooltip';
import { SliderProps } from './slider-model';
import styles from './slider.module.scss';

const Slider: React.FunctionComponent<SliderProps> = ({
  disableTooltip = false,
  disabled = false,
  end = 10,
  knobShape = 'circle',
  knobSize = 16,
  onChange,
  position = 'top',
  showTooltipOnHover = false,
  sliderValue = 0,
  start = 1,
  tooltipWidth = 40,
  focusable = true,
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
    currentValue: sliderValue,
    direction: 'horizontal',
    disabled,
    endValue: end,
    moveToPositionOnClick: true,
    observeContainer: true,
    offsetLeft: start,
    onDragEnd,
    onDragStart,
    startValue: start,
  });

  const onTrackerInit = useCallback((node: HTMLDivElement) => {
    if (node) {
      trackerRef.current = node;
    }
  }, []);

  const onControlInit = useCallback((node: HTMLSpanElement) => {
    if (node) {
      controlRef.current = node;
    }
  }, []);

  const onPlacerRef = useCallback((node: HTMLSpanElement) => {
    if (node) {
      placerRef.current = node;
      node.style.height = '10px';
    }
  }, []);

  const onTooltipRender = useCallback(() => {
    if (placerRef.current) {
      placerRef.current.style.display = 'none';
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
      classNames(styles.wrapper, {
        [styles['wrapper_disabled']]: disabled,
      }),
    []
  );

  const knobClass = useMemo(() => {
    return classNames(styles.control, {
      [styles[`control_${knobShape}`]]: true,
      [styles.control_dragging]: dragging,
    });
  }, [dragging]);

  const value = useMemo(() => {
    return Math.round((end - start) * percent) + start;
  }, [percent, dragging]);

  const canShowTooltip = useMemo(
    () => !disableTooltip && !hideTooltip,
    [hideTooltip, disableTooltip]
  );

  useEffect(() => onChangeDebounced?.(value), [value]);

  const tooltipMessage = useMemo(() => {
    if (formatter) {
      return formatter(value) + '';
    }
    return value + '';
  }, [value]);

  const focusableProps = useMemo(
    () => focusable && { tabIndex: 0 },
    [focusable]
  );

  const isDarkMode = useMemo(() => isDark(), []);

  const trackClass = useMemo(
    () =>
      classNames(styles.track, {
        [styles.dark]: isDarkMode,
        [styles.dragging]: dragging,
      }),
    [dragging]
  );

  return (
    <div
      className={sliderWrapperClass}
      role="slider"
      aria-valuemin={start}
      aria-valuemax={end}
      aria-valuenow={value}
      aria-valuetext={`slider value is ${value}`}
      {...(showTooltipOnHover ? { onMouseOut: handelMouseOut } : null)}
      ref={onTrackerInit}
      aria-label="slider"
    >
      <div className={trackClass}>
        <span
          ref={sliderFillRef}
          style={sliderFillStyle}
          className={styles.fill}
        ></span>
        <span
          className={knobClass}
          ref={onControlInit}
          {...focusableProps}
          style={
            {
              '--size': `${knobSize}px`,
            } as CSSProperties
          }
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
              enablePadding={false}
            >
              <span className={styles.tooltip_placer} ref={onPlacerRef}></span>
            </Tooltip>
          )}
        </span>
      </div>
    </div>
  );
};

Slider.displayName = 'Slider';

export { Slider };
