import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge, Button, Card, Input, Spinner, Stack } from "@fpk/ui";
import { fetchProfile, saveProfile, type Profile as ProfileData } from "../api/settings";

export function Profile() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["settings", "profile"],
    queryFn: fetchProfile
  });

  const [form, setForm] = useState<ProfileData>({
    workspaceName: "",
    billingEmail: ""
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: saveProfile,
    onSuccess: (saved) => {
      queryClient.setQueryData(["settings", "profile"], saved);
    }
  });

  if (isLoading) {
    return (
      <Stack align="center" style={{ padding: 32 }}>
        <Spinner size={28} />
      </Stack>
    );
  }

  return (
    <Card title="Workspace">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate(form);
        }}
      >
        <Stack gap={4}>
          <Input
            label="Workspace name"
            value={form.workspaceName}
            onChange={(e) =>
              setForm((f) => ({ ...f, workspaceName: e.target.value }))
            }
          />
          <Input
            label="Billing email"
            type="email"
            placeholder="billing@example.com"
            value={form.billingEmail}
            onChange={(e) =>
              setForm((f) => ({ ...f, billingEmail: e.target.value }))
            }
            hint="Invoices are sent here monthly."
          />
          <Stack direction="row" gap={3} align="center">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving…" : "Save changes"}
            </Button>
            {mutation.isSuccess && !mutation.isPending && (
              <Badge tone="success">Saved</Badge>
            )}
          </Stack>
        </Stack>
      </form>
    </Card>
  );
}
