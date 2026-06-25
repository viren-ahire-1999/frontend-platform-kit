import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./Badge.css";

export type BadgeTone = "neutral" | "success" | "danger" | "warning" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  children?: ReactNode;
}

export function Badge({ tone = "neutral", className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx("fpk-badge", `fpk-badge--${tone}`, className)} {...rest}>
      {children}
    </span>
  );
}
