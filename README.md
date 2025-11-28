# 💐 婚礼请柬网页 - Wedding Invitation

一个现代风格、高级感的婚礼请柬网页，采用 React + Vite + TailwindCSS 构建。

## ✨ 功能特性

- 🎨 **现代设计**：浪漫轻奢风格，奶白+玫瑰金配色
- 📱 **响应式布局**：完美适配手机、iPad、PC
- 🎭 **流畅动画**：使用 framer-motion 实现优雅的滚动动画
- 🌸 **花瓣飘落**：自动生成花瓣飘落效果
- 🎵 **背景音乐**：支持背景音乐播放控制
- 📸 **照片轮播**：使用 Swiper.js 实现精美的照片展示
- ⏰ **倒计时**：实时更新的婚礼倒计时
- 📝 **RSVP 表单**：出席登记功能
- 💬 **留言墙**：访客祝福留言功能
- 🗺️ **地图导航**：一键跳转高德/百度地图

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
# 启动前端开发服务器（端口 3000）
npm run dev

# 启动 mock API 服务器（端口 3001，新开一个终端）
npm run mock
```

### 构建生产版本

```bash
npm run build
```

构建后的文件在 `dist` 目录，可以直接部署到静态托管服务。

## 📁 项目结构

```
wedding-invitation/
├── public/                 # 静态资源目录
│   ├── images/            # 图片资源（需要自行添加）
│   │   ├── groom.jpg      # 新郎照片
│   │   ├── bride.jpg      # 新娘照片
│   │   ├── couple-*.jpg   # 合照（4张）
│   │   └── wedding-*.jpg  # 婚纱照（6张）
│   └── music/             # 音乐资源（需要自行添加）
│       └── wedding-music.mp3
├── src/
│   ├── components/        # 组件目录
│   │   ├── Hero.jsx       # 封面页
│   │   ├── AboutUs.jsx    # 新人介绍
│   │   ├── WeddingInfo.jsx # 婚礼信息
│   │   ├── Countdown.jsx  # 倒计时
│   │   ├── RSVPForm.jsx   # RSVP表单
│   │   ├── MessageWall.jsx # 留言墙
│   │   ├── Gallery.jsx    # 相册
│   │   ├── Footer.jsx     # 结尾页
│   │   ├── MusicPlayer.jsx # 音乐播放器
│   │   └── FloatingPetals.jsx # 花瓣飘落
│   ├── App.jsx            # 主应用组件
│   ├── main.jsx          # 入口文件
│   └── index.css         # 全局样式
├── db.json               # Mock API 数据
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 自定义配置

### 修改新人信息

编辑以下文件中的内容：

1. **封面页**：`src/components/Hero.jsx`
   - 修改新人名字：`Ming` 和 `Xin`
   - 修改日期：`2025.10.20`

2. **新人介绍**：`src/components/AboutUs.jsx`
   - 修改新人简介和描述
   - 修改时间线内容

3. **婚礼信息**：`src/components/WeddingInfo.jsx`
   - 修改仪式时间、宴席时间
   - 修改婚礼地址
   - 修改地图坐标（经纬度）

4. **倒计时**：`src/components/Countdown.jsx`
   - 修改目标日期：`2025-10-20T10:00:00`

### 添加图片资源

将以下图片放入 `public/images/` 目录：

- `groom.jpg` - 新郎照片（建议 400x600px）
- `bride.jpg` - 新娘照片（建议 400x600px）
- `couple-1.jpg` 到 `couple-4.jpg` - 合照（建议 800x600px）
- `wedding-1.jpg` 到 `wedding-6.jpg` - 婚纱照（建议 800x1200px）

如果没有图片，系统会自动使用占位图。

### 添加背景音乐

将"我们结婚吧"这首歌曲的音频文件放入 `public/music/` 目录，命名为 `wedding-music.mp3`。

**步骤**：
1. 下载"我们结婚吧"的音频文件（MP3格式）
2. 将文件重命名为 `wedding-music.mp3`
3. 放入 `public/music/` 目录

**注意**：
- 建议文件大小控制在 5MB 以内，以确保快速加载
- 由于浏览器限制，背景音乐需要用户点击播放按钮后才能播放
- 如果音乐文件不存在，播放器会显示错误提示

## 🌐 部署指南

### 部署到 Vercel

1. 将代码推送到 GitHub
2. 访问 [Vercel](https://vercel.com)
3. 导入你的 GitHub 仓库
4. 构建命令：`npm run build`
5. 输出目录：`dist`
6. 点击部署

### 部署到 Netlify

1. 将代码推送到 GitHub
2. 访问 [Netlify](https://www.netlify.com)
3. 点击 "New site from Git"
4. 选择你的仓库
5. 构建命令：`npm run build`
6. 发布目录：`dist`
7. 点击部署

### 部署到其他静态托管

1. 运行 `npm run build`
2. 将 `dist` 目录的内容上传到你的静态托管服务

### Mock API 部署

如果需要 RSVP 和留言功能，需要部署 mock API：

**选项 1：使用 JSON Server 部署**
- 将 `db.json` 和 `package.json` 部署到支持 Node.js 的服务
- 运行 `npm run mock`

**选项 2：使用真实后端 API**
- 修改 `src/components/RSVPForm.jsx` 和 `src/components/MessageWall.jsx` 中的 API 地址
- 替换为你的真实后端 API 端点

## 🛠️ 技术栈

- **React 18** - UI 框架
- **Vite** - 构建工具
- **TailwindCSS** - 样式框架
- **Framer Motion** - 动画库
- **Swiper.js** - 轮播组件
- **React Icons** - 图标库
- **JSON Server** - Mock API

## 📝 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移动端浏览器（iOS Safari, Chrome Mobile）

## 📄 许可证

MIT License

## 💝 致谢

感谢使用本婚礼请柬模板！祝新人百年好合，永浴爱河！

---

Made with ❤️ by Ming & Xin

