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
  const labelID = useRef(`label-${nanoid()}`);

  const ref = useRef<HTMLDivElement | null>(null);

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
        });
    }
  }, [canToggle]);

  useFocus(ref, { bgHighlight: false });

  const radioWrapperClass = useMemo(
    () =>
      classNames(
        ["rc-radio"],
        {
          "rc-disabled": disabled,
          "rc-radio-checked": checked,
          [`rc-radio-${size}`]: true,
        },
        ...(ref.current !== null ? ref.current.classList : [])
      ),
    [checked]
  );

  const radioIconClass = useMemo(() => {
    return classNames(["rc-radio-icon"], {
      "rc-radio-ico-checked": checked,
      "rc-radio-ico-un-checked": !isFirstRender.current && !checked,
    });
  }, [checked]);

  const radioLabelClass = useMemo(() => {
    return classNames(["rc-radio-label", `rc-radio-label-${size}`]);
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
        tabIndex={0}
        role="radio"
        ref={ref}
        style={style}
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
