import path from 'path';
import { Configuration } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/** 共通設定 */
import base from './webpack.base';

// レンダラープロセス用の設定
const renderer: Configuration = {
  ...base,
  // セキュリティ対策として 'electron-renderer' ターゲットは使用しない
  target: 'web',
  entry: {
    renderer: './src/renderer/renderer.tsx',
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    publicPath: '/',
  },
  plugins: [
    /**
     * バンドルしたJSファイルを <script></script> タグとして差し込んだ
     * HTMLファイルを出力するプラグイン
     */
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html',
      minify: true,
      inject: 'body',
      filename: 'index.html',
      scriptLoading: 'blocking',
    }),
    new MiniCssExtractPlugin(),
  ],
};
export default renderer;
