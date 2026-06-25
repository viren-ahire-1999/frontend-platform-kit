import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        "fpk-btn",
        `fpk-btn--${variant}`,
        `fpk-btn--${size}`,
        fullWidth && "fpk-btn--full",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
