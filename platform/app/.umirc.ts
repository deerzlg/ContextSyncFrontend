import { defineConfig } from '@umijs/max';
import path from 'path';

export default defineConfig({
  // 配置别名，对 import 语句的 source 做映射，实现HMR
  alias: {
    '@webviewer/extension-cornerstone': path.resolve(
      __dirname,
      '../../extensions/cornerstone/src',
    ),
    '@webviewer/extension-default': path.resolve(
      __dirname,
      '../../extensions/default/src',
    ),
    '@webviewer/core': path.resolve(__dirname, '../../platform/core/src'),
  },

  base: '/WebViewer/',
  outputPath: '../../dist/WebViewer', // 打包输出目录
  publicPath: '/WebViewer/',

  locale: {
    antd: true, // 如果项目依赖中包含 `antd`，则默认为 true
    baseNavigator: true, //开启浏览器语言检测
    baseSeparator: '-', //语言（Language）与国家（Country） 之间的分割符
    default: 'zh-CN', //项目默认语言
    useLocalStorage: true, //自动使用 localStorage 保存当前使用的语言
  },
  antd: {},
  access: {},
  initialState: {},
  model: {},
  request: {},
  title: 'WebViewer',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: 'Viewer',
      path: '/viewer',
      component: './Viewer',
    },
  ],
  npmClient: 'pnpm',
});
