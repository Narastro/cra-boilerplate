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
    hot: true, // webpack의 HMR기능(모듈들을 페이지 리로드 없이 교체하는 기능)
    historyApiFallback: true, // 히스토리 API를 사용하는 SPA 개발 시, 404에러가 발생하면 index.html로 리다이렉트 한다.
    open: true, // 개발 서버 자동 실행
    devMiddleware: {
      writeToDisk: true, // dist 디렉토리에 실제 파일 생성
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
