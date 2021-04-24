import path from 'path';

/** エディタで補完を効かせるために型定義をインポート */
import { Configuration } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const isDev = process.env.NODE_ENV === 'development';

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
  plugins: [copy],
};

// プリロード・スクリプト用の設定
const preload: Configuration = {
  ...base,
  target: 'electron-preload',
  entry: {
    preload: './src/main/preload.ts',
  },
};

// レンダラープロセス用の設定
const renderer: Configuration = {
  ...base,
  // セキュリティ対策として 'electron-renderer' ターゲットは使用しない
  target: 'web',
  entry: {
    renderer: './src/renderer/renderer.tsx',
  },
  plugins: [
    /**
     * バンドルしたJSファイルを <script></script> タグとして差し込んだ
     * HTMLファイルを出力するプラグイン
     */
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html',
      minify: !isDev,
      inject: 'body',
      filename: 'index.html',
      scriptLoading: 'blocking',
    }),
    new MiniCssExtractPlugin(),
  ],
};

/**
 * メイン，プリロード，レンダラーそれぞれの設定を
 * 配列に入れてエクスポート
 */
export default [main, preload, renderer];
