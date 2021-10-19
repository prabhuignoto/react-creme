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
import { useKeyWithDependency } from "../common/effects/useKey";
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

  useKeyWithDependency(ref, toggleCheck, canToggle);

  const RadioWrapperClass = useMemo(
    () =>
      classNames(
        ["rc-radio"],
        {
          "rc-radio-disabled": disabled,
          "rc-radio-checked": checked,
        },
        ...(ref.current !== null ? ref.current.classList : [])
      ),
    [checked]
  );

  const RadioIconClass = useMemo(() => {
    return classNames(["rc-radio-icon"], {
      "rc-radio-ico-checked": checked,
      "rc-radio-ico-un-checked": !isFirstRender.current && !checked,
    });
  }, [checked]);

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
      ref={ref}
    >
      <span className={RadioIconClass}></span>
      {/* <input type="hidden" value={value} aria-labelledby={labelID.current} /> */}
      <label className="rc-radio-label" id={labelID.current}>
        {label}
      </label>
    </div>
  );
};

export { Radio };
