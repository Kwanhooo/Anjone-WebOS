# 安居佑 ![visitors](https://visitor-badge.glitch.me/badge?page_id=Kwanhooo.Anjone-WebOS)

### —— Anjone

_本项目的开发工作起始于：2022 年 9 月 28 日 星期五_

## 📔 自述

> 2022 © [安居佑 - 家庭数据中心](https://anjone.0xCAFEBABE.cn)
>
> Powered by [©Anjone Co.Ltd](https://gitee.com/hixs/kunpeng_front)

## 💻 开发技术

### 基本

- Nuxt.js @2
  - Vue.js @2
  - Webpack
  - Vuex
  - Axios
- Less
- Ant Design Vue
- ECharts

### 代码规范化工具

- ESLint
- Prettier
- Stylelint
- Commitlint
- Husky Git Hooks
- Lint-staged
- editorconfig

### 其它开发依赖

- lodash.clonedeep (深拷贝)
- spacejs (测量工具)
- mockjs (模拟数据)

## 🦾 源码构建

### 1. 安装依赖

```npm
npm install
```

### 2. 启动服务

```npm
npm run dev
```

### 3. 开发

```npm
# 注册 Husky Git 钩子
npm run prepare
```

```npm
# 格式化代码
npm run lint
npm run lintfix
```

```shell
# 提交代码

# 1.添加到暂存区
git add .

# 2.提交代码
  # `type`的允许值详见 commitlint.config.js
  # 示例：git commit -m "feat: 新增动态路由功能"
  # 此时会触发先前注册的钩子，执行代码格式化、代码检查、代码提交等操作
git commit -m <type>[optional scope]: <description>

# 3.推送至远端
git push
```

## 🔨 部署

1. ### 开发环境 (env.development)

- 主机：_vercel.com_
- 访问方式：*https://anjone.0xCAFEBABE.cn*
- 方案：透过**Github Action**进行检查；透过**Vercel**部署；通过 Nginx 反向代理到**Vercel**主机

2. ### 生产环境 (env.prod)

- 主机：Anjone 硬件 以及 云端
- 访问方式：本地局域网内访问 或 云端访问
- 方案：未知

## 🏃 状态

### 基本状态

![GitHub](https://img.shields.io/github/license/Kwanhooo/Anjone-WebOS?style=for-the-badge)

![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/Kwanhooo/Anjone-WebOS/vue?style=for-the-badge)

![Website](https://img.shields.io/website?label=prod-services&style=for-the-badge&url=http%3A%2F%2Fkp.0xcafebabe.cn%2F)

---

### 开发状态

![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/Kwanhooo/Anjone-WebOS/master?style=for-the-badge)

![GitHub deployments](https://img.shields.io/github/deployments/Kwanhooo/Anjone-WebOS/Production?label=Dev-Env%20deploy&style=for-the-badge)

![GitHub branch checks state](https://img.shields.io/github/checks-status/Kwanhooo/Anjone-WebOS/main?label=master%20%E5%88%86%E6%94%AF%E6%A3%80%E6%9F%A5&style=for-the-badge)

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/Kwanhooo/Anjone-WebOS/main?style=for-the-badge)

![GitHub commit activity](https://img.shields.io/github/commit-activity/w/Kwanhooo/Anjone-WebOS?style=for-the-badge)

![GitHub contributors](https://img.shields.io/github/contributors/Kwanhooo/Anjone-WebOS?style=for-the-badge)

---

### 仓库统计

![GitHub language count](https://img.shields.io/github/languages/count/Kwanhooo/Anjone-WebOS?style=for-the-badge)

![GitHub repo size](https://img.shields.io/github/repo-size/Kwanhooo/Anjone-WebOS?style=for-the-badge)

![Lines of code](https://img.shields.io/tokei/lines/github/Kwanhooo/Anjone-WebOS?style=for-the-badge)
