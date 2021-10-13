import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RadioModel } from "./radio-model";
import "./radio.scss";

const Radio: React.FunctionComponent<RadioModel> = ({
  disabled,
  id,
  isChecked = null,
  label,
  onChange,
  value,
}) => {
  const isFirstRender = useRef(false);
  const labelID = useRef(`label-${nanoid()}`);

  const [checked, setChecked] = useState<boolean | null>(isChecked);

  const RadioWrapperClass = useMemo(
    () =>
      classNames(["radio-wrapper"], {
        "radio-wrapper-disabled": disabled,
        "radio-wrapper-checked": checked,
      }),
    [checked]
  );

  const RadioIconClass = useMemo(() => {
    return classNames(["radio-icon"], {
      "radio-icon-checked": checked,
      "radio-icon-un-checked": checked !== null && !checked,
    });
  }, [checked]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    setChecked(isChecked);
  }, [isChecked]);

  const toggleCheck = useCallback(() => {
    setChecked((checked) => !checked);
    onChange &&
      onChange({
        id,
        selected: !checked,
      });
  }, [checked]);

  return (
    <div
      className={RadioWrapperClass}
      onClick={toggleCheck}
      aria-checked={!!checked}
      tabIndex={0}
      role="radio"
    >
      <span className={RadioIconClass}></span>
      <input type="hidden" value={value} aria-labelledby={labelID.current} />
      <label className="radio-label" id={labelID.current}>
        {label}
      </label>
    </div>
  );
};

export { Radio };
