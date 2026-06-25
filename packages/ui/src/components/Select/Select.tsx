import type { SelectHTMLAttributes } from "react";
import { useId } from "react";
import { cx } from "../../utils/cx";
import "./Select.css";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  options: SelectOption[];
}

export function Select({
  label,
  options,
  className,
  id,
  ...rest
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className="fpk-field">
      {label && (
        <label htmlFor={selectId} className="fpk-field__label">
          {label}
        </label>
      )}
      <select id={selectId} className={cx("fpk-select", className)} {...rest}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
