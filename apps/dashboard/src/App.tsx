import { NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Badge, Stack } from "@fpk/ui";
import { Overview } from "./features/Overview";
import { Reports } from "./features/Reports";

interface AppProps {
  // Where the shell mounts this remote (e.g. "/dashboard"). Empty when the
  // remote runs standalone. Used to build absolute, stack-proof tab links.
  basename?: string;
}

const tabClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "fpk-tab fpk-tab--active" : "fpk-tab";

function DashboardLayout({ basename }: { basename: string }) {
  return (
    <Stack gap={5} style={{ padding: 24, maxWidth: 860 }}>
      <Stack direction="row" gap={2} align="center">
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <Badge tone="info">remote</Badge>
      </Stack>

      <div className="fpk-tabs" role="tablist">
        <NavLink to={`${basename}/overview`} className={tabClass}>
          Overview
        </NavLink>
        <NavLink to={`${basename}/reports`} className={tabClass}>
          Reports
        </NavLink>
      </div>

      <Outlet />
    </Stack>
  );
}

export default function App({ basename = "" }: AppProps) {
  return (
    <Routes>
      <Route element={<DashboardLayout basename={basename} />}>
        <Route index element={<Navigate to={`${basename}/overview`} replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}
