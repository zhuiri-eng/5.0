# 玄学命理报告应用

一个基于React和TypeScript的玄学命理报告生成应用，可根据用户输入的个人信息生成详细的命理分析报告。

## 功能特点

- 输入个人信息（姓名、出生日期、时辰、性别）
- 生成详细的五行命理分析
- 提供性格特质解读
- 预测近期和未来运势
- 给出职业发展、人际关系和健康养生建议

## 本地开发

### 环境要求

- Node.js 14+
- npm 6+ 或 pnpm 6+

### 安装依赖

```bash
pnpm install
# 或
npm install
```

### 启动开发服务器

```bash
pnpm dev
# 或
npm run dev
```

应用将运行在 http://localhost:3000

注意：开发服务器运行在终端中，关闭终端会停止服务器进程，导致无法访问应用。

## 生产环境部署

如果需要在关闭终端后仍能访问应用，需要构建生产版本并使用静态服务器运行：

### 构建生产版本

```bash
pnpm build
# 或
npm run build
```

构建后的文件将位于 `dist` 目录中。

### 运行生产版本

首先安装静态服务器（如 serve）：

```bash
npm install -g serve
```

然后运行构建后的应用：

```bash
serve -s dist -l 3000
```

现在应用将在 http://localhost:3000 运行，即使关闭终端也能继续访问。

## 技术栈

- React 18+
- TypeScript
- Tailwind CSS
- Vite
- React Router