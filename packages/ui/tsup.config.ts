import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // React is provided by the host app (and shared as a singleton via Module
  // Federation later) — never bundle it into the library.
  external: ["react", "react-dom", "react/jsx-runtime"],
  esbuildOptions(options) {
    options.jsx = "automatic";
  }
});
