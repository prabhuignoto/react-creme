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
import { useKey } from "../common/effects/useKey";
import { CheckboxModel } from "./checkbox-model";
import "./checkbox.scss";

const CheckBox: React.FunctionComponent<CheckboxModel> = ({
  label,
  onChange,
  isChecked = false,
  disabled,
  size = "sm",
  style,
  border = true,
}: CheckboxModel) => {
  const [checked, setChecked] = useState(isChecked);
  const ref = useRef(null);
  const id = useRef(`label-${nanoid()}`);

  useFocus(ref, { bgHighlight: false });

  const toggleCheck = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  useKey(ref, () => {
    setChecked((prev) => {
      return !prev;
    });
  });

  const iconClass = useMemo(
    () =>
      classNames("rc-checkbox-icon", {
        "rc-checkbox-checked": checked,
        [`rc-checkbox-${size}`]: true,
      }),
    [checked]
  );

  const labelClass = useMemo(
    () =>
      classNames("rc-checkbox-label", {
        [`rc-checkbox-label-${size}`]: true,
      }),
    [checked]
  );

  const checkBoxClass = useMemo(
    () =>
      classNames("rc-checkbox", {
        "rc-disabled": disabled,
        [`rc-checkbox-${size}`]: true,
      }),
    [disabled]
  );

  const wrapperClass = useMemo(
    () =>
      classNames("rc-checkbox-wrapper", {
        [`rc-checkbox-${size}`]: true,
        "rc-disabled": disabled,
        "rc-checkbox-border": border,
      }),
    [size, disabled]
  );

  useEffect(() => {
    if (!isFirstRender.current && !disabled && isChecked !== checked) {
      setChecked(isChecked);
    }
  }, [isChecked, disabled]);

  useEffect(() => {
    if (!isFirstRender.current) {
      onChange && onChange(checked);
    }
  }, [checked]);

  const isFirstRender = useFirstRender();

  return (
    <div
      className={wrapperClass}
      role="checkbox"
      onClick={toggleCheck}
      aria-checked={checked}
      ref={ref}
      tabIndex={disabled ? -1 : 0}
    >
      <div className={checkBoxClass} aria-labelledby={id.current} style={style}>
        <span className={iconClass} role="img">
          <CheckIcon />
        </span>
      </div>
      <label className={labelClass} id={id.current}>
        {label}
      </label>
    </div>
  );
};

CheckBox.displayName = "CheckBox";

export { CheckBox };
