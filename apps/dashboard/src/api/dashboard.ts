import { delay } from "@fpk/utils";

export interface Metric {
  id: string;
  label: string;
  value: number;
  format: "number" | "currency";
  deltaPct: number;
}

export interface ReportRow {
  id: string;
  campaign: string;
  status: "active" | "paused" | "ended";
  sessions: number;
  revenue: number;
  updatedAt: string;
}

export async function fetchMetrics(): Promise<Metric[]> {
  await delay(700);
  return [
    { id: "users", label: "Active users", value: 12480, format: "number", deltaPct: 0.082 },
    { id: "revenue", label: "Revenue", value: 48200, format: "currency", deltaPct: 0.031 },
    { id: "aov", label: "Avg order value", value: 86, format: "currency", deltaPct: -0.012 },
    { id: "errors", label: "Errors", value: 23, format: "number", deltaPct: 0.12 }
  ];
}

export async function fetchReports(): Promise<ReportRow[]> {
  await delay(900);
  return [
    { id: "c1", campaign: "Spring launch", status: "active", sessions: 18230, revenue: 24100, updatedAt: "2026-06-18" },
    { id: "c2", campaign: "Referral program", status: "active", sessions: 9410, revenue: 12800, updatedAt: "2026-06-20" },
    { id: "c3", campaign: "Winter clearance", status: "ended", sessions: 30120, revenue: 41020, updatedAt: "2026-02-02" },
    { id: "c4", campaign: "Newsletter Q2", status: "paused", sessions: 4220, revenue: 3100, updatedAt: "2026-05-29" }
  ];
}
