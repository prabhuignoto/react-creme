import classNames from "classnames";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFocus } from "../common/effects/useFocus";
import { SwitchModel } from "./switch-model";
import "./switch.scss";

const Switch: React.FunctionComponent<SwitchModel> = ({
  onChange,
  label,
  width = 50,
  disabled = false,
  size = "sm",
  style,
  labelOutside = false,
  checked = false,
  focusable = true,
}) => {
  const [state, setState] = useState(checked);
  const ref = useRef(null);

  // flag to check if the component is rendering the first time
  const isFirstRender = useRef(true);

  // handler
  const handleToggle = useCallback(() => {
    if (!disabled) {
      setState(!state);

      if (onChange) {
        onChange(!state);
      }
    }
  }, [state, disabled]);

  if (focusable) {
    useFocus(ref, {}, () => {
      setState((prev) => !prev);
    });
  }

  // CSS
  const switchKnobClass = useMemo(
    () =>
      classNames(["rc-switch-knob"], {
        "rc-switch-on": state && !isFirstRender.current,
        "rc-switch-on-load": state && isFirstRender.current,
        "rc-switch-off": !state && !isFirstRender.current,
        [`rc-switch-knob-${size}`]: true,
        "rc-switch-disabled": disabled,
      }),
    [state, size, disabled]
  );

  const switchClass = useMemo(
    () =>
      classNames("rc-switch", {
        "rc-disabled": disabled,
        [`rc-switch-${size}`]: true,
        "rc-switch-label-outside": labelOutside,
      }),
    [size, labelOutside, disabled]
  );

  const switchTrackClass = useMemo(
    () =>
      classNames("rc-switch-track", {
        "rc-switch-on": state,
        "rc-switch-off": !state,
        "rc-switch-track-disabled": disabled,
        [`rc-switch-${size}`]: true,
        "rc-switch-label-outside": labelOutside,
      }),
    [state, size, disabled, labelOutside]
  );

  const switchLabelClass = useMemo(
    () =>
      classNames(["rc-switch-label"], {
        "rc-switch-label-on": state,
        "rc-switch-label-off": !state,
        [`rc-switch-label-${size}`]: true,
        "rc-switch-label-outside": labelOutside,
      }),
    [state, labelOutside]
  );

  const switchStyle = useMemo(
    () =>
      ({
        "--min-width": `${width}px`,
        ...style,
      } as React.CSSProperties),
    []
  );

  // Effects
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  const switchTabIndex = useMemo(
    () => !disabled && { tabIndex: 0 },
    [disabled]
  );

  return (
    <div
      className={switchClass}
      onClick={handleToggle}
      role="switch"
      aria-checked={state}
      style={switchStyle}
      ref={ref}
      {...switchTabIndex}
    >
      <span className={switchTrackClass}>
        <span className={switchKnobClass}></span>
        {label && !labelOutside && (
          <span className={switchLabelClass}>{label}</span>
        )}
      </span>
      {labelOutside && <span className={switchLabelClass}>{label}</span>}
    </div>
  );
};

export { Switch };
