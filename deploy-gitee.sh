#!/bin/bash
# Gitee Pages 自动部署脚本

echo "🚀 开始部署到 Gitee Pages..."

# 检查是否已构建
if [ ! -d "dist" ]; then
    echo "📦 构建项目..."
    npm install
    npm run build
fi

# 检查 Gitee 远程仓库
if ! git remote | grep -q "gitee"; then
    echo "❌ 未找到 Gitee 远程仓库"
    echo "请先添加 Gitee 远程仓库："
    echo "git remote add gitee https://gitee.com/你的用户名/wedding-invitation.git"
    exit 1
fi

# 提交更改
echo "📝 提交更改..."
git add .
git commit -m "Deploy to Gitee Pages" || echo "没有更改需要提交"

# 推送到 Gitee
echo "⬆️  推送到 Gitee..."
git push gitee master

echo "✅ 部署完成！"
echo "请在 Gitee 仓库中启用 Gitee Pages："
echo "1. 进入仓库 → 服务 → Gitee Pages"
echo "2. 选择分支：master"
echo "3. 选择目录：dist"
echo "4. 点击启动"

