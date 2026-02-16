import * as React from "react";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  value: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ value, className = "", id: idProp, ...rest }, ref) => {
    const id = React.useId();
    const inputId = idProp ?? id;

    return (
      <label
        htmlFor={inputId}
        className={`astrum-radio ${className}`.trim()}
      >
        <input
          ref={ref}
          type="radio"
          id={inputId}
          value={value}
          className="astrum-radio__input"
          {...rest}
        />
        <span className="astrum-radio__circle" aria-hidden />
      </label>
    );
  }
);

Radio.displayName = "Radio";

export interface RadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  name: string;
  value?: string | null;
  onChange?: (value: string) => void;
  children: React.ReactNode;
}

export const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ name, value, onChange, children, ...rest }, ref) => {
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
      },
      [onChange]
    );

    return (
      <fieldset ref={ref} className="astrum-radio-group" {...rest}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Radio) {
            return React.cloneElement(child as React.ReactElement<RadioProps>, {
              name,
              checked: value != null && child.props.value === value,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                (child.props as RadioProps & { onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }).onChange?.(e);
                handleChange(e);
              },
            });
          }
          return child;
        })}
      </fieldset>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
