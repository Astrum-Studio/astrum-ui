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

const DEFAULT_COLORS = [
  "#E53935",
  "#FF9800",
  "#FDD835",
  "#8BC34A",
  "#4CAF50",
  "#009688",
  "#00BCD4",
  "#2196F3",
  "#7B1FA2",
  "#E91E63",
];

export interface ColorPickerProps {
  value?: string | null;
  onChange?: (color: string) => void;
  colors?: string[];
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value = null,
      onChange,
      colors = DEFAULT_COLORS,
      disabled = false,
      className = "",
      "aria-label": ariaLabel = "Выбор цвета",
    },
    ref
  ) => {
    const [hovered, setHovered] = React.useState<string | null>(null);

    return (
      <div
        ref={ref}
        className={`astrum-color-swatch-picker ${className}`.trim()}
        role="listbox"
        aria-label={ariaLabel}
        aria-disabled={disabled}
      >
        {colors.map((color) => {
          const isSelected =
            value != null && value.toLowerCase() === color.toLowerCase();
          const isHovered = hovered === color && !disabled;

          return (
            <button
              key={color}
              type="button"
              role="option"
              aria-selected={isSelected}
              aria-label={color}
              disabled={disabled}
              className="astrum-color-swatch-picker__swatch"
              style={{ ["--astrum-swatch-color" as string]: color }}
              data-selected={isSelected || undefined}
              data-hovered={isHovered || undefined}
              onClick={() => onChange?.(color)}
              onMouseEnter={() => setHovered(color)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="astrum-color-swatch-picker__check" aria-hidden>
                {CHECK_ICON}
              </span>
            </button>
          );
        })}
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";
