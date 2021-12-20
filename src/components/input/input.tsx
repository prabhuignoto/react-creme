import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CloseIcon } from "../../icons";
import { InputModel } from "./input-model";
import "./input.scss";

const Input: React.FunctionComponent<InputModel> = ({
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
  controlled = false,
  noUniqueId = false,
  id = "",
  isAutoComplete = false,
  border = false,
}: InputModel) => {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef(null);

  const inputId = useRef(noUniqueId ? id : nanoid());

  const handleClear = useCallback((ev: React.MouseEvent) => {
    ev.preventDefault();
    setInputValue("");

    if (inputRef.current) {
      inputRef.current.focus();
    }
    onChange?.("");
  }, []);

  const handleInput = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (controlled) {
        const val = ev.target.value;
        setInputValue(val);
        onChange?.(val);
      }
    },
    [controlled]
  );

  const handleUnControlled = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const val = ev.target.value;
      onChange?.(val);
    },
    []
  );

  useEffect(() => setInputValue(value), [value]);

  const clearClass = useMemo(
    () => classNames(["rc-input-clear", !inputValue ? "hidden" : ""]),
    [inputValue]
  );

  // useFocus(ref, { bgHighlight: true });

  const inputClass = useMemo(
    () =>
      classNames("rc-input", {
        [`rc-input-${state}`]: true,
        "rc-input-no-icon": !children,
        "rc-input-disabled": disabled,
        "rc-input-border": border,
      }),
    [disabled]
  );

  useEffect(() => {
    if (controlled) {
      setInputValue(value);
    }
  }, [value]);

  const controlledProps = controlled
    ? { onChange: handleInput, value: inputValue }
    : { onChange: handleUnControlled };

  const autoCompleteProps = useMemo(
    () =>
      isAutoComplete
        ? {
            role: "combobox",
            "aria-controls": id,
          }
        : null,
    [isAutoComplete]
  );

  return (
    <div
      className={inputClass}
      role="textbox"
      ref={ref}
      style={style}
      tabIndex={0}
      {...autoCompleteProps}
      onClick={() => inputRef.current && inputRef.current.focus()}
    >
      <span className={"rc-input-icon"}>{children}</span>
      <input
        type={type}
        placeholder={placeholder}
        {...controlledProps}
        onKeyUp={onKeyUp}
        ref={inputRef}
        id={inputId.current}
      />
      <span onMouseDown={handleClear} className={clearClass} role="button">
        {enableClear && <CloseIcon />}
      </span>
    </div>
  );
};

Input.displayName = "Input";

export { Input };
