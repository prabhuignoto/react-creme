import classNames from "classnames";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import "../../design/focus.scss";
import { CloseIcon } from "../../icons";
import { useFocus } from "../common/effects/useFocus";
import { InputModel } from "./input-model";
import "./input.scss";

const Input: React.FunctionComponent<InputModel> = React.memo(
  ({
    children,
    disabled = false,
    enableClear = false,
    onChange,
    onKeyUp,
    placeholder = "Please enter a value ...",
    state = "default",
    style,
    type = "text",
    value = "",
  }: InputModel) => {
    const [inputValue, setValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const ref = useRef(null);

    const debouncedOnChange = onChange
      ? useDebouncedCallback(onChange, 250)
      : null;

    const handleClear = useCallback((ev: React.MouseEvent) => {
      ev.preventDefault();
      setValue("");

      if (inputRef.current) {
        inputRef.current.focus();
      }

      if (debouncedOnChange) {
        debouncedOnChange("");
      }
    }, []);

    const handleInput = useCallback(
      (ev: React.ChangeEvent<HTMLInputElement>) => {
        const val = ev.target.value;
        setValue(val);
        debouncedOnChange && debouncedOnChange(val);
      },
      []
    );

    useEffect(() => setValue(value), [value]);

    const clearClass = useMemo(
      () => classNames(["rc-input-clear", !inputValue ? "hidden" : ""]),
      [inputValue]
    );

    useFocus(ref, { bgHighlight: true });

    const inputClass = useMemo(
      () =>
        classNames("rc-input", {
          [`rc-input-${state}`]: true,
          "rc-input-no-icon": !children,
          "rc-input-disabled": disabled,
        }),
      [disabled]
    );

    return (
      <div
        className={inputClass}
        role="textbox"
        ref={ref}
        style={style}
        tabIndex={0}
        onClick={() => inputRef.current && inputRef.current.focus()}
      >
        <span className={"rc-input-icon"}>{children}</span>
        <input
          type={type}
          placeholder={placeholder}
          onChange={handleInput}
          onKeyUp={onKeyUp}
          value={inputValue}
          ref={inputRef}
        />
        <span onMouseDown={handleClear} className={clearClass} role="button">
          {enableClear && <CloseIcon />}
        </span>
      </div>
    );
  },
  (prev, cur) => prev.value === cur.value
);

Input.displayName = "Input";

export { Input };
