const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const smp = new SpeedMeasurePlugin();

const enableBundleAnalyzer = process.env.ENABLE_ANALYZER === "true";

const config = merge(common, {
  mode: "production",
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: enableBundleAnalyzer ? "static" : "disabled",
    }),
  ],
});

module.exports = enableBundleAnalyzer ? smp.wrap(config) : config;
