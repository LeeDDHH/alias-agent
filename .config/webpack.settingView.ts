import path from 'path';
import { Configuration } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/** 共通設定 */
import base from './webpack.base';

// レンダラープロセス用の設定
const settingView: Configuration = {
  ...base,
  // セキュリティ対策として 'electron-renderer' ターゲットは使用しない
  target: 'web',
  entry: {
    settingView: './src/renderer/settingView/index.tsx',
  },
  output: {
    ...base.output,
    // バンドルファイルの出力先（ここではプロジェクト直下の 'dist' ディレクトリ）
    path: path.resolve(__dirname, '../dist/renderer/settingView'),
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist/renderer/settingView'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4001,
    publicPath: '/',
  },
  plugins: [
    /**
     * バンドルしたJSファイルを <script></script> タグとして差し込んだ
     * HTMLファイルを出力するプラグイン
     */
    new HtmlWebpackPlugin({
      template: './src/renderer/settingView/index.html',
      minify: true,
      inject: 'body',
      filename: 'index.html',
      scriptLoading: 'blocking',
    }),
    new MiniCssExtractPlugin(),
  ],
};

export default settingView;
