import * as React from "react";

export interface TogglerProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const Toggler = React.forwardRef<HTMLInputElement, TogglerProps>(
  ({ checked: checkedProp, disabled = false, onChange, className = "" }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(false);
    const isControlled = checkedProp !== undefined;
    const checked = isControlled ? checkedProp : internalChecked;

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
          if (!isControlled) {
            setInternalChecked(e.target.checked);
          }
          onChange?.(e.target.checked);
        }
      },
      [disabled, onChange, isControlled]
    );

    const classes = [
      "astrum-toggler",
      checked && "astrum-toggler--checked",
      disabled && "astrum-toggler--disabled",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <label className={classes}>
        <input
          ref={ref}
          type="checkbox"
          checked={isControlled ? checked : undefined}
          onChange={handleChange}
          disabled={disabled}
          className="astrum-toggler__input"
        />
        <span className="astrum-toggler__track">
          <span className="astrum-toggler__thumb"></span>
        </span>
      </label>
    );
  }
);

Toggler.displayName = "Toggler";
