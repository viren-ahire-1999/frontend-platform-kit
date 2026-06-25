import { NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Badge, Stack } from "@fpk/ui";
import { Profile } from "./features/Profile";
import { Members } from "./features/Members";

interface AppProps {
  // Where the shell mounts this remote (e.g. "/settings"). Empty when the
  // remote runs standalone. Used to build absolute, stack-proof tab links.
  basename?: string;
}

const tabClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "fpk-tab fpk-tab--active" : "fpk-tab";

function SettingsLayout({ basename }: { basename: string }) {
  return (
    <Stack gap={5} style={{ padding: 24, maxWidth: 720 }}>
      <Stack direction="row" gap={2} align="center">
        <h2 style={{ margin: 0 }}>Settings</h2>
        <Badge tone="info">remote</Badge>
      </Stack>

      <div className="fpk-tabs" role="tablist">
        <NavLink to={`${basename}/profile`} className={tabClass}>
          Profile
        </NavLink>
        <NavLink to={`${basename}/members`} className={tabClass}>
          Members
        </NavLink>
      </div>

      <Outlet />
    </Stack>
  );
}

export default function App({ basename = "" }: AppProps) {
  return (
    <Routes>
      <Route element={<SettingsLayout basename={basename} />}>
        <Route index element={<Navigate to={`${basename}/profile`} replace />} />
        <Route path="profile" element={<Profile />} />
        <Route path="members" element={<Members />} />
      </Route>
    </Routes>
  );
}
