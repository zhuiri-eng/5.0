#!/bin/bash

echo "🚀 开始部署到 Netlify..."

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build:netlify

# 检查构建是否成功
if [ -d "dist" ]; then
    echo "✅ 构建成功！"
    echo "📁 构建文件位于 dist/ 目录"
    echo ""
    echo "📋 部署步骤："
    echo "1. 访问 https://netlify.com"
    echo "2. 登录或注册账户"
    echo "3. 点击 'New site from Git' 或拖拽 dist 文件夹"
    echo "4. 如果使用 Git 部署，构建命令设置为: npm run build:netlify"
    echo "5. 发布目录设置为: dist"
else
    echo "❌ 构建失败！请检查错误信息"
    exit 1
fi 