import * as React from "react";
import "./InputCode.css";

const LENGTH = 6;

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
    for (let i = 0; i < LENGTH; i++) {
      if (!inputRefs.current[i]) {
        inputRefs.current[i] = null;
      }
    }

    const setValue = React.useCallback(
      (next: string) => {
        const normalized = normalizeValue(next);
        if (valueProp === undefined) setInternalValue(normalized);
        onChange?.(normalized);
        if (normalized.length === LENGTH) onComplete?.(normalized);
      },
      [valueProp, onChange, onComplete]
    );

    React.useEffect(() => {
      if (value.length === LENGTH && onComplete) {
        onComplete(value);
      }
    }, [value, onComplete]);

    React.useEffect(() => {
      inputRefs.current.forEach((ref, index) => {
        if (ref) {
          ref.value = digits[index] || "";
        }
      });
    }, [value, digits]);

    const handleInput = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const input = e.target;
        const previousInput = inputRefs.current[index - 1];
        const nextInput = inputRefs.current[index + 1];

        const newCode = [...digits];
        const char = normalizeValue(input.value);
        
        if (char) {
          newCode[index] = char;
          setValue(newCode.join(""));
          input.select();
          
          if (nextInput) {
            nextInput.focus();
            nextInput.select();
          }
        } else {
          newCode[index] = "";
          setValue(newCode.join(""));
          
          if (previousInput) {
            previousInput.focus();
            previousInput.select();
          }
        }
      },
      [digits, setValue]
    );

    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
      },
      []
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const input = e.target as HTMLInputElement;
        const previousInput = inputRefs.current[index - 1];

        if ((e.key === "Backspace" || e.key === "Delete") && !input.value && index > 0) {
          e.preventDefault();
          const newCode = [...digits];
          newCode[index - 1] = "";
          setValue(newCode.join(""));
          if (previousInput) {
            previousInput.focus();
            previousInput.select();
          }
        }
      },
      [digits, setValue]
    );

    const handlePaste = React.useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedCode = normalizeValue(e.clipboardData.getData("text"));
        if (pastedCode.length === LENGTH) {
          setValue(pastedCode);
          inputRefs.current.forEach((inputRef, index) => {
            if (inputRef) {
              inputRef.value = pastedCode[index] || "";
            }
          });
          const lastInput = inputRefs.current[LENGTH - 1];
          if (lastInput) {
            lastInput.focus();
            lastInput.select();
          }
        } else if (pastedCode.length > 0) {
          const activeIndex = inputRefs.current.findIndex(
            (ref) => ref === document.activeElement
          );
          if (activeIndex >= 0) {
            const newCode = [...digits];
            for (let i = 0; i < pastedCode.length && activeIndex + i < LENGTH; i++) {
              newCode[activeIndex + i] = pastedCode[i];
            }
            setValue(newCode.join(""));
            const nextIndex = Math.min(activeIndex + pastedCode.length, LENGTH - 1);
            const nextInput = inputRefs.current[nextIndex];
            if (nextInput) {
              nextInput.focus();
              nextInput.select();
            }
          }
        }
      },
      [digits, setValue]
    );

    return (
      <div
        ref={ref}
        id={rootId}
        className={`astrum-input-code ${error ? "astrum-input-code--error" : ""} ${className}`.trim()}
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
              className={`astrum-input-code__cell ${index === 3 ? "astrum-input-code__cell--spaced" : ""}`.trim()}
              value={digit}
              onChange={(e) => handleInput(e, index)}
              onFocus={handleFocus}
              onKeyDown={(e) => handleKeyDown(e, index)}
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
