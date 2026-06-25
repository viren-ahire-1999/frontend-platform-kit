import { useQuery } from "@tanstack/react-query";
import { Badge, Card, Spinner, Stack, Table, type Column } from "@fpk/ui";
import { formatDate } from "@fpk/utils";
import { fetchMembers, type Member } from "../api/settings";

const ROLE_TONE = {
  Owner: "info",
  Admin: "success",
  Member: "neutral"
} as const;

const columns: Column<Member>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  {
    key: "role",
    header: "Role",
    render: (m) => <Badge tone={ROLE_TONE[m.role]}>{m.role}</Badge>
  },
  { key: "joinedAt", header: "Joined", render: (m) => formatDate(m.joinedAt) }
];

export function Members() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["settings", "members"],
    queryFn: fetchMembers
  });

  if (isError) {
    return <Card title="Members">Failed to load members. Try again.</Card>;
  }

  if (isLoading) {
    return (
      <Stack align="center" style={{ padding: 32 }}>
        <Spinner size={28} />
      </Stack>
    );
  }

  return (
    <Table<Member> columns={columns} data={data ?? []} getRowKey={(m) => m.id} />
  );
}
