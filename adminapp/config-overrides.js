const { override, addWebpackPlugin } = require("customize-cra");
const webpack = require("webpack");

module.exports = override((config) => {
  config.ignoreWarnings = [
    {
      module: /@antv/,
      message: /Failed to parse source map/,
    },
  ];
  return config;
});
