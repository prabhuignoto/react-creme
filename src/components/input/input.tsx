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
import { useFirstRender } from "../common/effects/useFirstRender";
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
  focus = false,
}: InputModel) => {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useFirstRender();

  const inputId = useRef(noUniqueId ? id : nanoid());

  const [hasFocus, setHasFocus] = useState(false);

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

  const clearClass = useMemo(
    () => classNames(["rc-input-clear", !inputValue ? "hidden" : ""]),
    [inputValue]
  );

  const inputClass = useMemo(
    () =>
      classNames("rc-input", {
        [`rc-input-${state}`]: true,
        "rc-input-no-icon": !children,
        "rc-input-disabled": disabled,
        "rc-input-border": border,
        "rc-input-focus": hasFocus,
      }),
    [disabled, hasFocus]
  );

  useEffect(() => {
    if (controlled && !isFirstRender.current) {
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

  const focusProps = useMemo(() => {
    if (focus) {
      return {
        onFocus: () => setHasFocus(true),
        onBlur: () => setHasFocus(false),
      };
    } else {
      return {};
    }
  }, []);

  return (
    <div
      className={inputClass}
      role="textbox"
      ref={ref}
      style={style}
      tabIndex={0}
      aria-label={placeholder}
      {...autoCompleteProps}
    >
      <span className={"rc-input-icon"}>{children}</span>
      <input
        type={type}
        placeholder={placeholder}
        {...controlledProps}
        onKeyUp={onKeyUp}
        ref={inputRef}
        id={inputId.current}
        disabled={disabled}
        {...focusProps}
      />
      <span onMouseDown={handleClear} className={clearClass} role="button">
        {enableClear && <CloseIcon />}
      </span>
    </div>
  );
};

Input.displayName = "Input";

export { Input };
