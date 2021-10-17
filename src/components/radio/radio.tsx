import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFirstRender } from "../common/effects/useFirstRender";
import { RadioModel } from "./radio-model";
import "./radio.scss";

const Radio: React.FunctionComponent<RadioModel> = ({
  disabled,
  id,
  isChecked = false,
  label,
  onChange,
  value,
}) => {
  const labelID = useRef(`label-${nanoid()}`);

  const [checked, setChecked] = useState<boolean | null>(isChecked);

  const isFirstRender = useFirstRender();

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
      "radio-icon-un-checked": !isFirstRender.current && !checked,
    });
  }, [checked]);

  const canToggle = useMemo(() => !disabled && !checked, [checked, disabled]);

  const toggleCheck = useCallback(() => {
    if (canToggle) {
      setChecked((checked) => !checked);
      onChange &&
        onChange({
          id,
          selected: !checked,
        });
    }
  }, [canToggle]);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    setChecked(isChecked);
  }, [isChecked]);

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
