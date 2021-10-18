import classNames from "classnames";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CheckIcon } from "../../icons";
import { useFocus } from "../common/effects/useFocus";
import { CheckboxModel } from "./checkbox-model";
import "./checkbox.scss";

const CheckBox: React.FunctionComponent<CheckboxModel> = ({
  label,
  onChange,
  isChecked = false,
  disabled,
}: CheckboxModel) => {
  const [checked, setChecked] = useState(isChecked);
  const isFirstRender = useRef(true);
  const ref = useRef(null);

  useFocus(ref, { bgHighlight: true });

  const toggleCheck = useCallback(() => {
    setChecked(!checked);

    if (onChange) {
      onChange(!checked);
    }
  }, [checked]);

  const iconClass = useMemo(
    () =>
      classNames(["rc-checkbox-icon"], {
        "rc-checkbox-checked": checked,
      }),
    [checked]
  );

  const wrapperClass = useMemo(
    () =>
      classNames(["rc-checkbox-wrapper"], {
        "rc-checkbox-disabled": disabled,
      }),
    []
  );

  useEffect(() => {
    if (!isFirstRender.current) {
      setChecked(isChecked);
    }
  }, [isChecked]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <div
      className={wrapperClass}
      onClick={toggleCheck}
      role="checkbox"
      aria-checked={checked}
      ref={ref}
      tabIndex={disabled ? -1 : 0}
    >
      <span className={iconClass}>
        <CheckIcon />
      </span>
      <label className="rc-checkbox-label">{label}</label>
    </div>
  );
};

export { CheckBox };
