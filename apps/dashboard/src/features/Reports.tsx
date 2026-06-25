import { useQuery } from "@tanstack/react-query";
import { Badge, Card, Spinner, Stack, Table, type Column } from "@fpk/ui";
import { formatCurrency, formatDate, formatNumber } from "@fpk/utils";
import { fetchReports, type ReportRow } from "../api/dashboard";

const STATUS_TONE = {
  active: "success",
  paused: "warning",
  ended: "neutral"
} as const;

const columns: Column<ReportRow>[] = [
  { key: "campaign", header: "Campaign" },
  {
    key: "status",
    header: "Status",
    render: (row) => <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge>
  },
  {
    key: "sessions",
    header: "Sessions",
    align: "right",
    render: (row) => formatNumber(row.sessions)
  },
  {
    key: "revenue",
    header: "Revenue",
    align: "right",
    render: (row) => formatCurrency(row.revenue)
  },
  {
    key: "updatedAt",
    header: "Updated",
    render: (row) => formatDate(row.updatedAt)
  }
];

export function Reports() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard", "reports"],
    queryFn: fetchReports
  });

  if (isError) {
    return <Card title="Reports">Failed to load reports. Try again.</Card>;
  }

  if (isLoading) {
    return (
      <Stack align="center" style={{ padding: 32 }}>
        <Spinner size={28} />
      </Stack>
    );
  }

  return (
    <Table<ReportRow>
      columns={columns}
      data={data ?? []}
      getRowKey={(row) => row.id}
    />
  );
}
