import cls from "classnames";
import { nanoid } from "nanoid";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFirstRender } from "../common/effects/useFirstRender";
import { useFocus } from "../common/effects/useFocus";
import { RadioModel } from "./radio-model";
import "./radio.scss";

const Radio: React.FunctionComponent<RadioModel> = ({
  disabled,
  id,
  isChecked = false,
  label,
  onChange,
  value,
  size = "sm",
  style,
}) => {
  const idRef = useRef<string>(id || nanoid());

  const labelID = useRef(`label-${idRef.current}`);

  const radioRef = useRef<HTMLDivElement | null>(null);

  const [checked, setChecked] = useState<boolean | null>(isChecked);

  const isFirstRender = useFirstRender();

  const canToggle = useMemo(() => !disabled && !checked, [checked, disabled]);

  const toggleCheck = useCallback(() => {
    if (canToggle) {
      setChecked((checked) => !checked);
      onChange &&
        onChange({
          id,
          selected: !checked,
          value,
        });
    }
  }, [canToggle]);

  useFocus(radioRef, { bgHighlight: false }, toggleCheck);

  const radioWrapperClass = useMemo(
    () =>
      cls(
        ["rc-radio"],
        {
          "rc-disabled": disabled,
          "rc-radio-checked": checked,
          [`rc-radio-${size}`]: true,
        },
        ...(radioRef.current !== null ? radioRef.current.classList : [])
      ),
    [checked]
  );

  const radioIconClass = useMemo(() => {
    return cls(["rc-radio-icon"], {
      "rc-radio-ico-checked": checked,
      "rc-radio-ico-un-checked": !isFirstRender.current && !checked,
    });
  }, [checked]);

  const radioLabelClass = useMemo(() => {
    return cls(["rc-radio-label", `rc-radio-label-${size}`]);
  }, [size]);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    setChecked(isChecked);
  }, [isChecked]);

  return (
    <div className="rc-radio-wrapper">
      <div
        className={radioWrapperClass}
        onClick={toggleCheck}
        aria-checked={!!checked}
        aria-labelledby={labelID.current}
        tabIndex={!disabled ? 0 : -1}
        role="radio"
        ref={radioRef}
        style={style}
        id={idRef.current}
      >
        <span className={radioIconClass}></span>
      </div>
      <label
        className={radioLabelClass}
        id={labelID.current}
        onClick={toggleCheck}
      >
        {label}
      </label>
    </div>
  );
};

export { Radio };
