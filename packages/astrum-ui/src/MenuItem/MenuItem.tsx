import * as React from "react";

const LightningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M8.5 2l-4 6h3l-1 6 4-6h-3l1-6z"
      fill="currentColor"
    />
  </svg>
);

export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  active?: boolean;
}

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  (
    {
      children,
      icon,
      endIcon,
      active = false,
      className = "",
      disabled,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`astrum-menu-item ${active ? "astrum-menu-item--active" : ""} ${disabled ? "astrum-menu-item--disabled" : ""} ${className}`.trim()}
        disabled={disabled}
        {...rest}
      >
        {icon != null && (
          <span className="astrum-menu-item__icon" aria-hidden>
            {icon}
          </span>
        )}
        <span className="astrum-menu-item__text">{children}</span>
        {endIcon != null && (
          <span className="astrum-menu-item__end-icon" aria-hidden>
            {endIcon}
          </span>
        )}
      </button>
    );
  }
);

MenuItem.displayName = "MenuItem";
