/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

function getPlugins() {
  const plugins = [react(), tsconfigPaths()];
  return plugins;
}

export default defineConfig({
  plugins: getPlugins(),
<<<<<<< HEAD
=======
  // 👇 新增构建输出目录配置，指定产物输出到 dist 文件夹，与 Vercel 部署适配
  build: {
    outDir: "dist", 
  },
  // 👇 若项目部署后路由刷新 404，可补充这部分（单页应用常见配置）
  // 以下配置可选，根据实际路由需求决定是否保留
  server: {
    // 开发环境下的代理配置（若有跨域接口请求可在此配置）
    proxy: {
      // 示例：将 /api 开头的请求代理到后端服务
      // "/api": "http://localhost:3001" 
    }
  },
  // 👇 若使用 React Router 等前端路由，可补充 base 配置（部署到非根路径时需要）
  // 比如部署到 https://xxx.vercel.app/my-app ，则 base: "/my-app/"
  // base: "/", 
>>>>>>> a5f6b871d0dfb5dfb2ac690e1913b6e9f3fe6ff7
});
