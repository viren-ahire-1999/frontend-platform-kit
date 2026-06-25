import type { CSSProperties, HTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import "./Skeleton.css";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  radius?: CSSProperties["borderRadius"];
}

export function Skeleton({
  width = "100%",
  height = 16,
  radius = "var(--fpk-radius-sm)",
  className,
  style,
  ...rest
}: SkeletonProps) {
  return (
    <div
      className={cx("fpk-skeleton", className)}
      style={{ width, height, borderRadius: radius, ...style }}
      {...rest}
    />
  );
}
