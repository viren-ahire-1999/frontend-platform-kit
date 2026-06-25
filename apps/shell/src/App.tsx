import { lazy, Suspense, type ComponentType, type ReactNode } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { config, type RemoteName } from "./config";
import { loadRemoteModule } from "./loadRemote";
import { RemoteErrorBoundary } from "./RemoteErrorBoundary";
import "./shell.css";

type RemoteModule = { default: ComponentType<{ basename?: string }> };

// Remotes are resolved at runtime from config.remotes, so the shell build is
// environment-agnostic — swap config.js to point at any deployment.
const remote = (name: RemoteName) =>
  lazy(() =>
    loadRemoteModule<RemoteModule>(name, config.remotes[name], "./App")
  );

const Dashboard = remote("dashboard");
const Analytics = remote("analytics");
const Settings = remote("settings");

const NAV = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/analytics", label: "Analytics" },
  { to: "/settings", label: "Settings" }
];

function Remote({ name, element }: { name: RemoteName; element: ReactNode }) {
  return (
    <RemoteErrorBoundary name={name}>
      <Suspense fallback={<div className="shell__loading">Loading…</div>}>
        {element}
      </Suspense>
    </RemoteErrorBoundary>
  );
}

export default function App() {
  return (
    <div className="shell">
      <aside className="shell__sidebar">
        <div className="shell__brand">FPK</div>
        <nav className="shell__nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "shell__link shell__link--active" : "shell__link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="shell__main">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard/*"
            element={
              <Remote name="dashboard" element={<Dashboard basename="/dashboard" />} />
            }
          />
          <Route
            path="/analytics/*"
            element={
              <Remote name="analytics" element={<Analytics basename="/analytics" />} />
            }
          />
          <Route
            path="/settings/*"
            element={
              <Remote name="settings" element={<Settings basename="/settings" />} />
            }
          />
          <Route
            path="*"
            element={<div className="shell__loading">Not found</div>}
          />
        </Routes>
      </main>
    </div>
  );
}
