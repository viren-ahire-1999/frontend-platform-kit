import { useQuery } from "@tanstack/react-query";
import { Badge, Card, Skeleton, Stack } from "@fpk/ui";
import { formatCurrency, formatNumber, formatPercent } from "@fpk/utils";
import { fetchMetrics } from "../api/dashboard";

export function Overview() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard", "metrics"],
    queryFn: fetchMetrics
  });

  if (isError) {
    return <Card title="Overview">Failed to load metrics. Try again.</Card>;
  }

  return (
    <Stack direction="row" gap={4} wrap>
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} style={{ width: 220 }}>
              <Stack gap={3}>
                <Skeleton width={110} />
                <Skeleton width={140} height={28} />
                <Skeleton width={90} />
              </Stack>
            </Card>
          ))
        : (data ?? []).map((m) => (
            <Card key={m.id} title={m.label} style={{ width: 220 }}>
              <Stack gap={2}>
                <strong style={{ fontSize: 28 }}>
                  {m.format === "currency"
                    ? formatCurrency(m.value)
                    : formatNumber(m.value)}
                </strong>
                <div>
                  <Badge tone={m.deltaPct >= 0 ? "success" : "danger"}>
                    {m.deltaPct >= 0 ? "+" : ""}
                    {formatPercent(m.deltaPct)}
                  </Badge>{" "}
                  vs last week
                </div>
              </Stack>
            </Card>
          ))}
    </Stack>
  );
}
