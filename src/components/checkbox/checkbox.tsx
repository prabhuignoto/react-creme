import classNames from "classnames";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CheckIcon } from "../../icons";
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

  const toggleCheck = useCallback(() => {
    setChecked(!checked);

    if (onChange) {
      onChange(!checked);
    }
  }, [checked]);

  const iconClass = useMemo(
    () =>
      classNames(["checkbox-icon"], {
        "checkbox-checked": checked,
      }),
    [checked]
  );

  const wrapperClass = useMemo(
    () =>
      classNames(["checkbox-wrapper"], {
        "checkbox-disabled": disabled,
      }),
    [checked]
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
    >
      <span className={iconClass}>
        <CheckIcon />
      </span>
      <label className="checkbox-label">{label}</label>
    </div>
  );
};

export { CheckBox };
