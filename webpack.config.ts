import path from 'path';

/** エディタで補完を効かせるために型定義をインポート */
import { Configuration } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import { isDev } from './src/lib/Compile';

/** 共通設定 */
import base from './.config/webpack.base';

const copy = new CopyPlugin({
  patterns: [{ from: 'src/images', to: './images' }],
});

// メインプロセス用の設定
const main: Configuration = {
  // 共通設定の読み込み
  ...base,
  target: 'electron-main',
  entry: {
    main: './src/main/main.ts',
  },
  output: {
    ...base.output,
    path: path.resolve(__dirname, 'dist/main'),
  },
  plugins: [copy],
};

// プリロード・スクリプト用の設定
const preload: Configuration = {
  ...base,
  target: 'electron-preload',
  entry: {
    preload: './src/main/preload.ts',
  },
  output: {
    ...base.output,
    path: path.resolve(__dirname, 'dist/main'),
  },
};

// レンダラープロセス用の設定
const mainView: Configuration = {
  ...base,
  // セキュリティ対策として 'electron-renderer' ターゲットは使用しない
  target: 'web',
  entry: {
    mainView: './src/renderer/mainView/index.tsx',
  },
  output: {
    ...base.output,
    path: path.resolve(__dirname, 'dist/renderer/mainView'),
  },
  plugins: [
    /**
     * バンドルしたJSファイルを <script></script> タグとして差し込んだ
     * HTMLファイルを出力するプラグイン
     */
    new HtmlWebpackPlugin({
      template: './src/renderer/mainView/index.html',
      minify: !isDev,
      inject: 'body',
      filename: 'index.html',
      scriptLoading: 'blocking',
    }),
    new MiniCssExtractPlugin(),
  ],
};

const settingView: Configuration = {
  ...base,
  // セキュリティ対策として 'electron-renderer' ターゲットは使用しない
  target: 'web',
  entry: {
    settingView: './src/renderer/settingView/index.tsx',
  },
  output: {
    ...base.output,
    path: path.resolve(__dirname, 'dist/renderer/settingView'),
  },
  plugins: [
    /**
     * バンドルしたJSファイルを <script></script> タグとして差し込んだ
     * HTMLファイルを出力するプラグイン
     */
    new HtmlWebpackPlugin({
      template: './src/renderer/settingView/index.html',
      minify: !isDev,
      inject: 'body',
      filename: 'index.html',
      scriptLoading: 'blocking',
    }),
    new MiniCssExtractPlugin(),
  ],
};

const exportArray = isDev
  ? [main, preload]
  : [main, preload, mainView, settingView];

/**
 * メイン，プリロード，レンダラーそれぞれの設定を
 * 配列に入れてエクスポート
 */
export default exportArray;
