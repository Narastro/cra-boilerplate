const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BASE_PATH = "./src/";
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: {
    index: BASE_PATH + "index.js",
  },

  devtool: isDev ? "eval-cheap-source-map" : "inline-source-map",

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({ filename: "app.css" }),
  ],

  resolve: {
    extensions: [".js", ".jsx"],
  },

  devServer: {
    port: 3000,
    devMiddleware: {
      writeToDisk: true,
    },
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpeg|jpg|png)$/,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },
};
