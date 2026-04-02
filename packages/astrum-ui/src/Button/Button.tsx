import * as React from "react";

type SharedButtonProps = {
  variant?: "primary" | "outlined" | "dashed" | "grey" | "white" | "ghost";
  size?: "s" | "m" | "l";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  shape?: "default" | "square" | "circle";
  children?: React.ReactNode;
  className?: string;
};

export type ButtonProps =
  | (SharedButtonProps & {
      href?: undefined;
      as?: undefined;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | (SharedButtonProps & {
      href: string;
      as?: React.ElementType;
      /** Для ссылки: `aria-disabled` и блокировка перехода */
      disabled?: boolean;
    } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedButtonProps | "disabled">);

const variantStyles: Record<NonNullable<SharedButtonProps["variant"]>, string> = {
  primary: "astrum-btn-primary",
  outlined: "astrum-btn-outlined",
  dashed: "astrum-btn-dashed",
  grey: "astrum-btn-grey",
  white: "astrum-btn-white",
  ghost: "astrum-btn-ghost",
};

const sizeStyles: Record<NonNullable<SharedButtonProps["size"]>, string> = {
  s: "astrum-btn-s",
  m: "astrum-btn-m",
  l: "astrum-btn-l",
};

const shapeStyles: Record<NonNullable<SharedButtonProps["shape"]>, string> = {
  default: "",
  square: "astrum-btn-shape-square",
  circle: "astrum-btn-shape-circle",
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = "primary",
      size = "l",
      icon,
      iconPosition = "right",
      shape = "default",
      className = "",
      children,
      href,
      as,
      ...rest
    } = props;

    const isLink = typeof href === "string" && href.length > 0;
    const iconOnly = icon != null && (children == null || children === "");
    const effectiveShape = iconOnly && shape !== "default" ? shape : "default";
    const classes = [
      "astrum-btn",
      variantStyles[variant],
      sizeStyles[size],
      shapeStyles[effectiveShape],
      iconOnly ? "astrum-btn-icon-only" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const content = (
      <>
        {icon && iconPosition === "left" && <span className="astrum-btn-icon">{icon}</span>}
        {children != null && children !== "" && <span className="astrum-btn-text">{children}</span>}
        {icon && iconPosition === "right" && <span className="astrum-btn-icon">{icon}</span>}
      </>
    );

    if (isLink) {
      const Component = (as ?? "a") as React.ElementType;
      const {
        disabled: anchorDisabled,
        onClick,
        onKeyDown,
        ...anchorRest
      } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean };

      const disabled = Boolean(anchorDisabled);
      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      };

      const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
        }
        onKeyDown?.(e);
      };

      return (
        <Component
          ref={ref}
          {...anchorRest}
          href={href}
          className={classes}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : anchorRest.tabIndex}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          {content}
        </Component>
      );
    }

    const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} type="button" {...buttonRest}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
