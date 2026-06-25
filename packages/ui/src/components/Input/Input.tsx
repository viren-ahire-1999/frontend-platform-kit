import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { cx } from "../../utils/cx";
import "./Input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Input({ label, hint, error, className, id, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className="fpk-field">
      {label && (
        <label htmlFor={inputId} className="fpk-field__label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cx("fpk-input", error && "fpk-input--error", className)}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {error ? (
        <span className="fpk-field__error">{error}</span>
      ) : hint ? (
        <span className="fpk-field__hint">{hint}</span>
      ) : null}
    </div>
  );
}
