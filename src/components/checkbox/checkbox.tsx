import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CheckIcon } from "../../icons";
import { useFirstRender } from "../common/effects/useFirstRender";
import { useFocus } from "../common/effects/useFocus";
import { useKeyWithDependency } from "../common/effects/useKey";
import { CheckboxModel } from "./checkbox-model";
import "./checkbox.scss";

const CheckBox: React.FunctionComponent<CheckboxModel> = ({
  label,
  onChange,
  isChecked = false,
  disabled,
}: CheckboxModel) => {
  const [checked, setChecked] = useState(isChecked);
  const ref = useRef(null);
  const id = useRef(`label-${nanoid()}`);

  useFocus(ref, { bgHighlight: false });

  const toggleCheck = useCallback(() => setChecked((prev) => !prev), []);

  useKeyWithDependency(ref, toggleCheck, checked);

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
    if (!isFirstRender.current && checked !== isChecked) {
      setChecked(isChecked);
    }
  }, [isChecked]);

  useEffect(() => {
    if (!isFirstRender.current) {
      onChange && onChange(checked);
    }
  }, [checked]);

  const isFirstRender = useFirstRender();

  return (
    <div
      className={wrapperClass}
      onClick={toggleCheck}
      role="checkbox"
      aria-checked={checked}
      ref={ref}
      tabIndex={disabled ? -1 : 0}
      aria-labelledby={id.current}
    >
      <span className={iconClass}>
        <CheckIcon />
      </span>
      <label className="rc-checkbox-label" id={id.current}>
        {label}
      </label>
    </div>
  );
};

export { CheckBox };
