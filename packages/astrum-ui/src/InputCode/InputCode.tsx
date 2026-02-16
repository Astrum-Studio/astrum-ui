import * as React from "react";
import "./InputCode.css";

const LENGTH = 6;
const PLACEHOLDER = "–";

function normalizeValue(s: string): string {
  return s.replace(/\D/g, "").slice(0, LENGTH);
}

export interface InputCodeProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const InputCode = React.forwardRef<HTMLDivElement, InputCodeProps>(
  (
    {
      value: valueProp,
      defaultValue = "",
      onChange,
      onComplete,
      error,
      required,
      disabled = false,
      id: idProp,
      className = "",
    },
    ref
  ) => {
    const id = React.useId();
    const rootId = idProp ?? id;
    const [internalValue, setInternalValue] = React.useState(() =>
      normalizeValue(defaultValue)
    );
    const value = valueProp !== undefined ? normalizeValue(valueProp) : internalValue;
    const digits = value.split("");
    while (digits.length < LENGTH) digits.push("");
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const setValue = React.useCallback(
      (next: string) => {
        const normalized = normalizeValue(next);
        if (valueProp === undefined) setInternalValue(normalized);
        onChange?.(normalized);
        if (normalized.length === LENGTH) onComplete?.(normalized);
      },
      [valueProp, onChange, onComplete]
    );

    const handleChange = React.useCallback(
      (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        if (raw.length > 1) {
          const pasted = normalizeValue(raw);
          const combined =
            value.slice(0, index) + pasted + value.slice(index + pasted.length);
          setValue(normalizeValue(combined));
          const nextIndex = Math.min(index + pasted.length, LENGTH - 1);
          setTimeout(() => inputRefs.current[nextIndex]?.focus(), 0);
          return;
        }
        const char = raw.replace(/\D/g, "");
        const next =
          value.slice(0, index) + char + value.slice(index + 1);
        setValue(next);
        if (char) setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
      },
      [value, setValue]
    );

    const handleKeyDown = React.useCallback(
      (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !value[index] && index > 0) {
          e.preventDefault();
          const next = value.slice(0, index - 1) + value.slice(index);
          setValue(next);
          setTimeout(() => inputRefs.current[index - 1]?.focus(), 0);
        }
      },
      [value, setValue]
    );

    const handlePaste = React.useCallback(
      (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = normalizeValue(e.clipboardData.getData("text"));
        if (pasted.length > 0) {
          setValue(pasted);
          const nextIndex = Math.min(pasted.length, LENGTH) - 1;
          setTimeout(() => inputRefs.current[nextIndex]?.focus(), 0);
        }
      },
      [setValue]
    );

    return (
      <div
        ref={ref}
        id={rootId}
        className={["astrum-input-code", className].filter(Boolean).join(" ")}
      >
        <div className="astrum-input-code__wrap">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              id={index === 0 ? `${rootId}-0` : undefined}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              className="astrum-input-code__cell"
              value={digit}
              placeholder={PLACEHOLDER}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={disabled}
              aria-invalid={!!error}
              aria-required={required}
              aria-describedby={error ? `${rootId}-error` : undefined}
            />
          ))}
        </div>
        {error != null && (
          <div className="astrum-input-code__footer">
            <span
              id={`${rootId}-error`}
              className="astrum-input-code__error"
              role="alert"
            >
              {error}
            </span>
          </div>
        )}
      </div>
    );
  }
);

InputCode.displayName = "InputCode";
