export type ClassValue = string | number | false | null | undefined;

/** Minimal classnames helper — joins truthy values with a space. */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
