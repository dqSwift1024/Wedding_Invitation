@echo off
REM Gitee Pages 自动部署脚本 (Windows)

echo 🚀 开始部署到 Gitee Pages...

REM 检查是否已构建
if not exist "dist" (
    echo 📦 构建项目...
    call npm install
    call npm run build
)

REM 检查 Gitee 远程仓库
git remote | findstr "gitee" >nul
if errorlevel 1 (
    echo ❌ 未找到 Gitee 远程仓库
    echo 请先添加 Gitee 远程仓库：
    echo git remote add gitee https://gitee.com/你的用户名/wedding-invitation.git
    pause
    exit /b 1
)

REM 提交更改
echo 📝 提交更改...
git add .
git commit -m "Deploy to Gitee Pages" || echo 没有更改需要提交

REM 推送到 Gitee
echo ⬆️  推送到 Gitee...
git push gitee master

echo ✅ 部署完成！
echo 请在 Gitee 仓库中启用 Gitee Pages：
echo 1. 进入仓库 → 服务 → Gitee Pages
echo 2. 选择分支：master
echo 3. 选择目录：dist
echo 4. 点击启动

pause

