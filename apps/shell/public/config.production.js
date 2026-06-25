// Production runtime config. The deploy workflow copies this over config.js in
// the shell's build output, so the SAME shell artifact targets production
// remotes without a rebuild. Update these URLs if your Cloudflare Pages project
// names differ (pages.dev subdomains are globally unique).
window.__FPK_CONFIG__ = {
  environment: "production",
  remotes: {
    dashboard: "https://fpk-dashboard.pages.dev/remoteEntry.js",
    analytics: "https://fpk-analytics.pages.dev/remoteEntry.js",
    settings: "https://fpk-settings.pages.dev/remoteEntry.js"
  }
};
