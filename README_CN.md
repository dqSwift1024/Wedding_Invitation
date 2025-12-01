# 💐 婚礼请柬网页 - 国内部署版

专为国内用户优化的部署指南，提供多个免费部署方案。

## 🚀 快速开始

### 方案一：Gitee Pages（最简单，推荐）

1. **注册 Gitee 账号**
   - 访问 https://gitee.com
   - 注册并完成实名认证

2. **创建仓库并推送代码**
   ```bash
   cd E:\WebProject\wedding
   git remote add gitee https://gitee.com/你的用户名/wedding-invitation.git
   git push gitee master
   ```

3. **启用 Gitee Pages**
   - 进入仓库 → **服务** → **Gitee Pages**
   - 选择分支：`master`
   - 选择目录：`dist`
   - 点击 **启动**

4. **访问网站**
   ```
   https://你的用户名.gitee.io/wedding-invitation/
   ```

### 方案二：腾讯云开发（支持后端 API）

1. **注册腾讯云账号**
   - 访问 https://cloud.tencent.com
   - 完成实名认证

2. **安装 CloudBase CLI**
   ```bash
   npm install -g @cloudbase/cli
   tcb login
   ```

3. **初始化项目**
   ```bash
   cd E:\WebProject\wedding
   tcb init
   ```

4. **部署**
   ```bash
   npm run build
   tcb hosting deploy dist
   tcb fn deploy messages
   ```

详细步骤请查看 [DEPLOY_CN.md](./DEPLOY_CN.md)

## 📋 功能特性

- 🎨 现代设计：浪漫轻奢风格
- 📱 响应式布局：完美适配手机、iPad、PC
- 🎭 流畅动画：使用 framer-motion
- 🌸 花瓣飘落：自动生成花瓣动画
- 🎵 背景音乐：支持播放控制
- 📸 照片轮播：使用 Swiper.js
- ⏰ 倒计时：实时更新的婚礼倒计时
- 📝 RSVP 表单：出席登记功能
- 💬 留言墙：访客祝福留言功能（需要后端支持）

## 🔧 技术栈

- React 18 + Vite
- TailwindCSS
- Framer Motion
- Swiper.js
- React Icons

## 📦 项目结构

```
wedding/
├── src/                    # 源代码
├── public/                 # 静态资源
├── api/                    # API 接口（如果使用 Vercel）
├── cloudfunctions/         # 云函数（如果使用腾讯云开发）
├── dist/                   # 构建输出
└── DEPLOY_CN.md           # 国内部署详细指南
```

## 🌐 部署平台对比

| 平台 | 免费额度 | 国内访问 | 备案要求 | 后端支持 |
|------|---------|---------|---------|---------|
| Gitee Pages | ✅ 完全免费 | ⭐⭐⭐⭐⭐ | 需要 | ❌ |
| 腾讯云开发 | ✅ 免费额度 | ⭐⭐⭐⭐⭐ | 不需要 | ✅ |
| 阿里云 OSS | ✅ 免费额度 | ⭐⭐⭐⭐⭐ | 需要 | ❌ |
| Cloudflare | ✅ 完全免费 | ⭐⭐⭐ | 不需要 | ✅ |

## 📝 注意事项

1. **备案要求**：使用 Gitee Pages 或自定义域名需要 ICP 备案
2. **后端 API**：留言功能需要后端支持，推荐使用腾讯云开发
3. **音乐文件**：需要将音乐文件放在 `public/music/` 目录
4. **图片资源**：需要将图片放在 `public/images/` 目录

## 📞 获取帮助

- 查看 [DEPLOY_CN.md](./DEPLOY_CN.md) 了解详细部署步骤
- 查看 [README.md](./README.md) 了解项目详情
- 查看 [QUICK_START.md](./QUICK_START.md) 了解快速开始

---

Made with ❤️ for Chinese users

