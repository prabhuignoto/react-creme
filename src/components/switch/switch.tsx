import classNames from "classnames";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SwitchModel } from "./switch-model";
import "./switch.scss";

const Switch: React.FunctionComponent<SwitchModel> = ({
  onChange,
  label,
  width = 50,
  disabled = false,
}) => {
  const [state, setState] = useState(false);

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

  // CSS
  const switchKnobClass = useMemo(
    () =>
      classNames(["rc-switch-knob"], {
        "rc-switch-on": state,
        "rc-switch-off": !state && !isFirstRender.current,
      }),
    [state]
  );

  const switchClass = useMemo(
    () => classNames("switch", { "rc-switch-disabled": disabled }),
    []
  );

  const switchTrackClass = useMemo(
    () =>
      classNames(["rc-switch-track", state ? "rc-switch-on" : "rc-switch-off"]),
    [state]
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
      role="switch"
      aria-checked={state}
      style={switchStyle}
    >
      <span className={switchTrackClass}>
        <span className={switchKnobClass}></span>
        {label && <span className={switchLabelClass}>{label}</span>}
      </span>
    </div>
  );
};

export { Switch };
