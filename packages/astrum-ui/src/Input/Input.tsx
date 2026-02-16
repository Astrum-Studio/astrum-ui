import * as React from "react";

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11.0586" cy="11.0586" r="7.06194" stroke="#ABABAB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M20.0033 20.0034L16.0517 16.0518" stroke="#ABABAB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const ClearIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.00037 6.00024L18.0004 18.0002" stroke="#ABABAB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.0004 6.00024L6.00037 18.0002" stroke="#ABABAB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EyeOpenIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 11.5455C3 11.5455 6.27273 5 12 5C17.7273 5 21 11.5455 21 11.5455C21 11.5455 17.7273 18.0909 12 18.0909C6.27273 18.0909 3 11.5455 3 11.5455Z" stroke="#ABABAB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12 14C13.3556 14 14.4545 12.9011 14.4545 11.5455C14.4545 10.1898 13.3556 9.09091 12 9.09091C10.6444 9.09091 9.54545 10.1898 9.54545 11.5455C9.54545 12.9011 10.6444 14 12 14Z" stroke="#ABABAB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.86 16.86C15.4614 17.9261 13.7584 18.5167 12 18.5455C6.27273 18.5455 3 12 3 12C4.01773 10.1034 5.42929 8.44632 7.14 7.14M10.2818 5.65091C10.845 5.51908 11.4216 5.45319 12 5.45455C17.7273 5.45455 21 12 21 12C20.5033 12.9291 19.911 13.8039 19.2327 14.61M13.7345 13.7345C13.5098 13.9757 13.2388 14.1691 12.9378 14.3033C12.6367 14.4374 12.3116 14.5096 11.9821 14.5154C11.6525 14.5212 11.3251 14.4606 11.0195 14.3371C10.7139 14.2137 10.4362 14.0299 10.2031 13.7969C9.97007 13.5638 9.78632 13.2861 9.66287 12.9805C9.53942 12.6749 9.47879 12.3475 9.48461 12.0179C9.49042 11.6884 9.56256 11.3633 9.69672 11.0622C9.83087 10.7612 10.0243 10.4902 10.2655 10.2655M3 3L21 21" stroke="#ABABAB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

export type InputType = "text" | "tel" | "email" | "number" | "password" | "search";

export type InputSize = "s" | "m";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  type?: InputType;
  name?: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  size?: InputSize;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      name,
      required = false,
      label,
      placeholder,
      error,
      value,
      onChange,
      disabled,
      size = "m",
      className = "",
      id: idProp,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    const id = React.useId();
    const inputId = idProp ?? id;
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const combinedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const wrapClasses = [
      "astrum-input__wrap",
      type === "search" && "astrum-input__wrap--search",
      type === "password" && "astrum-input__wrap--password",
    ]
      .filter(Boolean)
      .join(" ");

    const inputType = type === "password" && isPasswordVisible ? "text" : type;

    const sizeClass = size === "s" ? "astrum-input--s" : "astrum-input--m";

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const hasValue = currentValue != null && currentValue !== "";

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setInternalValue(e.target.value);
        }
        onChange?.(e);
      },
      [onChange, isControlled]
    );

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (inputRef.current) {
          if (isControlled && onChange) {
            const syntheticEvent = {
              ...e,
              target: inputRef.current,
              currentTarget: inputRef.current,
            } as React.ChangeEvent<HTMLInputElement>;
            Object.defineProperty(syntheticEvent.target, "value", {
              writable: true,
              value: "",
            });
            onChange(syntheticEvent);
          } else {
            setInternalValue("");
            inputRef.current.value = "";
            if (onChange) {
              const syntheticEvent = {
                ...e,
                target: inputRef.current,
                currentTarget: inputRef.current,
              } as React.ChangeEvent<HTMLInputElement>;
              Object.defineProperty(syntheticEvent.target, "value", {
                writable: true,
                value: "",
              });
              onChange(syntheticEvent);
            }
          }
          inputRef.current.focus();
        }
      },
      [onChange, isControlled]
    );

    return (
      <div
        className={`astrum-input ${sizeClass} ${error ? "astrum-input--error" : ""} ${className}`.trim()}
      >
        {label != null && (
          <label htmlFor={inputId} className="astrum-input__label">
            {label}
          </label>
        )}
        <div className={wrapClasses}>
          {required && 
            <span className="astrum-input__required-icon" aria-hidden>
              <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.21831 3.52817L0 3.57042V2.47183L2.21831 2.53521L1.03521 0.59155L2.07042 0L3.19014 1.90141L4.28873 0L5.28169 0.59155L4.07746 2.53521L6.25352 2.47183V3.57042L4.09859 3.52817L5.26056 5.42958L4.26761 6L3.14789 4.07747L2.02817 6L1.01408 5.40845L2.21831 3.52817Z" fill="#ABABAB" />
              </svg>
            </span>
          }

          <input
            ref={combinedRef}
            id={inputId}
            type={inputType}
            name={name}
            placeholder={placeholder}
            value={isControlled ? value : undefined}
            defaultValue={isControlled ? undefined : defaultValue}
            onChange={handleChange}
            required={required}
            disabled={disabled}
            className={`astrum-input__field ${error ? "astrum-input__field--invalid" : ""}`.trim()}
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...rest}
          />

          {type === "search" && (
            <>
              {hasValue ? (
                <button
                  type="button"
                  className="astrum-input__clear-icon"
                  onClick={handleClear}
                  tabIndex={-1}
                  aria-label="Очистить"
                >
                  <ClearIcon />
                </button>
              ) : (
                <span className="astrum-input__search-icon" aria-hidden>
                  <SearchIcon />
                </span>
              )}
            </>
          )}
          {type === "password" && (
            <button
              type="button"
              className="astrum-input__password-toggle"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              tabIndex={-1}
              aria-label={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
            >
              {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </button>
          )}
        </div>

        {error != null && (
          <span id={`${inputId}-error`} className="astrum-input__error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
