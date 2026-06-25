import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./Card.css";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export function Card({ title, footer, className, children, ...rest }: CardProps) {
  return (
    <div className={cx("fpk-card", className)} {...rest}>
      {title != null && <div className="fpk-card__header">{title}</div>}
      <div className="fpk-card__body">{children}</div>
      {footer != null && <div className="fpk-card__footer">{footer}</div>}
    </div>
  );
}
