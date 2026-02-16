import * as React from "react";

export interface TogglerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: React.ReactNode;
  size?: "s" | "m";
}

export const Toggler = React.forwardRef<HTMLInputElement, TogglerProps>(
  ({ label, size = "m", className = "", id: idProp, ...rest }, ref) => {
    const id = React.useId();
    const inputId = idProp ?? id;

    return (
      <label
        htmlFor={inputId}
        className={`astrum-toggler ${size === "s" ? "astrum-toggler--s" : "astrum-toggler--m"} ${className}`.trim()}
      >
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          role="switch"
          className="astrum-toggler__input"
          {...rest}
        />
        <span className="astrum-toggler__track" aria-hidden>
          <span className="astrum-toggler__knob" />
        </span>
        {label != null && <span className="astrum-toggler__label">{label}</span>}
      </label>
    );
  }
);

Toggler.displayName = "Toggler";
