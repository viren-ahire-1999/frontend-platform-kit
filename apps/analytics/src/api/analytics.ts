import { delay } from "@fpk/utils";

export type RangeKey = "7d" | "30d" | "90d";

export interface SeriesPoint {
  label: string;
  value: number;
}

const POINTS_BY_RANGE: Record<RangeKey, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90
};

export async function fetchSessions(range: RangeKey): Promise<SeriesPoint[]> {
  await delay(600);
  const count = POINTS_BY_RANGE[range];
  return Array.from({ length: count }, (_, i) => ({
    label: String(i + 1),
    value: Math.round(620 + 280 * Math.sin(i / 3.2) + ((i * 37) % 160))
  }));
}
