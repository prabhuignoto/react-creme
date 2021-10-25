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
}) => {
  const [state, setState] = useState(false);
  const ref = useRef(null);

  // flag to check if the component is rendering the first time
  const isFirstRender = useRef(true);

  useFocus(ref, { bgHighlight: false });

  // handler
  const handleToggle = useCallback(() => {
    if (!disabled) {
      setState(!state);

      if (onChange) {
        onChange(!state);
      }
    }
  }, [state, disabled]);

  // CSS
  const switchKnobClass = useMemo(
    () =>
      classNames(["rc-switch-knob"], {
        "rc-switch-on": state,
        "rc-switch-off": !state && !isFirstRender.current,
        [`rc-switch-knob-${size}`]: true,
      }),
    [state, size]
  );

  const switchClass = useMemo(
    () => classNames("rc-switch", { "rc-switch-disabled": disabled }),
    []
  );

  const switchTrackClass = useMemo(
    () =>
      classNames("rc-switch-track", {
        "rc-switch-on": state,
        "rc-switch-off": !state,
        [`rc-switch-${size}`]: true,
      }),
    [state, size]
  );

  const switchLabelClass = useMemo(
    () =>
      classNames(["rc-switch-label"], {
        "rc-switch-label-on": state,
        "rc-switch-label-off": !state,
      }),
    [state]
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

  return (
    <div
      className={switchClass}
      onClick={handleToggle}
      onKeyUp={({ key }) => key === "Enter" && handleToggle()}
      role="switch"
      aria-checked={state}
      style={switchStyle}
      ref={ref}
      tabIndex={!disabled ? 0 : -1}
    >
      <span className={switchTrackClass}>
        <span className={switchKnobClass}></span>
        {label && <span className={switchLabelClass}>{label}</span>}
      </span>
    </div>
  );
};

export { Switch };
