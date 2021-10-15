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
    setState(!state);

    if (onChange) {
      onChange(!state);
    }
  }, [state]);

  // CSS
  const switchKnobClass = useMemo(
    () =>
      classNames(["switch-knob"], {
        "switch-on": state,
        "switch-off": !state && !isFirstRender.current,
      }),
    [state]
  );

  const switchClass = useMemo(
    () => classNames("switch", { "switch-disabled": disabled }),
    []
  );

  const switchTrackClass = useMemo(
    () => classNames(["switch-track", state ? "switch-on" : "switch-off"]),
    [state]
  );

  const switchLabelClass = useMemo(
    () =>
      classNames(["switch-label"], {
        "switch-label-on": state,
        "switch-label-off": !state,
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
