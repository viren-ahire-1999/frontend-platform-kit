import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge, Card, Select, Spinner, Stack } from "@fpk/ui";
import { formatNumber } from "@fpk/utils";
import { fetchSessions, type RangeKey } from "./api/analytics";
import { LineChart } from "./components/LineChart";

const RANGES = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" }
];

export default function App() {
  const [range, setRange] = useState<RangeKey>("30d");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["analytics", "sessions", range],
    queryFn: () => fetchSessions(range)
  });

  const total = data?.reduce((sum, p) => sum + p.value, 0) ?? 0;
  const peak = data?.reduce((m, p) => Math.max(m, p.value), 0) ?? 0;

  return (
    <Stack gap={5} style={{ padding: 24, maxWidth: 880 }}>
      <Stack direction="row" gap={2} align="center">
        <h2 style={{ margin: 0 }}>Analytics</h2>
        <Badge tone="info">remote</Badge>
      </Stack>

      <Stack direction="row" gap={4} align="flex-end" wrap>
        <Select
          label="Range"
          options={RANGES}
          value={range}
          onChange={(e) => setRange(e.target.value as RangeKey)}
        />
        <Card title="Total sessions" style={{ minWidth: 160 }}>
          <strong style={{ fontSize: 24 }}>{formatNumber(total)}</strong>
        </Card>
        <Card title="Peak day" style={{ minWidth: 160 }}>
          <strong style={{ fontSize: 24 }}>{formatNumber(peak)}</strong>
        </Card>
      </Stack>

      <Card title="Sessions over time">
        {isError ? (
          "Failed to load chart data."
        ) : isLoading ? (
          <Stack align="center" style={{ padding: 32 }}>
            <Spinner size={28} />
          </Stack>
        ) : (
          <LineChart data={(data ?? []).map((p) => p.value)} />
        )}
      </Card>
    </Stack>
  );
}
