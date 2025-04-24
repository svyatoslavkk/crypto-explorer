const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript").default;
const isDevelopment = process.env.NODE_ENV !== "production";
require("dotenv").config();

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    clean: true,
    publicPath: "/",
  },
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "source-map" : false,
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, "public"),
    hot: true,
    port: 3000,
    open: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [isDevelopment && require.resolve("react-refresh/babel")].filter(Boolean),
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [isDevelopment && ReactRefreshTypeScript()].filter(Boolean),
              }),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(mp3)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.COIN_GECKO_API_URL": JSON.stringify(process.env.COIN_GECKO_API_URL),
      "process.env.ETHERSCAN_API_URL": JSON.stringify(process.env.ETHERSCAN_API_URL),
      "process.env.ETHERSCAN_API_KEY": JSON.stringify(process.env.ETHERSCAN_API_KEY),
      "process.env.BITQUERY_API_URL": JSON.stringify(process.env.BITQUERY_API_URL),
      "process.env.BITQUERY_API_KEY": JSON.stringify(process.env.BITQUERY_API_KEY),
      "process.env.STREAM_BITQUERY_API_KEY": JSON.stringify(process.env.STREAM_BITQUERY_API_KEY),
      "process.env.INFURA_API_KEY": JSON.stringify(process.env.INFURA_API_KEY),
    }),
  ].filter(Boolean),
};
