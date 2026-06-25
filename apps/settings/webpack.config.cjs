const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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

const PORT = 3003;

/** @returns {import('webpack').Configuration & { devServer?: object }} */
module.exports = (_env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: "./src/index.ts",
    mode: isProd ? "production" : "development",
    devtool: isProd ? "source-map" : "eval-source-map",
    output: {
      // "auto" lets the remote resolve its own asset URLs when loaded by a host.
      publicPath: "auto",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      // Content-hashed filenames bust browser/CDN/proxy caches on every deploy.
      // remoteEntry.js keeps a stable name (set on ModuleFederationPlugin) so
      // the host can always find it.
      filename: isProd ? "[name].[contenthash].js" : "[name].js",
      chunkFilename: isProd ? "[name].[contenthash].js" : "[name].js"
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
      historyApiFallback: true,
      headers: { "Access-Control-Allow-Origin": "*" }
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "settings",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App.tsx"
        },
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
      new HtmlWebpackPlugin({ template: "./public/index.html" })
    ]
  };
};
