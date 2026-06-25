import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { SpaceStep } from "../../tokens";
import { cx } from "../../utils/cx";
import "./Stack.css";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  gap?: SpaceStep | 0;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  wrap?: boolean;
  children?: ReactNode;
}

export function Stack({
  direction = "column",
  gap = 4,
  align,
  justify,
  wrap = false,
  className,
  style,
  children,
  ...rest
}: StackProps) {
  return (
    <div
      className={cx("fpk-stack", className)}
      style={{
        flexDirection: direction,
        gap: `var(--fpk-space-${gap}, 0)`,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? "wrap" : "nowrap",
        ...style
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
