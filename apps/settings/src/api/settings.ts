import { delay } from "@fpk/utils";

export interface Profile {
  workspaceName: string;
  billingEmail: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
  joinedAt: string;
}

// In-memory store so saves persist for the session (simulates a backend).
let profileStore: Profile = {
  workspaceName: "Acme Inc.",
  billingEmail: ""
};

export async function fetchProfile(): Promise<Profile> {
  await delay(400);
  return { ...profileStore };
}

export async function saveProfile(next: Profile): Promise<Profile> {
  await delay(800);
  profileStore = { ...next };
  return { ...profileStore };
}

export async function fetchMembers(): Promise<Member[]> {
  await delay(700);
  return [
    { id: "u1", name: "Ada Lovelace", email: "ada@acme.io", role: "Owner", joinedAt: "2025-01-12" },
    { id: "u2", name: "Alan Turing", email: "alan@acme.io", role: "Admin", joinedAt: "2025-03-04" },
    { id: "u3", name: "Grace Hopper", email: "grace@acme.io", role: "Member", joinedAt: "2025-07-21" },
    { id: "u4", name: "Katherine Johnson", email: "katherine@acme.io", role: "Member", joinedAt: "2026-02-15" }
  ];
}
