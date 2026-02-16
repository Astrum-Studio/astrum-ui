import * as React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  error?: string;
  required?: boolean;
  suffix?: React.ReactNode;
  size?: "s" | "m" | "l";
  inputClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      required,
      suffix,
      size = "m",
      className = "",
      inputClassName = "",
      id: idProp,
      value: valueProp,
      defaultValue,
      onChange,
      disabled,
      ...rest
    },
    ref
  ) => {
    const id = React.useId();
    const inputId = idProp ?? id;
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (valueProp === undefined) setInternalValue(e.target.value);
        onChange?.(e);
      },
      [onChange, valueProp]
    );

    return (
      <div
        className={`astrum-input ${size === "s" ? "astrum-input--s" : size === "l" ? "astrum-input--l" : "astrum-input--m"} ${error ? "astrum-input--error" : ""} ${className}`.trim()}
      >
        {label != null && (
          <label htmlFor={inputId} className="astrum-input__label">
            {label}
            {required && <span className="astrum-input__required" aria-hidden>*</span>}
          </label>
        )}
        <div className="astrum-input__wrap">
          <input
            ref={ref}
            id={inputId}
            className={`astrum-input__field ${inputClassName}`.trim()}
            value={valueProp !== undefined ? valueProp : undefined}
            defaultValue={valueProp === undefined ? defaultValue : undefined}
            onChange={handleChange}
            disabled={disabled}
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...rest}
          />
          {suffix != null && <span className="astrum-input__suffix">{suffix}</span>}
        </div>
        {error != null && (
          <div className="astrum-input__footer">
            <span id={`${inputId}-error`} className="astrum-input__error" role="alert">
              {error}
            </span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
