# 📸 图片和视频使用指南

## 📋 项目中需要插入图片的位置

### 1. 新人照片（AboutUs 组件）

**位置**: `src/components/AboutUs.jsx`

**需要的图片**:
```
public/images/groom.jpg        - 新郎照片
public/images/bride.jpg         - 新娘照片
```

**建议尺寸**:
- 宽度: 400-600px
- 高度: 600-800px
- 比例: 2:3 或 3:4（竖版）
- 格式: JPG, PNG, WebP
- 文件大小: < 500KB（建议压缩）

**代码位置**:
```javascript
// 第 116 行 - 新郎照片
<img src="/images/groom.jpg" alt="新郎" />

// 第 152 行 - 新娘照片
<img src="/images/bride.jpg" alt="新娘" />
```

---

### 2. 合照轮播（AboutUs 组件）

**位置**: `src/components/AboutUs.jsx`

**需要的图片**:
```
public/images/couple-1.jpg     - 合照1
public/images/couple-2.jpg     - 合照2
public/images/couple-3.jpg     - 合照3
public/images/couple-4.jpg     - 合照4
```

**建议尺寸**:
- 宽度: 800-1200px
- 高度: 600-900px
- 比例: 4:3 或 16:9（横版）
- 格式: JPG, PNG, WebP
- 文件大小: < 800KB（建议压缩）

**代码位置**:
```javascript
// 第 22-27 行
const photos = [
  { id: 1, url: '/images/couple-1.jpg', alt: '合照1' },
  { id: 2, url: '/images/couple-2.jpg', alt: '合照2' },
  { id: 3, url: '/images/couple-3.jpg', alt: '合照3' },
  { id: 4, url: '/images/couple-4.jpg', alt: '合照4' },
]
```

**如何添加更多合照**:
1. 在 `public/images/` 目录添加图片（如 `couple-5.jpg`）
2. 在 `AboutUs.jsx` 的 `photos` 数组中添加：
```javascript
{ id: 5, url: '/images/couple-5.jpg', alt: '合照5' },
```

---

### 3. 婚纱照轮播（Gallery 组件）

**位置**: `src/components/Gallery.jsx`

**需要的图片**:
```
public/images/wedding-1.jpg    - 婚纱照1
public/images/wedding-2.jpg     - 婚纱照2
public/images/wedding-3.jpg     - 婚纱照3
public/images/wedding-4.jpg     - 婚纱照4
public/images/wedding-5.jpg     - 婚纱照5
public/images/wedding-6.jpg     - 婚纱照6
```

**建议尺寸**:
- 宽度: 800-1200px
- 高度: 1000-1500px
- 比例: 2:3 或 3:4（竖版，适合婚纱照）
- 格式: JPG, PNG, WebP
- 文件大小: < 1MB（建议压缩）

**代码位置**:
```javascript
// 第 15-22 行
const photos = [
  { id: 1, url: '/images/wedding-1.jpg', alt: '婚纱照1' },
  { id: 2, url: '/images/wedding-2.jpg', alt: '婚纱照2' },
  { id: 3, url: '/images/wedding-3.jpg', alt: '婚纱照3' },
  { id: 4, url: '/images/wedding-4.jpg', alt: '婚纱照4' },
  { id: 5, url: '/images/wedding-5.jpg', alt: '婚纱照5' },
  { id: 6, url: '/images/wedding-6.jpg', alt: '婚纱照6' },
]
```

**如何添加更多婚纱照**:
1. 在 `public/images/` 目录添加图片
2. 在 `Gallery.jsx` 的 `photos` 数组中添加新项

---

### 4. 背景音乐（MusicPlayer 组件）

**位置**: `src/components/MusicPlayer.jsx`

**需要的音频文件**:
```
public/music/wedding-music.mp3  - 背景音乐
```

**建议格式**:
- MP3（推荐，兼容性最好）
- OGG（备选）
- WAV（文件较大，不推荐）

**文件大小**: < 5MB（建议）

**代码位置**:
```javascript
// 第 82 行
<audio src="/music/wedding-music.mp3" />
```

---

## 🎬 视频支持说明

### ✅ 可以插入视频！

项目完全支持视频插入，以下是几种方式：

### 方式一：在 Hero 封面页添加背景视频

**修改文件**: `src/components/Hero.jsx`

**步骤**:
1. 将视频文件放入 `public/videos/` 目录
2. 在 Hero 组件中添加视频元素：

```javascript
// 在 Hero 组件的 return 中添加
<section className="relative min-h-screen ...">
  {/* 背景视频 */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover z-0"
  >
    <source src="/videos/hero-background.mp4" type="video/mp4" />
  </video>
  
  {/* 视频遮罩（可选，让文字更清晰） */}
  <div className="absolute inset-0 bg-black/30 z-10"></div>
  
  {/* 原有内容 */}
  <motion.div className="text-center z-20 ...">
    {/* ... */}
  </motion.div>
</section>
```

**建议视频规格**:
- 格式: MP4（H.264 编码）
- 分辨率: 1920x1080 或 1280x720
- 时长: 10-30 秒（循环播放）
- 文件大小: < 10MB（建议压缩）

---

### 方式二：在 Gallery 相册中添加视频

**修改文件**: `src/components/Gallery.jsx`

**步骤**:
1. 在 `photos` 数组中添加视频项：

```javascript
const photos = [
  // ... 现有图片
  { 
    id: 7, 
    url: '/videos/wedding-video.mp4', 
    alt: '婚礼视频',
    type: 'video'  // 标记为视频
  },
]
```

2. 在渲染时判断类型：

```javascript
{photos.map((photo) => (
  <SwiperSlide key={photo.id}>
    {photo.type === 'video' ? (
      <video
        src={photo.url}
        controls
        className="w-full h-[500px] object-cover rounded-2xl"
      />
    ) : (
      <img src={photo.url} alt={photo.alt} />
    )}
  </SwiperSlide>
))}
```

---

### 方式三：添加独立的视频展示模块

**创建新组件**: `src/components/VideoSection.jsx`

```javascript
import { motion } from 'framer-motion'

const VideoSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8"
        >
          我们的爱情故事
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <video
            controls
            className="w-full h-auto"
            poster="/images/video-poster.jpg"  // 视频封面图
          >
            <source src="/videos/love-story.mp4" type="video/mp4" />
            您的浏览器不支持视频播放
          </video>
        </motion.div>
      </div>
    </section>
  )
}

export default VideoSection
```

**然后在 `App.jsx` 中引入**:
```javascript
import VideoSection from './components/VideoSection'

// 在合适的位置添加
<VideoSection />
```

---

## 📁 完整的文件结构

```
wedding/
└── public/
    ├── images/
    │   ├── groom.jpg          ✅ 必需
    │   ├── bride.jpg          ✅ 必需
    │   ├── couple-1.jpg       ✅ 必需
    │   ├── couple-2.jpg       ✅ 必需
    │   ├── couple-3.jpg       ✅ 必需
    │   ├── couple-4.jpg       ✅ 必需
    │   ├── wedding-1.jpg      ✅ 必需
    │   ├── wedding-2.jpg      ✅ 必需
    │   ├── wedding-3.jpg      ✅ 必需
    │   ├── wedding-4.jpg      ✅ 必需
    │   ├── wedding-5.jpg      ✅ 必需
    │   └── wedding-6.jpg      ✅ 必需
    │
    ├── videos/                📹 可选（需要创建）
    │   ├── hero-background.mp4    - 封面背景视频
    │   ├── wedding-video.mp4      - 婚礼视频
    │   └── love-story.mp4         - 爱情故事视频
    │
    └── music/
        └── wedding-music.mp3  ✅ 必需
```

---

## 🛠️ 图片优化建议

### 1. 压缩图片
- 使用在线工具：https://tinypng.com
- 或使用工具：ImageOptim, Squoosh

### 2. 使用 WebP 格式（可选）
- 更好的压缩率
- 需要提供 JPG 作为后备

### 3. 响应式图片
当前代码已支持响应式，但可以进一步优化：

```javascript
// 使用 srcset 提供不同尺寸
<img
  src="/images/groom.jpg"
  srcSet="/images/groom-small.jpg 400w, /images/groom.jpg 800w"
  sizes="(max-width: 768px) 400px, 800px"
  alt="新郎"
/>
```

---

## 📝 快速检查清单

- [ ] `public/images/groom.jpg` - 新郎照片
- [ ] `public/images/bride.jpg` - 新娘照片
- [ ] `public/images/couple-1.jpg` - 合照1
- [ ] `public/images/couple-2.jpg` - 合照2
- [ ] `public/images/couple-3.jpg` - 合照3
- [ ] `public/images/couple-4.jpg` - 合照4
- [ ] `public/images/wedding-1.jpg` - 婚纱照1
- [ ] `public/images/wedding-2.jpg` - 婚纱照2
- [ ] `public/images/wedding-3.jpg` - 婚纱照3
- [ ] `public/images/wedding-4.jpg` - 婚纱照4
- [ ] `public/images/wedding-5.jpg` - 婚纱照5
- [ ] `public/images/wedding-6.jpg` - 婚纱照6
- [ ] `public/music/wedding-music.mp4` - 背景音乐

---

## 🎥 视频使用最佳实践

### 1. 视频格式
- **MP4 (H.264)**: 最佳兼容性，推荐
- **WebM**: 更好的压缩，但兼容性稍差
- **OGV**: 备选格式

### 2. 视频优化
- 使用 HandBrake 或 FFmpeg 压缩
- 目标码率: 2-5 Mbps
- 分辨率: 根据使用场景选择

### 3. 性能考虑
- 背景视频使用 `muted` 和 `playsInline`
- 提供 `poster` 图片作为封面
- 考虑使用懒加载（`loading="lazy"`）

---

## 💡 提示

1. **占位图**: 如果图片不存在，代码会自动使用占位图
2. **错误处理**: 所有图片都有 `onError` 处理
3. **懒加载**: 可以考虑添加图片懒加载优化性能
4. **CDN**: 如果图片很多，可以考虑使用 CDN

---

## 📞 需要帮助？

如果需要添加视频功能或修改图片配置，可以：
1. 修改对应的组件文件
2. 添加新的视频组件
3. 更新图片路径配置

