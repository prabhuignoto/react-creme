import classNames from "classnames";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { CloseIcon } from "../../icons";
import { InputModel } from "./input-model";
import "./input.scss";

const Input: React.FunctionComponent<InputModel> = ({
  children,
  enableClear = false,
  onChange,
  onKeyUp,
  placeholder = "Please enter a value ...",
  type = "text",
  value = "",
}) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [inputValue, setValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = useCallback(() => setHasFocus(true), []);

  const handleBlur = useCallback(() => setHasFocus(false), []);

  const inputClass = useMemo(
    () => classNames(["input-wrapper", hasFocus ? "focus" : ""]),
    [hasFocus]
  );

  const debouncedOnChange = onChange
    ? useDebouncedCallback(onChange, 100)
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

  const handleInput = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const val = ev.target.value;
    setValue(val);
    debouncedOnChange && debouncedOnChange(val);
  }, []);

  useEffect(() => setValue(value), [value]);

  const clearClass = useMemo(
    () => classNames(["input-clear", !inputValue ? "hidden" : ""]),
    [inputValue]
  );

  const inputWidth = useMemo(() => {
    let width = `100%`;

    if (enableClear) {
      width = `100% - 2rem`;
    }

    if (children) {
      width = `100% - 3rem`;
    }

    return {
      "--width": width,
    } as CSSProperties;
  }, []);

  return (
    <div
      className={inputClass}
      tabIndex={0}
      style={inputWidth}
      onClick={handleFocus}
      role="textbox"
    >
      {children && <span className={"input-icon"}>{children}</span>}
      <input
        type={type}
        placeholder={placeholder}
        onClick={handleFocus}
        onChange={handleInput}
        onKeyUp={onKeyUp}
        value={inputValue}
        onBlur={handleBlur}
        ref={inputRef}
      />
      {enableClear && (
        <span onMouseDown={handleClear} className={clearClass} role="button">
          <CloseIcon />
        </span>
      )}
    </div>
  );
};

export { Input };
