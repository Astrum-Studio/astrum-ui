import * as React from "react";

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path
      d="M3 3l6 6M9 3l-6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export interface ChipsProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  children: React.ReactNode;
  size?: "s" | "m";
  onRemove?: () => void;
}

export const Chips = React.forwardRef<HTMLButtonElement, ChipsProps>(
  (
    {
      children,
      size = "s",
      onRemove,
      className = "",
      onClick,
      ...rest
    },
    ref
  ) => {
    const handleRemove = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove?.();
      },
      [onRemove]
    );

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onRemove && e.target === e.currentTarget) {
          return;
        }
        onClick?.(e);
      },
      [onClick, onRemove]
    );

    return (
      <button
        ref={ref}
        type="button"
        className={`astrum-chips ${size === "s" ? "astrum-chips--s" : "astrum-chips--m"} ${className}`.trim()}
        onClick={handleClick}
        {...rest}
      >
        <span className="astrum-chips__text">{children}</span>
        <button
          type="button"
          className="astrum-chips__remove"
          onClick={handleRemove}
          aria-label="Удалить"
        >
          <CloseIcon />
        </button>
      </button>
    );
  }
);

Chips.displayName = "Chips";
