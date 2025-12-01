# 🎬 视频资源目录

此目录用于存放视频文件（可选）。

## 支持的视频格式

- **MP4 (H.264)**: 推荐，最佳兼容性
- **WebM**: 更好的压缩率
- **OGV**: 备选格式

## 视频用途

### 1. 封面背景视频（可选）
- `hero-background.mp4` - Hero 页面背景视频
- 建议: 10-30秒循环，1920x1080，< 10MB

### 2. 相册视频（可选）
- `wedding-video.mp4` - 婚礼视频
- 建议: 任意长度，1920x1080，< 50MB

### 3. 爱情故事视频（可选）
- `love-story.mp4` - 爱情故事视频
- 建议: 1-3分钟，1920x1080，< 100MB

## 视频优化

### 使用 HandBrake 压缩：
1. 下载 HandBrake: https://handbrake.fr
2. 选择视频文件
3. 预设选择: Web > Gmail Large 3 Minutes 720p30
4. 开始编码

### 使用 FFmpeg：
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4
```

## 注意事项

- 视频文件较大，建议压缩后再使用
- 考虑使用 CDN 或视频托管服务（如 YouTube, Vimeo）
- 背景视频必须使用 `muted` 和 `playsInline` 属性
- 提供视频封面图（poster）以提升加载体验

## 如何添加视频

详细步骤请查看 `IMAGES_VIDEOS_GUIDE.md` 文档。

