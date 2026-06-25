import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import "./Spinner.css";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number;
  label?: string;
}

export function Spinner({
  size = 20,
  label = "Loading",
  className,
  style,
  ...rest
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cx("fpk-spinner", className)}
      style={{ width: size, height: size, ...style }}
      {...rest}
    />
  );
}
