import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outlined" | "dashed" | "grey" | "white" | "ghost";
  size?: "s" | "m" | "l";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  shape?: "default" | "square" | "circle";
  children?: React.ReactNode;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "astrum-btn-primary",
  outlined: "astrum-btn-outlined",
  dashed: "astrum-btn-dashed",
  grey: "astrum-btn-grey",
  white: "astrum-btn-white",
  ghost: "astrum-btn-ghost",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  s: "astrum-btn-s",
  m: "astrum-btn-m",
  l: "astrum-btn-l",
};

const shapeStyles: Record<NonNullable<ButtonProps["shape"]>, string> = {
  default: "",
  square: "astrum-btn-shape-square",
  circle: "astrum-btn-shape-circle",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "m",
      icon,
      iconPosition = "right",
      shape = "default",
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
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
    return (
      <button ref={ref} className={classes} type="button" {...rest}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
