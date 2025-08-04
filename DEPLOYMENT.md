# Netlify 部署指南

## 自动部署

### 方法一：通过 Git 仓库连接（推荐）

1. 将代码推送到 GitHub、GitLab 或 Bitbucket
2. 登录 [Netlify](https://netlify.com)
3. 点击 "New site from Git"
4. 选择你的 Git 提供商并授权
5. 选择包含此项目的仓库
6. 配置部署设置：
   - **Build command**: `npm run build:netlify`
   - **Publish directory**: `dist`
7. 点击 "Deploy site"

### 方法二：拖拽部署

1. 在本地运行构建命令：
   ```bash
   npm install
   npm run build:netlify
   ```
2. 登录 [Netlify](https://netlify.com)
3. 将生成的 `dist` 文件夹拖拽到 Netlify 的部署区域

## 环境变量配置

如果项目需要环境变量，可以在 Netlify 的站点设置中添加：

1. 进入站点设置 → Environment variables
2. 添加所需的环境变量

## 自定义域名

部署完成后，可以在站点设置中配置自定义域名。

## 注意事项

- 项目已配置 SPA 重定向规则，支持 React Router
- 构建输出目录为 `dist`
- Node.js 版本设置为 18
- 使用 npm 进行依赖安装和构建，避免 pnpm 版本兼容性问题
- 构建命令：`npm run build:netlify`（自动安装依赖并构建） 