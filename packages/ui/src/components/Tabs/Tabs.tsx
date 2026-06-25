import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./Tabs.css";

export interface TabItem {
  id: string;
  label: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ items, activeId, onChange, className }: TabsProps) {
  return (
    <div role="tablist" className={cx("fpk-tabs", className)}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={cx("fpk-tab", active && "fpk-tab--active")}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
