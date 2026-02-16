import * as React from "react";

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M5 7.5l5 5 5-5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: React.ReactNode;
  error?: string;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  size?: "s" | "m" | "l";
  className?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      required,
      options,
      placeholder,
      size = "m",
      className = "",
      id: idProp,
      value,
      defaultValue,
      onChange,
      disabled,
      ...rest
    },
    ref
  ) => {
    const id = React.useId();
    const selectId = idProp ?? id;
    const [isOpen, setIsOpen] = React.useState(false);
    const selectRef = React.useRef<HTMLSelectElement | null>(null);
    const dropdownRef = React.useRef<HTMLDivElement | null>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const setRef = React.useCallback(
      (el: HTMLSelectElement | null) => {
        selectRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      },
      [ref]
    );

    const currentValue = value !== undefined ? value : defaultValue ?? "";
    const selectedOption = currentValue ? options.find((opt) => opt.value === currentValue) : null;
    const displayValue = selectedOption ? selectedOption.label : placeholder ?? "";

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    const handleOptionClick = (optionValue: string) => {
      if (selectRef.current) {
        const nativeEvent = new Event("change", { bubbles: true });
        Object.defineProperty(nativeEvent, "target", {
          writable: false,
          value: selectRef.current,
        });
        selectRef.current.value = optionValue;
        selectRef.current.dispatchEvent(nativeEvent);
        const reactEvent = {
          ...nativeEvent,
          target: selectRef.current,
          currentTarget: selectRef.current,
        } as unknown as React.ChangeEvent<HTMLSelectElement>;
        onChange?.(reactEvent);
      }
      setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(!isOpen);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown" && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    return (
      <>
        <div
          ref={containerRef}
          className={`astrum-select ${size === "s" ? "astrum-select--s" : size === "l" ? "astrum-select--l" : "astrum-select--m"} ${error ? "astrum-select--error" : ""} ${isOpen ? "astrum-select--open" : ""} ${className}`.trim()}
        >
          {label != null && (
            <label htmlFor={selectId} className="astrum-select__label">
              {label}
              {required && <span className="astrum-select__required" aria-hidden>*</span>}
            </label>
          )}
          <div className="astrum-select__wrap">
            <select
              ref={setRef}
              id={selectId}
              className="astrum-select__field"
              value={value !== undefined ? value : undefined}
              defaultValue={value === undefined ? defaultValue : undefined}
              onChange={(e) => {
                onChange?.(e);
                setIsOpen(false);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                if (!disabled) setIsOpen(!isOpen);
              }}
              onClick={(e) => {
                e.preventDefault();
                if (!disabled) setIsOpen(!isOpen);
              }}
              disabled={disabled}
              aria-invalid={!!error}
              aria-required={required}
              aria-describedby={error ? `${selectId}-error` : undefined}
              aria-expanded={isOpen}
              {...rest}
            >
              {placeholder && (
                <option value="" disabled hidden>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {typeof option.label === "string" ? option.label : option.value}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="astrum-select__trigger"
              onClick={() => !disabled && setIsOpen(!isOpen)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              aria-label="Открыть список"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              <span className={`astrum-select__value ${!selectedOption && placeholder ? "astrum-select__value--placeholder" : ""}`}>
              {displayValue}
            </span>
              <span className={`astrum-select__chevron ${isOpen ? "astrum-select__chevron--open" : ""}`}>
                <ChevronDownIcon />
              </span>
            </button>
          </div>
          {error != null && (
            <div className="astrum-select__footer">
              <span id={`${selectId}-error`} className="astrum-select__error" role="alert">
                {error}
              </span>
            </div>
          )}
        </div>
        {isOpen && (
          <div ref={dropdownRef} className="astrum-select__dropdown" role="listbox">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === currentValue}
                className={`astrum-select__option ${option.value === currentValue ? "astrum-select__option--selected" : ""} ${option.disabled ? "astrum-select__option--disabled" : ""}`}
                onClick={() => !option.disabled && handleOptionClick(option.value)}
                disabled={option.disabled}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </>
    );
  }
);

Select.displayName = "Select";
