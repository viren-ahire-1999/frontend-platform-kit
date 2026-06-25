/**
 * @fpk/ui — shared design system.
 *
 * Consumers import components from "@fpk/ui" and load the bundled stylesheet
 * once via "@fpk/ui/styles.css" (which includes the design tokens).
 */
import "./styles/tokens.css";

export { Button } from "./components/Button/Button";
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize
} from "./components/Button/Button";

export { Card } from "./components/Card/Card";
export type { CardProps } from "./components/Card/Card";

export { Stack } from "./components/Stack/Stack";
export type { StackProps } from "./components/Stack/Stack";

export { Badge } from "./components/Badge/Badge";
export type { BadgeProps, BadgeTone } from "./components/Badge/Badge";

export { Input } from "./components/Input/Input";
export type { InputProps } from "./components/Input/Input";

export { Spinner } from "./components/Spinner/Spinner";
export type { SpinnerProps } from "./components/Spinner/Spinner";

export { Skeleton } from "./components/Skeleton/Skeleton";
export type { SkeletonProps } from "./components/Skeleton/Skeleton";

export { Table } from "./components/Table/Table";
export type { TableProps, Column } from "./components/Table/Table";

export { Tabs } from "./components/Tabs/Tabs";
export type { TabsProps, TabItem } from "./components/Tabs/Tabs";

export { Select } from "./components/Select/Select";
export type { SelectProps, SelectOption } from "./components/Select/Select";

export { tokens } from "./tokens";
export type { SpaceStep } from "./tokens";

export { cx } from "./utils/cx";
export type { ClassValue } from "./utils/cx";

export const UI_LIBRARY_VERSION = "0.0.0";
