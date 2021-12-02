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
import { CheckboxModel } from "./checkbox-model";
import "./checkbox.scss";

const CheckBox: React.FunctionComponent<CheckboxModel> = React.memo(
  ({
    label,
    onChange,
    isChecked = false,
    disabled,
    size = "sm",
    style,
    border = true,
    noHoverStyle = false,
    autoHeight = false,
    focusable = true,
    focusIcon = false,
  }: CheckboxModel) => {
    const [checked, setChecked] = useState(isChecked);
    const ref = useRef(null);
    const id = useRef(`label-${nanoid()}`);

    const toggleCheck = useCallback(() => {
      setChecked((prev) => !prev);
      onChange && onChange(!checked);
    }, []);

    if (focusable) {
      useFocus(ref, toggleCheck);
    }

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
      []
    );

    const checkBoxClass = useMemo(
      () =>
        classNames("rc-checkbox", {
          "rc-disabled": disabled,
          [`rc-checkbox-${size}`]: true,
          "rc-checkbox-focus": focusIcon,
        }),
      [disabled]
    );

    const wrapperClass = useMemo(
      () =>
        classNames("rc-checkbox-wrapper", {
          [`rc-checkbox-${size}`]: true,
          "rc-disabled": disabled,
          "rc-checkbox-border": border,
          "rc-checkbox-hover": !noHoverStyle,
          "rc-checkbox-auto-height": autoHeight,
          "rc-checkbox-focus": !focusIcon,
        }),
      [size, disabled]
    );

    useEffect(() => {
      if (!isFirstRender.current && !disabled) {
        console.log(isChecked);
        setChecked(isChecked);
      }
    }, [isChecked, disabled]);

    useEffect(() => {
      if (!isFirstRender.current) {
        // onChange && onChange(checked);
      }
    }, [checked]);

    const focusProps = useMemo(
      () => ({
        ref: ref,
        tabIndex: disabled || !focusable ? -1 : 0,
      }),
      [disabled]
    );

    const wrapperProps = useMemo(() => (!focusIcon ? focusProps : null), []);
    const iconProps = useMemo(() => (focusIcon ? focusProps : null), []);

    const isFirstRender = useFirstRender();

    return (
      <div
        aria-checked={checked}
        aria-labelledby={id.current}
        className={wrapperClass}
        onClick={toggleCheck}
        role="checkbox"
        style={style}
        {...wrapperProps}
      >
        <div className={checkBoxClass} {...iconProps}>
          <span className={iconClass} role="img">
            <CheckIcon />
          </span>
        </div>
        <label className={labelClass} id={id.current}>
          {label}
        </label>
      </div>
    );
  },
  (prev, next) => {
    return prev.isChecked === next.isChecked && prev.disabled === next.disabled;
  }
);

CheckBox.displayName = "CheckBox";

export { CheckBox };
