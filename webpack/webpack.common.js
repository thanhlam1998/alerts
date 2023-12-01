const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackInjectPreload = require("@principalstudio/html-webpack-inject-preload");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

switch (process.env.ENVIRONMENT) {
  case "development":
    require("dotenv").config({ path: "./dev.env" });
    break;
  case "stage":
    require("dotenv").config({ path: "./stage.env" });
    break;
  case "production":
    require("dotenv").config({ path: "./.env" });
    break;
  default:
    require("dotenv").config({ path: "./dev.env" });
}

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    plugins: [new TsconfigPathsPlugin({})],
    extensions: [
      ".js",
      ".ts",
      ".tsx",
      ".css",
      "png",
      ".jsx",
      ".json",
      ".scss",
      ".svg",
    ],
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "assets/scripts/[name].js",
    chunkFilename: "assets/scripts/[hash].chunk.js",
    publicPath: "/",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        antv: {
          test: /[\\/]node_modules[\\/](antd|lodash|moment|react-dom|@antv)[\\/]/,
          name: "antd",
          chunks: "all",
        },
        nodeModule: {
          test: /[\\/]node_modules[\\/]/,
          name: "node_modules",
          chunks: "all",
        },
      },
    },
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "tsx",
              target: "es2015",
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)(\?[a-z0-9=.]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name() {
                return "./assets/images/[name]_[hash].[ext]";
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/webfonts/[name].[ext]", // Save font in folder 'assets/webfonts'
        },
      },
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./src/assets/images/favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[contenthash:8].css",
    }),

    new HtmlWebpackInjectPreload({
      files: [
        {
          match: /(logo)+.+(.svg)$/,
          attributes: { as: "image" },
        },
      ],
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|vi/),
  ],
};