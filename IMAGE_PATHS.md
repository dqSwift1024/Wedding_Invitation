# 📸 图片路径汇总表

## ✅ 必需图片文件（共 12 张）

### 1. 新人照片（2张）

| 文件名 | 路径 | 用途 | 建议尺寸 |
|--------|------|------|---------|
| `groom.jpg` | `public/images/groom.jpg` | 新郎照片 | 400x600px |
| `bride.jpg` | `public/images/bride.jpg` | 新娘照片 | 400x600px |

**代码位置**: `src/components/AboutUs.jsx` (第 116, 152 行)

---

### 2. 合照轮播（4张）

| 文件名 | 路径 | 用途 | 建议尺寸 |
|--------|------|------|---------|
| `couple-1.jpg` | `public/images/couple-1.jpg` | 合照1 | 800x600px |
| `couple-2.jpg` | `public/images/couple-2.jpg` | 合照2 | 800x600px |
| `couple-3.jpg` | `public/images/couple-3.jpg` | 合照3 | 800x600px |
| `couple-4.jpg` | `public/images/couple-4.jpg` | 合照4 | 800x600px |

**代码位置**: `src/components/AboutUs.jsx` (第 22-27 行)

---

### 3. 婚纱照轮播（6张）

| 文件名 | 路径 | 用途 | 建议尺寸 |
|--------|------|------|---------|
| `wedding-1.jpg` | `public/images/wedding-1.jpg` | 婚纱照1 | 800x1200px |
| `wedding-2.jpg` | `public/images/wedding-2.jpg` | 婚纱照2 | 800x1200px |
| `wedding-3.jpg` | `public/images/wedding-3.jpg` | 婚纱照3 | 800x1200px |
| `wedding-4.jpg` | `public/images/wedding-4.jpg` | 婚纱照4 | 800x1200px |
| `wedding-5.jpg` | `public/images/wedding-5.jpg` | 婚纱照5 | 800x1200px |
| `wedding-6.jpg` | `public/images/wedding-6.jpg` | 婚纱照6 | 800x1200px |

**代码位置**: `src/components/Gallery.jsx` (第 15-22 行)

---

## 🎵 音频文件（1个）

| 文件名 | 路径 | 用途 | 格式 |
|--------|------|------|------|
| `wedding-music.mp3` | `public/music/wedding-music.mp3` | 背景音乐 | MP3 |

**代码位置**: `src/components/MusicPlayer.jsx` (第 82 行)

---

## 🎬 视频文件（可选）

### 如果要在 Hero 页面添加背景视频：

| 文件名 | 路径 | 用途 | 建议规格 |
|--------|------|------|---------|
| `hero-background.mp4` | `public/videos/hero-background.mp4` | 封面背景视频 | 1920x1080, <10MB |

### 如果要在相册中添加视频：

| 文件名 | 路径 | 用途 | 建议规格 |
|--------|------|------|---------|
| `wedding-video.mp4` | `public/videos/wedding-video.mp4` | 婚礼视频 | 1920x1080, <50MB |

---

## 📋 快速检查清单

### 必需文件（13个）

- [ ] `public/images/groom.jpg`
- [ ] `public/images/bride.jpg`
- [ ] `public/images/couple-1.jpg`
- [ ] `public/images/couple-2.jpg`
- [ ] `public/images/couple-3.jpg`
- [ ] `public/images/couple-4.jpg`
- [ ] `public/images/wedding-1.jpg`
- [ ] `public/images/wedding-2.jpg`
- [ ] `public/images/wedding-3.jpg`
- [ ] `public/images/wedding-4.jpg`
- [ ] `public/images/wedding-5.jpg`
- [ ] `public/images/wedding-6.jpg`
- [ ] `public/music/wedding-music.mp3`

### 可选文件

- [ ] `public/videos/hero-background.mp4` (背景视频)
- [ ] `public/videos/wedding-video.mp4` (相册视频)

---

## 🔍 如何验证图片路径

### 方法 1：检查文件是否存在

```bash
# Windows PowerShell
cd E:\WebProject\wedding
Test-Path public\images\groom.jpg
Test-Path public\images\bride.jpg
# ... 其他文件
```

### 方法 2：查看目录内容

```bash
dir public\images
dir public\music
dir public\videos
```

### 方法 3：在浏览器中访问

启动开发服务器后，访问：
- `http://localhost:3000/images/groom.jpg`
- `http://localhost:3000/images/bride.jpg`
- 等等...

---

## 📝 注意事项

1. **路径格式**: 所有路径都是相对于 `public` 目录的
2. **文件名**: 必须与代码中的文件名完全匹配（区分大小写）
3. **文件格式**: 支持 JPG, PNG, WebP（图片）和 MP3, OGG, WAV（音频）
4. **占位图**: 如果图片不存在，系统会自动使用占位图，但建议使用真实图片
5. **文件大小**: 建议压缩图片和视频以提升加载速度

---

## 🛠️ 如何添加更多图片

### 添加更多合照：

1. 将图片放入 `public/images/` 目录
2. 修改 `src/components/AboutUs.jsx`:

```javascript
const photos = [
  // ... 现有图片
  { id: 5, url: '/images/couple-5.jpg', alt: '合照5' },
  { id: 6, url: '/images/couple-6.jpg', alt: '合照6' },
]
```

### 添加更多婚纱照：

1. 将图片放入 `public/images/` 目录
2. 修改 `src/components/Gallery.jsx`:

```javascript
const photos = [
  // ... 现有图片
  { id: 7, url: '/images/wedding-7.jpg', alt: '婚纱照7' },
  { id: 8, url: '/images/wedding-8.jpg', alt: '婚纱照8' },
]
```

---

## 📖 相关文档

- 详细使用指南: `IMAGES_VIDEOS_GUIDE.md`
- 图片目录说明: `public/images/README.md`
- 视频目录说明: `public/videos/README.md`

