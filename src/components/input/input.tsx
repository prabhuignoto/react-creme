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
import "../../design/focus.scss";
import { CloseIcon } from "../../icons";
import { useFocus } from "../common/effects/useFocus";
import { InputModel } from "./input-model";
import "./input.scss";

const Input: React.FunctionComponent<InputModel> = React.memo(
  ({
    children,
    enableClear = false,
    onChange,
    onKeyUp,
    placeholder = "Please enter a value ...",
    type = "text",
    value = "",
  }: InputModel) => {
    const [inputValue, setValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const ref = useRef(null);

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

    useFocus(inputRef, { bgHighlight: true });

    return (
      <div className="rc-input" style={inputWidth} role="textbox" ref={ref}>
        {children && <span className={"rc-input-icon"}>{children}</span>}
        <input
          type={type}
          placeholder={placeholder}
          onChange={handleInput}
          onKeyUp={onKeyUp}
          value={inputValue}
          ref={inputRef}
          tabIndex={0}
        />
        {enableClear && (
          <span onMouseDown={handleClear} className={clearClass} role="button">
            <CloseIcon />
          </span>
        )}
      </div>
    );
  },
  (prev, cur) => prev.value === cur.value
);

Input.displayName = "Input";

export { Input };
