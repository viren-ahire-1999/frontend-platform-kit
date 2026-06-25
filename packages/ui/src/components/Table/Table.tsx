import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./Table.css";

export interface Column<T> {
  key: keyof T & string;
  header: ReactNode;
  align?: "left" | "right" | "center";
  render?: (row: T) => ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowKey: (row: T) => string;
  emptyMessage?: ReactNode;
  className?: string;
}

export function Table<T>({
  columns,
  data,
  getRowKey,
  emptyMessage = "No data",
  className
}: TableProps<T>) {
  return (
    <div className={cx("fpk-table-wrap", className)}>
      <table className="fpk-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ textAlign: col.align ?? "left" }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="fpk-table__empty" colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={getRowKey(row)}>
                {columns.map((col) => (
                  <td key={col.key} style={{ textAlign: col.align ?? "left" }}>
                    {col.render ? col.render(row) : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
