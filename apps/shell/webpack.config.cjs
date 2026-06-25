const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// Resolve webpack from webpack-cli's location so the config and the compiler
// share ONE webpack instance (pnpm can create multiple peer-specialized copies,
// which breaks Module Federation's `compilation instanceof Compilation` check).
const webpack = require(
  require.resolve("webpack", {
    paths: [path.dirname(require.resolve("webpack-cli/package.json"))]
  })
);
const { ModuleFederationPlugin } = webpack.container;
const { dependencies } = require("./package.json");

const PORT = 3000;

/** @returns {import('webpack').Configuration & { devServer?: object }} */
module.exports = (_env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: "./src/index.ts",
    mode: isProd ? "production" : "development",
    devtool: isProd ? "source-map" : "eval-source-map",
    output: {
      // The host serves assets from the domain root so deep links like
      // /dashboard/reports still resolve main.js and chunks correctly.
      publicPath: "/",
      path: path.resolve(__dirname, "dist"),
      clean: true
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: { transpileOnly: true, compilerOptions: { noEmit: false } }
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    devServer: {
      port: PORT,
      historyApiFallback: true
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "shell",
        // No static `remotes`: the shell resolves remote URLs at runtime from
        // config.js via src/loadRemote.ts, so this build is environment-agnostic.
        shared: {
          react: { singleton: true, requiredVersion: dependencies.react },
          "react-dom": {
            singleton: true,
            requiredVersion: dependencies["react-dom"]
          },
          "react-router-dom": {
            singleton: true,
            requiredVersion: dependencies["react-router-dom"]
          },
          "@tanstack/react-query": {
            singleton: true,
            requiredVersion: dependencies["@tanstack/react-query"]
          },
          "@fpk/ui": { singleton: true, requiredVersion: false }
        }
      }),
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      // Emit the runtime config as a static asset (not bundled) so it can be
      // overwritten per environment without rebuilding the shell.
      new CopyWebpackPlugin({
        patterns: [{ from: "public/config.js", to: "config.js" }]
      })
    ]
  };
};
