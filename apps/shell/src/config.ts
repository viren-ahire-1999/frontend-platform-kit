export type RemoteName = "dashboard" | "analytics" | "settings";

export interface FpkConfig {
  environment: string;
  remotes: Record<RemoteName, string>;
}

declare global {
  interface Window {
    __FPK_CONFIG__?: Partial<FpkConfig>;
  }
}

// Fallback so the shell still boots in local dev even if config.js is missing
// (e.g. opened without the static asset). Production always ships config.js.
const FALLBACK: FpkConfig = {
  environment: "development",
  remotes: {
    dashboard: "http://localhost:3001/remoteEntry.js",
    analytics: "http://localhost:3002/remoteEntry.js",
    settings: "http://localhost:3003/remoteEntry.js"
  }
};

const injected = window.__FPK_CONFIG__;

export const config: FpkConfig = {
  environment: injected?.environment ?? FALLBACK.environment,
  remotes: { ...FALLBACK.remotes, ...(injected?.remotes ?? {}) }
};
