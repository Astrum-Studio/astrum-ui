import * as React from "react";

const CHECK_ICON = (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden>
    <path
      d="M1 5.5L4.5 9L11 1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MINUS_ICON = (
  <svg width="10" height="2" viewBox="0 0 10 2" fill="none" aria-hidden>
    <path d="M1 1h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange"> {
  checked?: boolean;
  indeterminate?: boolean;
  size?: "s" | "m";
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked: checkedProp,
      indeterminate = false,
      size = "m",
      disabled = false,
      onChange,
      className = "",
      id: idProp,
      ...rest
    },
    ref
  ) => {
    const { defaultChecked, ...restInput } = rest;
    const isControlled = checkedProp !== undefined;
    const checked = checkedProp ?? false;
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
    const isChecked = (isControlled ? checked : internalChecked) || indeterminate;
    const id = React.useId();
    const inputId = idProp ?? id;
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const setRef = React.useCallback(
      (el: HTMLInputElement | null) => {
        inputRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      },
      [ref]
    );

    React.useEffect(() => {
      const el = inputRef.current;
      if (el) el.indeterminate = indeterminate;
    }, [indeterminate]);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        if (!isControlled) setInternalChecked(e.target.checked);
        onChange?.(e.target.checked);
      },
      [disabled, isControlled, onChange]
    );

    return (
      <label
        htmlFor={inputId}
        className={[
          "astrum-checkbox",
          size === "s" ? "astrum-checkbox--s" : "astrum-checkbox--m",
          isChecked ? "astrum-checkbox--checked" : "",
          indeterminate ? "astrum-checkbox--indeterminate" : "",
          disabled ? "astrum-checkbox--disabled" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <input
          ref={setRef}
          type="checkbox"
          id={inputId}
          className="astrum-checkbox__input"
          {...(isControlled ? { checked } : { defaultChecked })}
          disabled={disabled}
          onChange={handleChange}
          aria-checked={indeterminate ? "mixed" : (isControlled ? checked : internalChecked)}
          {...restInput}
        />
        <span className="astrum-checkbox__box" aria-hidden>
          {isChecked && (
            <span className="astrum-checkbox__icon" aria-hidden>
              {indeterminate ? MINUS_ICON : CHECK_ICON}
            </span>
          )}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
